import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto, LoginDto, UpdateUserDto } from './dto';
import { UserRole } from '../../generated/prisma';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private uploadService: UploadService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { email, password, firstName, lastName, phoneNumber } = signupDto;

    // Check if user already exists
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { phoneNumber },
        ],
      },
    });

    if (existingUser) {
      if (existingUser.email === email) {
        throw new ConflictException('Email already registered');
      }
      if (existingUser.phoneNumber === phoneNumber) {
        throw new ConflictException('Phone number already registered');
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phoneNumber,
        role: UserRole.USER,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        role: true,
        isVerified: true,
        createdAt: true,
      },
    });

    // Generate JWT token
    const token = await this.generateToken(user.id, user.email, user.role);

    return {
      user,
      token,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const token = await this.generateToken(user.id, user.email, user.role);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  }

  async validateUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
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

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        nationalId: true,
        profileImageUrl: true,
        address: true,
        latitude: true,
        longitude: true,
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
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  async updateProfile(userId: string, updateUserDto: UpdateUserDto, profileImage?: Express.Multer.File) {
    // Check if user exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Check for conflicts with email, phone, or nationalId
    if (updateUserDto.email || updateUserDto.phoneNumber || updateUserDto.nationalId) {
      const conflicts = await this.prisma.user.findFirst({
        where: {
          AND: [
            { id: { not: userId } },
            {
              OR: [
                updateUserDto.email ? { email: updateUserDto.email } : {},
                updateUserDto.phoneNumber ? { phoneNumber: updateUserDto.phoneNumber } : {},
                updateUserDto.nationalId ? { nationalId: updateUserDto.nationalId } : {},
              ].filter(obj => Object.keys(obj).length > 0),
            },
          ],
        },
      });

      if (conflicts) {
        if (conflicts.email === updateUserDto.email) {
          throw new ConflictException('Email already in use');
        }
        if (conflicts.phoneNumber === updateUserDto.phoneNumber) {
          throw new ConflictException('Phone number already in use');
        }
        if (conflicts.nationalId === updateUserDto.nationalId) {
          throw new ConflictException('National ID already in use');
        }
      }
    }

    // Upload profile image if provided
    let profileImageUrl: string | undefined;
    if (profileImage) {
      console.log('Uploading profile image to Cloudinary:', profileImage.originalname);
      try {
        profileImageUrl = await this.uploadService.uploadFile(profileImage, 'profiles');
        console.log('Profile image uploaded successfully:', profileImageUrl);

        // Delete old profile image from Cloudinary if exists
        if (user.profileImageUrl) {
          try {
            await this.uploadService.deleteFile(user.profileImageUrl);
          } catch (error) {
            console.error('Failed to delete old profile image:', error);
            // Continue with update even if deletion fails
          }
        }
      } catch (error) {
        console.error('Failed to upload profile image:', error);
        throw new BadRequestException('Failed to upload profile image');
      }
    }

    // Hash password if provided
    let hashedPassword: string | undefined;
    if (updateUserDto.password) {
      hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
    }

    // Update user
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...(updateUserDto.firstName && { firstName: updateUserDto.firstName }),
        ...(updateUserDto.lastName && { lastName: updateUserDto.lastName }),
        ...(updateUserDto.email && { email: updateUserDto.email }),
        ...(updateUserDto.phoneNumber && { phoneNumber: updateUserDto.phoneNumber }),
        ...(updateUserDto.nationalId && { nationalId: updateUserDto.nationalId }),
        ...(updateUserDto.address && { address: updateUserDto.address }),
        ...(updateUserDto.latitude !== undefined && { latitude: updateUserDto.latitude }),
        ...(updateUserDto.longitude !== undefined && { longitude: updateUserDto.longitude }),
        ...(hashedPassword && { password: hashedPassword }),
        ...(profileImageUrl && { profileImageUrl }),
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        nationalId: true,
        profileImageUrl: true,
        address: true,
        latitude: true,
        longitude: true,
        role: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return updatedUser;
  }

  async updateProfileImage(userId: string, profileImage: Express.Multer.File) {
    // Check if user exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (!profileImage) {
      throw new BadRequestException('No profile image provided');
    }

    // Upload profile image to Cloudinary
    console.log('Uploading profile image to Cloudinary:', profileImage.originalname);
    let profileImageUrl: string;
    try {
      profileImageUrl = await this.uploadService.uploadFile(profileImage, 'profiles');
      console.log('Profile image uploaded successfully:', profileImageUrl);

      // Delete old profile image from Cloudinary if exists
      if (user.profileImageUrl) {
        try {
          await this.uploadService.deleteFile(user.profileImageUrl);
          console.log('Old profile image deleted');
        } catch (error) {
          console.error('Failed to delete old profile image:', error);
          // Continue with update even if deletion fails
        }
      }
    } catch (error) {
      console.error('Failed to upload profile image:', error);
      throw new BadRequestException('Failed to upload profile image');
    }

    // Update user with new profile image URL
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        profileImageUrl,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        nationalId: true,
        profileImageUrl: true,
        address: true,
        latitude: true,
        longitude: true,
        role: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return updatedUser;
  }

  private async generateToken(userId: string, email: string, role: UserRole): Promise<string> {
    const payload = { sub: userId, email, role };
    return this.jwtService.signAsync(payload);
  }
}
