import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
  ) {}

  create(createNotificationDto: CreateNotificationDto) {
    const notification = this.notificationsRepository.create(createNotificationDto);
    return this.notificationsRepository.save(notification);
  }

  findAll() {
    return this.notificationsRepository.find();
  }

  findOne(id: string) {
    return this.notificationsRepository.findOne({ where: { id } });
  }

  update(id: string, updateNotificationDto: UpdateNotificationDto) {
    return this.notificationsRepository.update(id, updateNotificationDto);
  }

  remove(id: string) {
    return this.notificationsRepository.delete(id);
  }
}