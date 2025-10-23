import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateEmergencyDto,
  UpdateEmergencyDto,
  AssignResponderDto,
  UpdateStatusDto,
  AddUpdateDto,
  VolunteerDto,
} from './dto';
import {
  EmergencyStatus,
  EmergencyPriority,
  ResponderStatus,
  UserRole,
} from '../../generated/prisma';
import { UploadService } from '../upload/upload.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class EmergencyService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
    private notificationsService: NotificationsService,
  ) {}

  async create(userId: string, createEmergencyDto: CreateEmergencyDto) {
    const { type, priority, title, description, latitude, longitude, address } =
      createEmergencyDto;

    const emergency = await this.prisma.emergency.create({
      data: {
        userId,
        type,
        priority: priority || EmergencyPriority.MEDIUM,
        title,
        description: description as any,
        latitude,
        longitude,
        address,
        status: EmergencyStatus.PENDING,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
            email: true,
          },
        },
      },
    });

    // Send push notifications to all users
    try {
      await this.notificationsService.sendEmergencyNotification(emergency);
    } catch (error) {
      console.error('Failed to send emergency notifications:', error);
      // Don't fail the emergency creation if notifications fail
    }

    return emergency;
  }

  async findAll(filters?: {
    status?: EmergencyStatus;
    type?: string;
    userId?: string;
    responderId?: string;
  }) {
    const where: any = {};

    if (filters?.status) {
      where.status = filters.status;
    }
    if (filters?.type) {
      where.type = filters.type;
    }
    if (filters?.userId) {
      where.userId = filters.userId;
    }
    if (filters?.responderId) {
      where.responderId = filters.responderId;
    }

    return this.prisma.emergency.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
          },
        },
        responder: {
          select: {
            id: true,
            specialization: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
                phoneNumber: true,
              },
            },
          },
        },
        volunteers: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                phoneNumber: true,
                email: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        _count: {
          select: {
            updates: true,
            media: true,
            volunteers: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const emergency = await this.prisma.emergency.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
            email: true,
          },
        },
        responder: {
          select: {
            id: true,
            specialization: true,
            licenseNumber: true,
            status: true,
            currentLatitude: true,
            currentLongitude: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
                phoneNumber: true,
              },
            },
          },
        },
        media: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        updates: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        volunteers: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                phoneNumber: true,
                email: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!emergency) {
      throw new NotFoundException(`Emergency with ID ${id} not found`);
    }

    return emergency;
  }

  async update(
    id: string,
    userId: string,
    userRole: UserRole,
    updateEmergencyDto: UpdateEmergencyDto,
  ) {
    const emergency = await this.prisma.emergency.findUnique({
      where: { id },
    });

    if (!emergency) {
      throw new NotFoundException(`Emergency with ID ${id} not found`);
    }

    // Only the creator or admin can update
    if (emergency.userId !== userId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenException('You can only update your own emergencies');
    }

    const updated = await this.prisma.emergency.update({
      where: { id },
      data: updateEmergencyDto,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        responder: {
          select: {
            id: true,
            specialization: true,
          },
        },
      },
    });

    return updated;
  }

  async updateStatus(
    id: string,
    updateStatusDto: UpdateStatusDto,
    updatedBy: string,
  ) {
    const emergency = await this.prisma.emergency.findUnique({
      where: { id },
    });

    if (!emergency) {
      throw new NotFoundException(`Emergency with ID ${id} not found`);
    }

    const updated = await this.prisma.emergency.update({
      where: { id },
      data: {
        status: updateStatusDto.status,
        resolvedAt:
          updateStatusDto.status === EmergencyStatus.RESOLVED
            ? new Date()
            : undefined,
      },
    });

    // Add status update to history
    await this.prisma.emergencyUpdate.create({
      data: {
        emergencyId: id,
        message: `Status changed to ${updateStatusDto.status}`,
        createdBy: updatedBy,
      },
    });

    return updated;
  }

  async assignResponder(id: string, assignResponderDto: AssignResponderDto) {
    const emergency = await this.prisma.emergency.findUnique({
      where: { id },
    });

    if (!emergency) {
      throw new NotFoundException(`Emergency with ID ${id} not found`);
    }

    if (
      emergency.status === EmergencyStatus.RESOLVED ||
      emergency.status === EmergencyStatus.CANCELLED
    ) {
      throw new BadRequestException(
        'Cannot assign responder to resolved or cancelled emergency',
      );
    }

    // Check if responder exists and is available
    const responder = await this.prisma.responder.findUnique({
      where: { id: assignResponderDto.responderId },
    });

    if (!responder) {
      throw new NotFoundException('Responder not found');
    }

    if (responder.status !== ResponderStatus.AVAILABLE) {
      throw new BadRequestException('Responder is not available');
    }

    // Update emergency and responder status
    const [updatedEmergency] = await this.prisma.$transaction([
      this.prisma.emergency.update({
        where: { id },
        data: {
          responderId: assignResponderDto.responderId,
          status: EmergencyStatus.ASSIGNED,
          estimatedArrival: assignResponderDto.estimatedArrival
            ? new Date(assignResponderDto.estimatedArrival)
            : undefined,
        },
        include: {
          responder: {
            include: {
              user: true,
            },
          },
        },
      }),
      this.prisma.responder.update({
        where: { id: assignResponderDto.responderId },
        data: {
          status: ResponderStatus.BUSY,
        },
      }),
      this.prisma.emergencyUpdate.create({
        data: {
          emergencyId: id,
          message: `Responder assigned: ${responder.specialization}`,
          createdBy: assignResponderDto.responderId,
        },
      }),
    ]);

    return updatedEmergency;
  }

  async addUpdate(id: string, addUpdateDto: AddUpdateDto, createdBy: string) {
    const emergency = await this.prisma.emergency.findUnique({
      where: { id },
    });

    if (!emergency) {
      throw new NotFoundException(`Emergency with ID ${id} not found`);
    }

    const update = await this.prisma.emergencyUpdate.create({
      data: {
        emergencyId: id,
        message: addUpdateDto.message,
        createdBy,
      },
    });

    return update;
  }

  async remove(id: string, userId: string, userRole: UserRole) {
    const emergency = await this.prisma.emergency.findUnique({
      where: { id },
    });

    if (!emergency) {
      throw new NotFoundException(`Emergency with ID ${id} not found`);
    }

    // Only the creator or admin can delete
    if (emergency.userId !== userId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenException('You can only delete your own emergencies');
    }

    await this.prisma.emergency.delete({
      where: { id },
    });

    return { message: 'Emergency successfully deleted', id };
  }

  async findNearbyEmergencies(
    latitude: number,
    longitude: number,
    radiusKm: number = 10,
  ) {
    // Simple distance calculation (for more accurate results, use PostGIS or similar)
    const emergencies = await this.prisma.emergency.findMany({
      where: {
        status: {
          in: [EmergencyStatus.PENDING, EmergencyStatus.ASSIGNED],
        },
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            phoneNumber: true,
          },
        },
      },
    });

    // Filter by distance (basic calculation)
    const nearby = emergencies.filter((emergency) => {
      const distance = this.calculateDistance(
        latitude,
        longitude,
        emergency.latitude,
        emergency.longitude,
      );
      return distance <= radiusKm;
    });

    return nearby;
  }

  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  // Volunteer Operations
  async volunteerForEmergency(
    emergencyId: string,
    userId: string,
    volunteerDto: VolunteerDto,
  ) {
    // Check if emergency exists
    const emergency = await this.prisma.emergency.findUnique({
      where: { id: emergencyId },
    });

    if (!emergency) {
      throw new NotFoundException(`Emergency with ID ${emergencyId} not found`);
    }

    // Check if emergency is still active
    if (
      emergency.status === EmergencyStatus.RESOLVED ||
      emergency.status === EmergencyStatus.CANCELLED
    ) {
      throw new BadRequestException(
        'Cannot volunteer for resolved or cancelled emergency',
      );
    }

    // Check if user already volunteered
    const existingVolunteer = await this.prisma.volunteer.findUnique({
      where: {
        emergencyId_userId: {
          emergencyId,
          userId,
        },
      },
    });

    if (existingVolunteer) {
      throw new ConflictException(
        'You have already volunteered for this emergency',
      );
    }

    // Create volunteer entry
    const volunteer = await this.prisma.volunteer.create({
      data: {
        emergencyId,
        userId,
        message: volunteerDto.message,
        skills: volunteerDto.skills,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
            email: true,
          },
        },
      },
    });

    // Add update to emergency
    await this.prisma.emergencyUpdate.create({
      data: {
        emergencyId,
        message: `New volunteer: ${volunteer.user.firstName} ${volunteer.user.lastName}`,
        createdBy: userId,
      },
    });

    return volunteer;
  }

  async getVolunteers(emergencyId: string) {
    const emergency = await this.prisma.emergency.findUnique({
      where: { id: emergencyId },
    });

    if (!emergency) {
      throw new NotFoundException(`Emergency with ID ${emergencyId} not found`);
    }

    return this.prisma.volunteer.findMany({
      where: { emergencyId },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async acceptVolunteer(
    emergencyId: string,
    volunteerId: string,
    acceptedBy: string,
  ) {
    const volunteer = await this.prisma.volunteer.findUnique({
      where: { id: volunteerId },
      include: {
        emergency: true,
        user: true,
      },
    });

    if (!volunteer) {
      throw new NotFoundException(`Volunteer with ID ${volunteerId} not found`);
    }

    if (volunteer.emergencyId !== emergencyId) {
      throw new BadRequestException(
        'Volunteer does not belong to this emergency',
      );
    }

    if (volunteer.isAccepted) {
      throw new ConflictException('Volunteer already accepted');
    }

    // Update volunteer status
    const updated = await this.prisma.volunteer.update({
      where: { id: volunteerId },
      data: {
        isAccepted: true,
        acceptedAt: new Date(),
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
            email: true,
          },
        },
      },
    });

    // Add update to emergency
    await this.prisma.emergencyUpdate.create({
      data: {
        emergencyId,
        message: `Volunteer accepted: ${volunteer.user.firstName} ${volunteer.user.lastName}`,
        createdBy: acceptedBy,
      },
    });

    return updated;
  }

  async removeVolunteer(
    emergencyId: string,
    volunteerId: string,
    userId: string,
    userRole: UserRole,
  ) {
    const volunteer = await this.prisma.volunteer.findUnique({
      where: { id: volunteerId },
    });

    if (!volunteer) {
      throw new NotFoundException(`Volunteer with ID ${volunteerId} not found`);
    }

    if (volunteer.emergencyId !== emergencyId) {
      throw new BadRequestException(
        'Volunteer does not belong to this emergency',
      );
    }

    // Only the volunteer themselves or admin can remove
    if (volunteer.userId !== userId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenException(
        'You can only remove your own volunteer entry',
      );
    }

    await this.prisma.volunteer.delete({
      where: { id: volunteerId },
    });

    return { message: 'Volunteer entry removed successfully', id: volunteerId };
  }

  // Media Upload Operations
  async uploadMedia(
    emergencyId: string,
    files: Express.Multer.File[],
    userId: string,
  ) {
    // Check if emergency exists
    const emergency = await this.prisma.emergency.findUnique({
      where: { id: emergencyId },
    });

    if (!emergency) {
      throw new NotFoundException(`Emergency with ID ${emergencyId} not found`);
    }

    // Upload files and create media records
    const uploadedMedia: Array<{
      id: string;
      emergencyId: string;
      mediaUrl: string;
      mediaType: string;
      createdAt: Date;
    }> = [];

    for (const file of files) {
      try {
        // Upload to Cloudinary
        const mediaUrl = await this.uploadService.uploadFile(
          file,
          `emergencies/${emergencyId}`,
        );
        const mediaType = this.uploadService.getMediaType(file.mimetype);

        // Save to database
        const media = await this.prisma.emergencyMedia.create({
          data: {
            emergencyId,
            mediaUrl,
            mediaType,
          },
        });

        uploadedMedia.push(media);
      } catch (error) {
        console.error(`Failed to upload file ${file.originalname}:`, error);
        // Continue with other files even if one fails
      }
    }

    // Add update to emergency
    if (uploadedMedia.length > 0) {
      await this.prisma.emergencyUpdate.create({
        data: {
          emergencyId,
          message: `${uploadedMedia.length} media file(s) uploaded`,
          createdBy: userId,
        },
      });
    }

    return {
      message: `Successfully uploaded ${uploadedMedia.length} file(s)`,
      media: uploadedMedia,
    };
  }

  async deleteMedia(mediaId: string, userId: string, userRole: UserRole) {
    const media = await this.prisma.emergencyMedia.findUnique({
      where: { id: mediaId },
      include: {
        emergency: true,
      },
    });

    if (!media) {
      throw new NotFoundException(`Media with ID ${mediaId} not found`);
    }

    // Only the emergency creator or admin can delete media
    if (media.emergency.userId !== userId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenException(
        'You can only delete media from your own emergencies',
      );
    }

    // Delete from cloud storage
    try {
      await this.uploadService.deleteFile(media.mediaUrl);
    } catch (error) {
      console.error('Failed to delete file from cloud:', error);
      // Continue with database deletion even if cloud deletion fails
    }

    // Delete from database
    await this.prisma.emergencyMedia.delete({
      where: { id: mediaId },
    });

    return { message: 'Media successfully deleted', id: mediaId };
  }

  // Create emergency with media in one request
  async createWithMedia(
    userId: string,
    createEmergencyDto: CreateEmergencyDto,
    files: Express.Multer.File[],
  ) {
    // Create the emergency first
    const emergency = await this.create(userId, createEmergencyDto);

    // If there are files, upload them
    if (files && files.length > 0) {
      const uploadedMedia: Array<{
        id: string;
        emergencyId: string;
        mediaUrl: string;
        mediaType: string;
        createdAt: Date;
      }> = [];

      for (const file of files) {
        try {
          // Upload to Cloudinary
          const mediaUrl = await this.uploadService.uploadFile(
            file,
            `emergencies/${emergency.id}`,
          );
          const mediaType = this.uploadService.getMediaType(file.mimetype);

          // Save to database
          const media = await this.prisma.emergencyMedia.create({
            data: {
              emergencyId: emergency.id,
              mediaUrl,
              mediaType,
            },
          });

          uploadedMedia.push(media);
        } catch (error) {
          console.error(`Failed to upload file ${file.originalname}:`, error);
          // Continue with other files even if one fails
        }
      }

      // Add update if media was uploaded
      if (uploadedMedia.length > 0) {
        await this.prisma.emergencyUpdate.create({
          data: {
            emergencyId: emergency.id,
            message: `${uploadedMedia.length} media file(s) uploaded`,
            createdBy: userId,
          },
        });
      }

      // Return emergency with media
      return {
        ...emergency,
        media: uploadedMedia,
      };
    }

    return emergency;
  }
}
