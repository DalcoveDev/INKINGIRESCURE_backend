import { Repository } from 'typeorm';
import { Thread } from './entities/thread.entity';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
export declare class ThreadsService {
    private threadsRepository;
    constructor(threadsRepository: Repository<Thread>);
    create(createThreadDto: CreateThreadDto): Promise<Thread>;
    findAll(): Promise<Thread[]>;
    findOne(id: string): Promise<Thread | null>;
    update(id: string, updateThreadDto: UpdateThreadDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
