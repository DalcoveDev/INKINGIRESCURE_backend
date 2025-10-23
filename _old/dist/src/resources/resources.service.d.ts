import { Repository } from 'typeorm';
import { Resource } from './entities/resource.entity';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
export declare class ResourcesService {
    private resourcesRepository;
    constructor(resourcesRepository: Repository<Resource>);
    create(createResourceDto: CreateResourceDto): Promise<Resource>;
    findAll(): Promise<Resource[]>;
    findOne(id: string): Promise<Resource | null>;
    update(id: string, updateResourceDto: UpdateResourceDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
