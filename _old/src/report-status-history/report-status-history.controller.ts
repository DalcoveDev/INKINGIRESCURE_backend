import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReportStatusHistoryService } from './report-status-history.service';
import { CreateReportStatusHistoryDto } from './dto/create-report-status-history.dto';
import { UpdateReportStatusHistoryDto } from './dto/update-report-status-history.dto';

@Controller('report-status-history')
export class ReportStatusHistoryController {
  constructor(private readonly reportStatusHistoryService: ReportStatusHistoryService) {}

  @Post()
  create(@Body() createReportStatusHistoryDto: CreateReportStatusHistoryDto) {
    return this.reportStatusHistoryService.create(createReportStatusHistoryDto);
  }

  @Get()
  findAll() {
    return this.reportStatusHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportStatusHistoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReportStatusHistoryDto: UpdateReportStatusHistoryDto) {
    return this.reportStatusHistoryService.update(id, updateReportStatusHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportStatusHistoryService.remove(id);
  }
}