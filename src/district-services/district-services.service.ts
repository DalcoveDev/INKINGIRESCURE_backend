import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DistrictService } from './entities/district-service.entity';
import { CreateDistrictServiceDto } from './dto/create-district-service.dto';
import { UpdateDistrictServiceDto } from './dto/update-district-service.dto';

@Injectable()
export class DistrictServicesService {
  constructor(
    @InjectRepository(DistrictService)
    private districtServicesRepository: Repository<DistrictService>,
  ) {}

  create(createDistrictServiceDto: CreateDistrictServiceDto) {
    const districtService = this.districtServicesRepository.create(createDistrictServiceDto);
    return this.districtServicesRepository.save(districtService);
  }

  findAll() {
    return this.districtServicesRepository.find();
  }

  findOne(id: string) {
    return this.districtServicesRepository.findOne({ where: { id } });
  }

  update(id: string, updateDistrictServiceDto: UpdateDistrictServiceDto) {
    return this.districtServicesRepository.update(id, updateDistrictServiceDto);
  }

  remove(id: string) {
    return this.districtServicesRepository.delete(id);
  }
}