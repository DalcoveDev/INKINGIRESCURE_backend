import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterTokenDto, UnregisterTokenDto } from './dto';
import { Expo, ExpoPushMessage, ExpoPushTicket } from 'expo-server-sdk';

@Injectable()
export class NotificationsService {
  private expo: Expo;
  private readonly logger = new Logger(NotificationsService.name);

  constructor(private prisma: PrismaService) {
    this.expo = new Expo();
  }

  async registerPushToken(userId: string, registerTokenDto: RegisterTokenDto) {
    const { token, deviceType } = registerTokenDto;

    // Validate Expo push token
    if (!Expo.isExpoPushToken(token)) {
      throw new BadRequestException('Invalid Expo push token format');
    }

    // Upsert token (insert or update if exists)
    const pushToken = await this.prisma.pushToken.upsert({
      where: { token },
      update: {
        userId,
        deviceType,
        updatedAt: new Date(),
      },
      create: {
        userId,
        token,
        deviceType,
      },
    });

    this.logger.log(`Push token registered for user ${userId}: ${token}`);

    return {
      success: true,
      message: 'Push token registered successfully',
      data: pushToken,
    };
  }

  async unregisterPushToken(unregisterTokenDto: UnregisterTokenDto) {
    const { token } = unregisterTokenDto;

    const deletedToken = await this.prisma.pushToken.deleteMany({
      where: { token },
    });

    this.logger.log(`Push token unregistered: ${token}`);

    return {
      success: true,
      message: 'Push token unregistered successfully',
      deletedCount: deletedToken.count,
    };
  }

  async sendPushNotification(
    userId: string,
    title: string,
    body: string,
    data?: any,
  ) {
    // Get user's push tokens
    const pushTokens = await this.prisma.pushToken.findMany({
      where: { userId },
    });

    if (pushTokens.length === 0) {
      this.logger.warn(`No push tokens found for user ${userId}`);
      return { success: false, message: 'No push tokens found' };
    }

    const messages: ExpoPushMessage[] = pushTokens
      .filter((pt) => Expo.isExpoPushToken(pt.token))
      .map((pt) => ({
        to: pt.token,
        sound: 'default',
        title,
        body,
        data: data || {},
        priority: 'high',
        channelId: 'emergency',
      }));

    return this.sendPushNotifications(messages);
  }

  async sendEmergencyNotification(emergency: any) {
    try {
      // Get all push tokens from database
      const pushTokens = await this.prisma.pushToken.findMany();

      if (pushTokens.length === 0) {
        this.logger.warn('No push tokens found in database');
        return { success: false, message: 'No push tokens found' };
      }

      // Filter valid Expo push tokens
      const validTokens = pushTokens
        .map((pt) => pt.token)
        .filter((token) => Expo.isExpoPushToken(token));

      if (validTokens.length === 0) {
        this.logger.warn('No valid Expo push tokens found');
        return { success: false, message: 'No valid push tokens found' };
      }

      const notificationTitle = '🚨 Emergency Alert';
      const notificationBody = `New emergency reported: ${emergency.type} - ${emergency.title}`;
      const notificationData = {
        type: 'emergency',
        emergencyId: emergency.id,
        emergencyType: emergency.type,
        latitude: emergency.latitude,
        longitude: emergency.longitude,
        priority: emergency.priority,
      };

      // Save notification to database for all users
      const users = await this.prisma.user.findMany({
        select: { id: true },
      });

      await this.prisma.notification.createMany({
        data: users.map((user) => ({
          userId: user.id,
          title: notificationTitle,
          message: notificationBody,
          type: 'emergency',
          data: notificationData,
        })),
      });

      this.logger.log(`Saved ${users.length} notifications to database`);

      // Create messages
      const messages: ExpoPushMessage[] = validTokens.map((token) => ({
        to: token,
        sound: 'default',
        title: notificationTitle,
        body: notificationBody,
        data: notificationData,
        priority: 'high',
        channelId: 'emergency',
      }));

      this.logger.log(
        `Sending emergency notification to ${messages.length} devices`,
      );

      return this.sendPushNotifications(messages);
    } catch (error) {
      this.logger.error('Error sending emergency notifications:', error);
      throw error;
    }
  }

  private async sendPushNotifications(messages: ExpoPushMessage[]) {
    try {
      // Send notifications in chunks
      const chunks = this.expo.chunkPushNotifications(messages);
      const tickets: ExpoPushTicket[] = [];

      for (const chunk of chunks) {
        try {
          const ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);
          tickets.push(...ticketChunk);
        } catch (error) {
          this.logger.error('Error sending notification chunk:', error);
        }
      }

      this.logger.log(`Sent ${tickets.length} push notifications`);

      // Check for errors in tickets
      const errors = tickets.filter((ticket) => ticket.status === 'error');

      if (errors.length > 0) {
        this.logger.warn(`${errors.length} notifications failed to send`);
      }

      return {
        success: true,
        message: `Sent ${tickets.length} push notifications`,
        tickets,
        errors: errors.length,
      };
    } catch (error) {
      this.logger.error('Error sending push notifications:', error);
      throw new BadRequestException('Failed to send push notifications');
    }
  }

  async getUserPushTokens(userId: string) {
    return this.prisma.pushToken.findMany({
      where: { userId },
    });
  }

  async getNotifications(userId: string, isRead?: boolean) {
    const where: any = { userId };

    if (isRead !== undefined) {
      where.isRead = isRead;
    }

    return this.prisma.notification.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async markAsRead(userId: string, notificationId: string) {
    // Verify notification belongs to user
    const notification = await this.prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification) {
      throw new BadRequestException('Notification not found');
    }

    if (notification.userId !== userId) {
      throw new BadRequestException('Unauthorized to update this notification');
    }

    return this.prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    });
  }

  async markAllAsRead(userId: string) {
    const result = await this.prisma.notification.updateMany({
      where: {
        userId,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    return {
      success: true,
      message: `Marked ${result.count} notifications as read`,
      count: result.count,
    };
  }

  async deleteNotification(userId: string, notificationId: string) {
    // Verify notification belongs to user
    const notification = await this.prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification) {
      throw new BadRequestException('Notification not found');
    }

    if (notification.userId !== userId) {
      throw new BadRequestException('Unauthorized to delete this notification');
    }

    await this.prisma.notification.delete({
      where: { id: notificationId },
    });

    return {
      success: true,
      message: 'Notification deleted successfully',
    };
  }
}
