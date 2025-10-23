import { Repository } from 'typeorm';
import { DistrictService } from './entities/district-service.entity';
import { CreateDistrictServiceDto } from './dto/create-district-service.dto';
import { UpdateDistrictServiceDto } from './dto/update-district-service.dto';
export declare class DistrictServicesService {
    private districtServicesRepository;
    constructor(districtServicesRepository: Repository<DistrictService>);
    create(createDistrictServiceDto: CreateDistrictServiceDto): Promise<DistrictService>;
    findAll(): Promise<DistrictService[]>;
    findOne(id: string): Promise<DistrictService | null>;
    update(id: string, updateDistrictServiceDto: UpdateDistrictServiceDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
