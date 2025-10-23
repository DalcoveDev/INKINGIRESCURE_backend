import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
export declare class ResourcesController {
    private readonly resourcesService;
    constructor(resourcesService: ResourcesService);
    create(createResourceDto: CreateResourceDto): Promise<import("./entities/resource.entity").Resource>;
    findAll(): Promise<import("./entities/resource.entity").Resource[]>;
    findOne(id: string): Promise<import("./entities/resource.entity").Resource | null>;
    update(id: string, updateResourceDto: UpdateResourceDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
