import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportStatusHistoryService } from './report-status-history.service';
import { ReportStatusHistoryController } from './report-status-history.controller';
import { ReportStatusHistory } from './entities/report-status-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReportStatusHistory])],
  controllers: [ReportStatusHistoryController],
  providers: [ReportStatusHistoryService],
  exports: [ReportStatusHistoryService],
})
export class ReportStatusHistoryModule {}