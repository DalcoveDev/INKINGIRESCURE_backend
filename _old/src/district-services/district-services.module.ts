import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistrictServicesService } from './district-services.service';
import { DistrictServicesController } from './district-services.controller';
import { DistrictService } from './entities/district-service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DistrictService])],
  controllers: [DistrictServicesController],
  providers: [DistrictServicesService],
  exports: [DistrictServicesService],
})
export class DistrictServicesModule {}