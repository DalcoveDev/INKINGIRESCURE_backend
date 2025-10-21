import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {}

  create(createMessageDto: CreateMessageDto) {
    const message = this.messagesRepository.create(createMessageDto);
    return this.messagesRepository.save(message);
  }

  findAll() {
    return this.messagesRepository.find();
  }

  findOne(id: string) {
    return this.messagesRepository.findOne({ where: { id } });
  }

  update(id: string, updateMessageDto: UpdateMessageDto) {
    return this.messagesRepository.update(id, updateMessageDto);
  }

  remove(id: string) {
    return this.messagesRepository.delete(id);
  }
}