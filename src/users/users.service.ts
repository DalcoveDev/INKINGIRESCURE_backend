import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        role: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        role: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
        responder: {
          select: {
            id: true,
            specialization: true,
            licenseNumber: true,
            status: true,
            rating: true,
            totalResponses: true,
          },
        },
        emergencies: {
          select: {
            id: true,
            type: true,
            status: true,
            priority: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 10,
        },
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // Check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Check for email/phone conflicts
    if (updateUserDto.email || updateUserDto.phoneNumber) {
      const conflictUser = await this.prisma.user.findFirst({
        where: {
          AND: [
            { id: { not: id } },
            {
              OR: [
                updateUserDto.email ? { email: updateUserDto.email } : {},
                updateUserDto.phoneNumber ? { phoneNumber: updateUserDto.phoneNumber } : {},
              ],
            },
          ],
        },
      });

      if (conflictUser) {
        if (conflictUser.email === updateUserDto.email) {
          throw new ConflictException('Email already in use');
        }
        if (conflictUser.phoneNumber === updateUserDto.phoneNumber) {
          throw new ConflictException('Phone number already in use');
        }
      }
    }

    // Hash password if provided
    const updateData: any = { ...updateUserDto };
    if (updateUserDto.password) {
      updateData.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        role: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return updatedUser;
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.prisma.user.delete({
      where: { id },
    });

    return { message: 'User successfully deleted', id };
  }

  async getUserStats(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            emergencies: true,
            notifications: true,
          },
        },
        responder: {
          select: {
            rating: true,
            totalResponses: true,
            _count: {
              select: {
                emergencies: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return {
      userId: user.id,
      totalEmergencies: user._count.emergencies,
      totalNotifications: user._count.notifications,
      responderStats: user.responder ? {
        rating: user.responder.rating,
        totalResponses: user.responder.totalResponses,
        activeEmergencies: user.responder._count.emergencies,
      } : null,
    };
  }
}
