import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DistrictServicesService } from './district-services.service';
import { CreateDistrictServiceDto } from './dto/create-district-service.dto';
import { UpdateDistrictServiceDto } from './dto/update-district-service.dto';

@Controller('district-services')
export class DistrictServicesController {
  constructor(private readonly districtServicesService: DistrictServicesService) {}

  @Post()
  create(@Body() createDistrictServiceDto: CreateDistrictServiceDto) {
    return this.districtServicesService.create(createDistrictServiceDto);
  }

  @Get()
  findAll() {
    return this.districtServicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.districtServicesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDistrictServiceDto: UpdateDistrictServiceDto) {
    return this.districtServicesService.update(id, updateDistrictServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.districtServicesService.remove(id);
  }
}