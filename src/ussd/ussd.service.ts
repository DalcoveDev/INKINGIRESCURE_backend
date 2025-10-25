import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReportEmergencyUssdDto, CreateUserUssdDto, DistressAlertDto } from './dto';
import { EmergencyStatus, EmergencyPriority, UserRole } from '../../generated/prisma';
import { NotificationsService } from '../notifications/notifications.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UssdService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  // Map USSD emergency types to database types
  private mapEmergencyType(ussdType: string): any {
    const typeMap: { [key: string]: string } = {
      'fire': 'FIRE',
      'medical': 'MEDICAL',
      'accident': 'ACCIDENT',
      'crime': 'CRIME',
      'other': 'OTHER',
    };
    return typeMap[ussdType.toLowerCase()] || 'OTHER';
  }

  async reportEmergency(reportEmergencyDto: ReportEmergencyUssdDto) {
    const { phoneNumber, emergencyType, description, location, referenceId } = reportEmergencyDto;

    // Find or create user by phone number
    let user = await this.prisma.user.findUnique({
      where: { phoneNumber },
    });

    if (!user) {
      // Create a basic user account for USSD users
      const hashedPassword = await bcrypt.hash(`ussd_${phoneNumber}_${Date.now()}`, 10);
      
      user = await this.prisma.user.create({
        data: {
          phoneNumber,
          email: `ussd_${phoneNumber.replace('+', '')}@inkingi.rw`,
          password: hashedPassword,
          firstName: 'USSD',
          lastName: 'User',
          role: UserRole.USER,
        },
      });
    }

    // Create emergency
    const emergency = await this.prisma.emergency.create({
      data: {
        userId: user.id,
        type: this.mapEmergencyType(emergencyType),
        priority: EmergencyPriority.HIGH, // USSD emergencies are high priority by default
        title: `${emergencyType.toUpperCase()} Emergency via USSD`,
        description: description || 'Emergency reported via USSD',
        address: location || 'Location to be determined',
        latitude: 0, // Will be updated when location is available
        longitude: 0,
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
    }

    return {
      success: true,
      message: 'Emergency reported successfully',
      data: {
        emergencyId: emergency.id,
        referenceId: referenceId || emergency.id,
        status: emergency.status,
        reportedAt: emergency.createdAt,
      },
    };
  }

  async reportDistress(distressAlertDto: DistressAlertDto) {
    const { phoneNumber, message, location } = distressAlertDto;

    // Find or create user by phone number
    let user = await this.prisma.user.findUnique({
      where: { phoneNumber },
    });

    if (!user) {
      // Create a basic user account for USSD users
      const hashedPassword = await bcrypt.hash(`ussd_${phoneNumber}_${Date.now()}`, 10);
      
      user = await this.prisma.user.create({
        data: {
          phoneNumber,
          email: `ussd_${phoneNumber.replace('+', '')}@inkingi.rw`,
          password: hashedPassword,
          firstName: 'USSD',
          lastName: 'User',
          role: UserRole.USER,
        },
      });
    }

    // Create CRITICAL emergency for distress signal
    const emergency = await this.prisma.emergency.create({
      data: {
        userId: user.id,
        type: 'OTHER', // Generic type for distress
        priority: EmergencyPriority.CRITICAL, // HIGHEST priority for distress
        title: '🆘 DISTRESS SIGNAL - Urgent Help Needed',
        description: message || 'DISTRESS ALERT: User requires immediate assistance via USSD',
        address: location || 'Location to be determined',
        latitude: 0,
        longitude: 0,
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

    // Send push notifications to all users with CRITICAL priority
    try {
      await this.notificationsService.sendEmergencyNotification(emergency);
    } catch (error) {
      console.error('Failed to send distress notifications:', error);
    }

    return {
      success: true,
      message: 'Distress signal sent successfully. Help is on the way!',
      data: {
        emergencyId: emergency.id,
        priority: 'CRITICAL',
        status: emergency.status,
        reportedAt: emergency.createdAt,
      },
    };
  }

  async getEmergencies(limit: number = 20, offset: number = 0) {
    const emergencies = await this.prisma.emergency.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
          },
        },
        media: {
          select: {
            id: true,
            mediaUrl: true,
            mediaType: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    return {
      success: true,
      data: emergencies,
      total: await this.prisma.emergency.count(),
    };
  }

  async getEmergencyById(id: string) {
    const emergency = await this.prisma.emergency.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
          },
        },
        media: {
          select: {
            id: true,
            mediaUrl: true,
            mediaType: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
        updates: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!emergency) {
      throw new NotFoundException('Emergency not found');
    }

    return {
      success: true,
      data: emergency,
    };
  }

  async getUserEmergencies(phoneNumber: string) {
    // Find user by phone number
    const user = await this.prisma.user.findUnique({
      where: { phoneNumber },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const emergencies = await this.prisma.emergency.findMany({
      where: { userId: user.id },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        media: {
          select: {
            id: true,
            mediaUrl: true,
            mediaType: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
        updates: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
    });

    return {
      success: true,
      data: emergencies,
      total: emergencies.length,
    };
  }

  async getPosts(limit: number = 10, offset: number = 0) {
    const posts = await this.prisma.post.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        userId: true,
      },
    });

    // Get user details for each post
    const postsWithDetails = await Promise.all(
      posts.map(async (post) => {
        const author = await this.prisma.user.findUnique({
          where: { id: post.userId },
          select: { firstName: true, lastName: true },
        });
        
        const commentsCount = await this.prisma.comment.count({
          where: { postId: post.id },
        });
        
        const likesCount = await this.prisma.like.count({
          where: { postId: post.id },
        });

        return {
          id: post.id,
          title: post.title,
          content: post.content,
          author: author ? `${author.firstName} ${author.lastName}` : 'Unknown',
          commentsCount,
          likesCount,
          createdAt: post.createdAt,
        };
      }),
    );

    return {
      success: true,
      data: postsWithDetails,
      total: await this.prisma.post.count(),
    };
  }

  async getPostById(id: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        userId: true,
      },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    // Get author details
    const author = await this.prisma.user.findUnique({
      where: { id: post.userId },
      select: { firstName: true, lastName: true },
    });

    // Get comments with author details
    const comments = await this.prisma.comment.findMany({
      where: { postId: post.id },
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        content: true,
        createdAt: true,
        userId: true,
      },
    });

    const commentsWithAuthors = await Promise.all(
      comments.map(async (comment) => {
        const commentAuthor = await this.prisma.user.findUnique({
          where: { id: comment.userId },
          select: { firstName: true, lastName: true },
        });
        return {
          content: comment.content,
          author: commentAuthor ? `${commentAuthor.firstName} ${commentAuthor.lastName}` : 'Unknown',
          createdAt: comment.createdAt,
        };
      }),
    );

    const commentsCount = await this.prisma.comment.count({
      where: { postId: post.id },
    });
    
    const likesCount = await this.prisma.like.count({
      where: { postId: post.id },
    });

    return {
      success: true,
      data: {
        id: post.id,
        title: post.title,
        content: post.content,
        author: author ? `${author.firstName} ${author.lastName}` : 'Unknown',
        comments: commentsWithAuthors,
        commentsCount,
        likesCount,
        createdAt: post.createdAt,
      },
    };
  }

  async createUser(createUserDto: CreateUserUssdDto) {
    const { phoneNumber, firstName, lastName } = createUserDto;

    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { phoneNumber },
    });

    if (existingUser) {
      throw new ConflictException('User with this phone number already exists');
    }

    // Generate a random password for USSD users
    const hashedPassword = await bcrypt.hash(`ussd_${phoneNumber}_${Date.now()}`, 10);

    const user = await this.prisma.user.create({
      data: {
        phoneNumber,
        email: `ussd_${phoneNumber.replace('+', '')}@inkingi.rw`,
        password: hashedPassword,
        firstName,
        lastName,
        role: UserRole.USER,
      },
      select: {
        id: true,
        phoneNumber: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
      },
    });

    return {
      success: true,
      message: 'User created successfully',
      data: user,
    };
  }

  async getUser(phoneNumber: string) {
    const user = await this.prisma.user.findUnique({
      where: { phoneNumber },
      select: {
        id: true,
        phoneNumber: true,
        firstName: true,
        lastName: true,
        email: true,
        address: true,
        createdAt: true,
        _count: {
          select: {
            emergencies: true,
            posts: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      success: true,
      data: {
        ...user,
        emergenciesCount: user._count.emergencies,
        postsCount: user._count.posts,
      },
    };
  }
}
