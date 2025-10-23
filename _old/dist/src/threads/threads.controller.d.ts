import { ThreadsService } from './threads.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
export declare class ThreadsController {
    private readonly threadsService;
    constructor(threadsService: ThreadsService);
    create(createThreadDto: CreateThreadDto): Promise<import("./entities/thread.entity").Thread>;
    findAll(): Promise<import("./entities/thread.entity").Thread[]>;
    findOne(id: string): Promise<import("./entities/thread.entity").Thread | null>;
    update(id: string, updateThreadDto: UpdateThreadDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
