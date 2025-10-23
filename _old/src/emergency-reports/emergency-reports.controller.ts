import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmergencyReportsService } from './emergency-reports.service';
import { CreateEmergencyReportDto } from './dto/create-emergency-report.dto';
import { UpdateEmergencyReportDto } from './dto/update-emergency-report.dto';

@Controller('emergency-reports')
export class EmergencyReportsController {
  constructor(private readonly emergencyReportsService: EmergencyReportsService) {}

  @Post()
  create(@Body() createEmergencyReportDto: CreateEmergencyReportDto) {
    return this.emergencyReportsService.create(createEmergencyReportDto);
  }

  @Get()
  findAll() {
    return this.emergencyReportsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emergencyReportsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmergencyReportDto: UpdateEmergencyReportDto) {
    return this.emergencyReportsService.update(id, updateEmergencyReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emergencyReportsService.remove(id);
  }
}