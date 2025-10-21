import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users/entities/user.entity';
import { EmergencyReport } from './emergency-reports/entities/emergency-report.entity';
import { Thread } from './threads/entities/thread.entity';
import { Message } from './messages/entities/message.entity';
import { Role } from './roles/entities/role.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(EmergencyReport)
    private reportsRepository: Repository<EmergencyReport>,
    @InjectRepository(Thread)
    private threadsRepository: Repository<Thread>,
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  getDatabaseSummary() {
    return {
      message: 'Database summary endpoint is available but not implemented in this simplified version.',
      instructions: 'Please check the COMPLETE_API_DOCS.md file for database integration details and sample data.'
    };
  }
}
