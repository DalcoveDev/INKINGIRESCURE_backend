import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from './entities/resource.entity';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resource)
    private resourcesRepository: Repository<Resource>,
  ) {}

  create(createResourceDto: CreateResourceDto) {
    const resource = this.resourcesRepository.create(createResourceDto);
    return this.resourcesRepository.save(resource);
  }

  findAll() {
    return this.resourcesRepository.find();
  }

  findOne(id: string) {
    return this.resourcesRepository.findOne({ where: { id } });
  }

  update(id: string, updateResourceDto: UpdateResourceDto) {
    return this.resourcesRepository.update(id, updateResourceDto);
  }

  remove(id: string) {
    return this.resourcesRepository.delete(id);
  }
}