import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponderProfile } from './entities/responder-profile.entity';
import { CreateResponderProfileDto } from './dto/create-responder-profile.dto';
import { UpdateResponderProfileDto } from './dto/update-responder-profile.dto';

@Injectable()
export class ResponderProfilesService {
  constructor(
    @InjectRepository(ResponderProfile)
    private responderProfilesRepository: Repository<ResponderProfile>,
  ) {}

  create(createResponderProfileDto: CreateResponderProfileDto) {
    const responderProfile = this.responderProfilesRepository.create(createResponderProfileDto);
    return this.responderProfilesRepository.save(responderProfile);
  }

  findAll() {
    return this.responderProfilesRepository.find();
  }

  findOne(id: string) {
    return this.responderProfilesRepository.findOne({ where: { id } });
  }

  update(id: string, updateResponderProfileDto: UpdateResponderProfileDto) {
    return this.responderProfilesRepository.update(id, updateResponderProfileDto);
  }

  remove(id: string) {
    return this.responderProfilesRepository.delete(id);
  }
}