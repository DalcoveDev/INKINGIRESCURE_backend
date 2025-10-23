import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // Check if user already exists
    const existingUser = await this.usersService.findByPhoneOrEmail(
      registerDto.phone,
      registerDto.email,
    );

    if (existingUser) {
      throw new ConflictException('User with this phone or email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Create user with hashed password
    const userId = uuidv4();
    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });
    
    // Set the generated ID
    user.id = userId;

    // Remove password from response
    const { password, ...result } = user;

    // Generate JWT token
    const token = await this.generateToken(user);

    return {
      message: 'User registered successfully',
      user: result,
      access_token: token,
    };
  }

  async login(loginDto: LoginDto) {
    // Find user by phone or email
    const user = await this.usersService.findByPhoneOrEmail(
      loginDto.phoneOrEmail,
      loginDto.phoneOrEmail,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const token = await this.generateToken(user);

    // Remove password from response
    const { password, ...result } = user;

    return {
      message: 'Login successful',
      user: result,
      access_token: token,
    };
  }

  async validateUser(userId: string) {
    const user = await this.usersService.findOne(+userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const { password, ...result } = user;
    return result;
  }

  private async generateToken(user: any) {
    const payload = {
      sub: user.id,
      phone: user.phone,
      email: user.email,
      role: user.role_id,
    };

    return this.jwtService.sign(payload);
  }
}
