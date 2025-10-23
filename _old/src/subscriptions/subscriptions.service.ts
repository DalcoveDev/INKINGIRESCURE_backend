import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionsRepository: Repository<Subscription>,
  ) {}

  create(createSubscriptionDto: CreateSubscriptionDto) {
    const subscription = this.subscriptionsRepository.create(createSubscriptionDto);
    return this.subscriptionsRepository.save(subscription);
  }

  findAll() {
    return this.subscriptionsRepository.find();
  }

  findOne(id: string) {
    return this.subscriptionsRepository.findOne({ where: { id } });
  }

  update(id: string, updateSubscriptionDto: UpdateSubscriptionDto) {
    return this.subscriptionsRepository.update(id, updateSubscriptionDto);
  }

  remove(id: string) {
    return this.subscriptionsRepository.delete(id);
  }
}