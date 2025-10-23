import { DistrictServicesService } from './district-services.service';
import { CreateDistrictServiceDto } from './dto/create-district-service.dto';
import { UpdateDistrictServiceDto } from './dto/update-district-service.dto';
export declare class DistrictServicesController {
    private readonly districtServicesService;
    constructor(districtServicesService: DistrictServicesService);
    create(createDistrictServiceDto: CreateDistrictServiceDto): Promise<import("./entities/district-service.entity").DistrictService>;
    findAll(): Promise<import("./entities/district-service.entity").DistrictService[]>;
    findOne(id: string): Promise<import("./entities/district-service.entity").DistrictService | null>;
    update(id: string, updateDistrictServiceDto: UpdateDistrictServiceDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
