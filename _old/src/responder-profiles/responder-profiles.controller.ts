import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResponderProfilesService } from './responder-profiles.service';
import { CreateResponderProfileDto } from './dto/create-responder-profile.dto';
import { UpdateResponderProfileDto } from './dto/update-responder-profile.dto';

@Controller('responder-profiles')
export class ResponderProfilesController {
  constructor(private readonly responderProfilesService: ResponderProfilesService) {}

  @Post()
  create(@Body() createResponderProfileDto: CreateResponderProfileDto) {
    return this.responderProfilesService.create(createResponderProfileDto);
  }

  @Get()
  findAll() {
    return this.responderProfilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.responderProfilesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResponderProfileDto: UpdateResponderProfileDto) {
    return this.responderProfilesService.update(id, updateResponderProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.responderProfilesService.remove(id);
  }
}