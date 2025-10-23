import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Thread } from './entities/thread.entity';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';

@Injectable()
export class ThreadsService {
  constructor(
    @InjectRepository(Thread)
    private threadsRepository: Repository<Thread>,
  ) {}

  create(createThreadDto: CreateThreadDto) {
    const thread = this.threadsRepository.create(createThreadDto);
    return this.threadsRepository.save(thread);
  }

  findAll() {
    return this.threadsRepository.find();
  }

  findOne(id: string) {
    return this.threadsRepository.findOne({ where: { id } });
  }

  update(id: string, updateThreadDto: UpdateThreadDto) {
    return this.threadsRepository.update(id, updateThreadDto);
  }

  remove(id: string) {
    return this.threadsRepository.delete(id);
  }
}