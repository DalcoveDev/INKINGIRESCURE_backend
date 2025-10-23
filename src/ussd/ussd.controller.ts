import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { UssdService } from './ussd.service';
import { ReportEmergencyUssdDto, CreateUserUssdDto, DistressAlertDto } from './dto';

@ApiTags('USSD')
@Controller('ussd')
export class UssdController {
  constructor(private readonly ussdService: UssdService) {}

  @Post('report-emergency')
  @ApiOperation({ summary: 'Report emergency via USSD' })
  @ApiResponse({ status: 201, description: 'Emergency reported successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async reportEmergency(@Body() reportEmergencyDto: ReportEmergencyUssdDto) {
    return this.ussdService.reportEmergency(reportEmergencyDto);
  }

  @Post('distress')
  @ApiOperation({ summary: 'Send distress signal - CRITICAL emergency alert via USSD' })
  @ApiResponse({ status: 201, description: 'Distress signal sent successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async reportDistress(@Body() distressAlertDto: DistressAlertDto) {
    return this.ussdService.reportDistress(distressAlertDto);
  }

  @Get('emergencies')
  @ApiOperation({ summary: 'Get all emergencies (USSD)' })
  @ApiResponse({ status: 200, description: 'Emergencies retrieved successfully' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'offset', required: false, type: Number })
  async getEmergencies(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.ussdService.getEmergencies(
      limit ? parseInt(limit) : 20,
      offset ? parseInt(offset) : 0,
    );
  }

  @Get('emergency/:id')
  @ApiOperation({ summary: 'Get emergency by ID (USSD)' })
  @ApiResponse({ status: 200, description: 'Emergency retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Emergency not found' })
  async getEmergencyById(@Param('id') id: string) {
    return this.ussdService.getEmergencyById(id);
  }

  @Get('user-emergencies')
  @ApiOperation({ summary: 'Get user emergencies by phone number (USSD)' })
  @ApiResponse({ status: 200, description: 'User emergencies retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiQuery({ name: 'phoneNumber', required: true, type: String })
  async getUserEmergencies(@Query('phoneNumber') phoneNumber: string) {
    return this.ussdService.getUserEmergencies(phoneNumber);
  }

  @Get('posts')
  @ApiOperation({ summary: 'Get community posts (USSD)' })
  @ApiResponse({ status: 200, description: 'Posts retrieved successfully' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'offset', required: false, type: Number })
  async getPosts(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.ussdService.getPosts(
      limit ? parseInt(limit) : 10,
      offset ? parseInt(offset) : 0,
    );
  }

  @Get('posts/:id')
  @ApiOperation({ summary: 'Get post by ID (USSD)' })
  @ApiResponse({ status: 200, description: 'Post retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  async getPostById(@Param('id') id: string) {
    return this.ussdService.getPostById(id);
  }

  @Post('create-user')
  @ApiOperation({ summary: 'Create user via USSD' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 409, description: 'User already exists' })
  async createUser(@Body() createUserDto: CreateUserUssdDto) {
    return this.ussdService.createUser(createUserDto);
  }

  @Get('user')
  @ApiOperation({ summary: 'Get user by phone number (USSD)' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiQuery({ name: 'phoneNumber', required: true, type: String })
  async getUser(@Query('phoneNumber') phoneNumber: string) {
    return this.ussdService.getUser(phoneNumber);
  }
}
