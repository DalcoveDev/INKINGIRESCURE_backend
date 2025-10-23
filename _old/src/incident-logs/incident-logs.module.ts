import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncidentLogsService } from './incident-logs.service';
import { IncidentLogsController } from './incident-logs.controller';
import { IncidentLog } from './entities/incident-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IncidentLog])],
  controllers: [IncidentLogsController],
  providers: [IncidentLogsService],
  exports: [IncidentLogsService],
})
export class IncidentLogsModule {}