import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { RegisterTokenDto, UnregisterTokenDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators';

@ApiTags('Notifications')
@Controller('notifications')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Register push notification token for the authenticated user',
  })
  @ApiResponse({
    status: 201,
    description: 'Push token registered successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid push token format' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async registerPushToken(
    @CurrentUser() user: any,
    @Body() registerTokenDto: RegisterTokenDto,
  ) {
    return this.notificationsService.registerPushToken(
      user.id,
      registerTokenDto,
    );
  }

  @Post('unregister')
  @ApiOperation({ summary: 'Unregister push notification token' })
  @ApiResponse({
    status: 200,
    description: 'Push token unregistered successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async unregisterPushToken(@Body() unregisterTokenDto: UnregisterTokenDto) {
    return this.notificationsService.unregisterPushToken(unregisterTokenDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all notifications for the authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'Notifications retrieved successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getNotifications(@CurrentUser() user: any) {
    return this.notificationsService.getNotifications(user.id);
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark a notification as read' })
  @ApiResponse({
    status: 200,
    description: 'Notification marked as read successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Notification not found' })
  async markNotificationAsRead(
    @Param('id') id: string,
    @CurrentUser() user: any,
  ) {
    return this.notificationsService.markAsRead(user.id, id);
  }

  @Patch('all/read')
  @ApiOperation({ summary: 'Mark all notifications as read' })
  @ApiResponse({
    status: 200,
    description: 'Notifications marked as read successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async markAllNotificationsAsRead(@CurrentUser() user: any) {
    return this.notificationsService.markAllAsRead(user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a notification' })
  @ApiResponse({
    status: 200,
    description: 'Notification deleted successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Notification not found' })
  async deleteNotification(@Param('id') id: string, @CurrentUser() user: any) {
    return this.notificationsService.deleteNotification(id, user.id);
  }
}
