import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IncidentLogsService } from './incident-logs.service';
import { CreateIncidentLogDto } from './dto/create-incident-log.dto';
import { UpdateIncidentLogDto } from './dto/update-incident-log.dto';

@Controller('incident-logs')
export class IncidentLogsController {
  constructor(private readonly incidentLogsService: IncidentLogsService) {}

  @Post()
  create(@Body() createIncidentLogDto: CreateIncidentLogDto) {
    return this.incidentLogsService.create(createIncidentLogDto);
  }

  @Get()
  findAll() {
    return this.incidentLogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.incidentLogsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIncidentLogDto: UpdateIncidentLogDto) {
    return this.incidentLogsService.update(id, updateIncidentLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.incidentLogsService.remove(id);
  }
}