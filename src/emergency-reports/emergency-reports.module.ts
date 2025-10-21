import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmergencyReportsService } from './emergency-reports.service';
import { EmergencyReportsController } from './emergency-reports.controller';
import { EmergencyReport } from './entities/emergency-report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmergencyReport])],
  controllers: [EmergencyReportsController],
  providers: [EmergencyReportsService],
  exports: [EmergencyReportsService],
})
export class EmergencyReportsModule {}