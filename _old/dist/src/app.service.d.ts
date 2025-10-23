import { Repository } from 'typeorm';
import { User } from './users/entities/user.entity';
import { EmergencyReport } from './emergency-reports/entities/emergency-report.entity';
import { Thread } from './threads/entities/thread.entity';
import { Message } from './messages/entities/message.entity';
import { Role } from './roles/entities/role.entity';
export declare class AppService {
    private usersRepository;
    private reportsRepository;
    private threadsRepository;
    private messagesRepository;
    private rolesRepository;
    constructor(usersRepository: Repository<User>, reportsRepository: Repository<EmergencyReport>, threadsRepository: Repository<Thread>, messagesRepository: Repository<Message>, rolesRepository: Repository<Role>);
    getHello(): string;
    getDatabaseSummary(): {
        message: string;
        instructions: string;
    };
}
