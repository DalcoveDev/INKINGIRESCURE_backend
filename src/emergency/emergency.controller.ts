import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiConsumes } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { EmergencyService } from './emergency.service';
import { CreateEmergencyDto, UpdateEmergencyDto, AssignResponderDto, UpdateStatusDto, AddUpdateDto, VolunteerDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CurrentUser, Roles, Public } from '../auth/decorators';
import { UserRole, EmergencyStatus } from '../../generated/prisma';

@ApiTags('Emergency')
@Controller('emergency')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class EmergencyController {
  constructor(private readonly emergencyService: EmergencyService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new emergency request' })
  @ApiResponse({ status: 201, description: 'Emergency created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(@CurrentUser() user: any, @Body() createEmergencyDto: CreateEmergencyDto) {
    return this.emergencyService.create(user.id, createEmergencyDto);
  }

  @Post('with-media')
  @UseInterceptors(FilesInterceptor('files', 10))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create emergency with media files in one request' })
  @ApiResponse({ status: 201, description: 'Emergency created with media successfully' })
  async createWithMedia(
    @CurrentUser() user: any,
    @Body() createEmergencyDto: CreateEmergencyDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.emergencyService.createWithMedia(user.id, createEmergencyDto, files);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all emergencies with optional filters' })
  @ApiQuery({ name: 'status', enum: EmergencyStatus, required: false })
  @ApiQuery({ name: 'type', required: false })
  @ApiQuery({ name: 'userId', required: false })
  @ApiQuery({ name: 'responderId', required: false })
  @ApiResponse({ status: 200, description: 'Emergencies retrieved successfully' })
  findAll(
    @Query('status') status?: EmergencyStatus,
    @Query('type') type?: string,
    @Query('userId') userId?: string,
    @Query('responderId') responderId?: string,
  ) {
    return this.emergencyService.findAll({ status, type, userId, responderId });
  }

  @Public()
  @Get('nearby')
  @ApiOperation({ summary: 'Find nearby emergencies based on location' })
  @ApiQuery({ name: 'latitude', required: true, type: Number })
  @ApiQuery({ name: 'longitude', required: true, type: Number })
  @ApiQuery({ name: 'radius', required: false, type: Number, description: 'Radius in kilometers (default: 10)' })
  @ApiResponse({ status: 200, description: 'Nearby emergencies retrieved successfully' })
  findNearby(
    @Query('latitude') latitude: string,
    @Query('longitude') longitude: string,
    @Query('radius') radius?: string,
  ) {
    return this.emergencyService.findNearbyEmergencies(
      parseFloat(latitude),
      parseFloat(longitude),
      radius ? parseFloat(radius) : 10,
    );
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get emergency by ID' })
  @ApiResponse({ status: 200, description: 'Emergency retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Emergency not found' })
  findOne(@Param('id') id: string) {
    return this.emergencyService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update emergency details' })
  @ApiResponse({ status: 200, description: 'Emergency updated successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Can only update own emergencies' })
  @ApiResponse({ status: 404, description: 'Emergency not found' })
  update(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() updateEmergencyDto: UpdateEmergencyDto,
  ) {
    return this.emergencyService.update(id, user.id, user.role, updateEmergencyDto);
  }

  @Patch(':id/status')
  @Roles(UserRole.RESPONDER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Update emergency status (Responders/Admin only)' })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Responder or Admin access required' })
  @ApiResponse({ status: 404, description: 'Emergency not found' })
  updateStatus(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return this.emergencyService.updateStatus(id, updateStatusDto, user.id);
  }

  @Post(':id/assign')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Assign responder to emergency (Admin only)' })
  @ApiResponse({ status: 200, description: 'Responder assigned successfully' })
  @ApiResponse({ status: 400, description: 'Bad request - Responder not available or emergency resolved' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
  @ApiResponse({ status: 404, description: 'Emergency or responder not found' })
  assignResponder(@Param('id') id: string, @Body() assignResponderDto: AssignResponderDto) {
    return this.emergencyService.assignResponder(id, assignResponderDto);
  }

  @Post(':id/updates')
  @ApiOperation({ summary: 'Add update to emergency' })
  @ApiResponse({ status: 201, description: 'Update added successfully' })
  @ApiResponse({ status: 404, description: 'Emergency not found' })
  addUpdate(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() addUpdateDto: AddUpdateDto,
  ) {
    return this.emergencyService.addUpdate(id, addUpdateDto, user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete emergency' })
  @ApiResponse({ status: 200, description: 'Emergency deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Can only delete own emergencies' })
  @ApiResponse({ status: 404, description: 'Emergency not found' })
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.emergencyService.remove(id, user.id, user.role);
  }

  // Volunteer Endpoints
  @Post(':id/volunteer')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Volunteer to help with an emergency' })
  @ApiResponse({ status: 201, description: 'Volunteer entry created successfully' })
  @ApiResponse({ status: 400, description: 'Cannot volunteer for resolved/cancelled emergency' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Login required' })
  @ApiResponse({ status: 404, description: 'Emergency not found' })
  @ApiResponse({ status: 409, description: 'Already volunteered for this emergency' })
  volunteerForEmergency(
    @Param('id') emergencyId: string,
    @CurrentUser() user: any,
    @Body() volunteerDto: VolunteerDto,
  ) {
    return this.emergencyService.volunteerForEmergency(emergencyId, user.id, volunteerDto);
  }

  @Public()
  @Get(':id/volunteers')
  @ApiOperation({ summary: 'Get all volunteers for an emergency' })
  @ApiResponse({ status: 200, description: 'Volunteers retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Emergency not found' })
  getVolunteers(@Param('id') emergencyId: string) {
    return this.emergencyService.getVolunteers(emergencyId);
  }

  @Post(':id/volunteers/:volunteerId/accept')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Accept a volunteer (Admin only)' })
  @ApiResponse({ status: 200, description: 'Volunteer accepted successfully' })
  @ApiResponse({ status: 400, description: 'Volunteer does not belong to this emergency' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
  @ApiResponse({ status: 404, description: 'Volunteer not found' })
  @ApiResponse({ status: 409, description: 'Volunteer already accepted' })
  acceptVolunteer(
    @Param('id') emergencyId: string,
    @Param('volunteerId') volunteerId: string,
    @CurrentUser() user: any,
  ) {
    return this.emergencyService.acceptVolunteer(emergencyId, volunteerId, user.id);
  }

  @Delete(':id/volunteers/:volunteerId')
  @ApiOperation({ summary: 'Remove volunteer entry' })
  @ApiResponse({ status: 200, description: 'Volunteer entry removed successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Can only remove own volunteer entry' })
  @ApiResponse({ status: 404, description: 'Volunteer not found' })
  removeVolunteer(
    @Param('id') emergencyId: string,
    @Param('volunteerId') volunteerId: string,
    @CurrentUser() user: any,
  ) {
    return this.emergencyService.removeVolunteer(emergencyId, volunteerId, user.id, user.role);
  }

  // Media Upload Endpoints
  @Post(':id/media')
  @UseInterceptors(FilesInterceptor('files', 10))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload media files (images, videos, audio) to emergency' })
  @ApiResponse({ status: 201, description: 'Media uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Invalid file type or size' })
  @ApiResponse({ status: 404, description: 'Emergency not found' })
  async uploadMedia(
    @Param('id') emergencyId: string,
    @UploadedFiles() files: Express.Multer.File[],
    @CurrentUser() user: any,
  ) {
    return this.emergencyService.uploadMedia(emergencyId, files, user.id);
  }

  @Delete('media/:mediaId')
  @ApiOperation({ summary: 'Delete media file from emergency' })
  @ApiResponse({ status: 200, description: 'Media deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Can only delete media from own emergencies' })
  @ApiResponse({ status: 404, description: 'Media not found' })
  deleteMedia(@Param('mediaId') mediaId: string, @CurrentUser() user: any) {
    return this.emergencyService.deleteMedia(mediaId, user.id, user.role);
  }
}
