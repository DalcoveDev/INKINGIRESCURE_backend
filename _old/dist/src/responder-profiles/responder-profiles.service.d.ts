import { Repository } from 'typeorm';
import { ResponderProfile } from './entities/responder-profile.entity';
import { CreateResponderProfileDto } from './dto/create-responder-profile.dto';
import { UpdateResponderProfileDto } from './dto/update-responder-profile.dto';
export declare class ResponderProfilesService {
    private responderProfilesRepository;
    constructor(responderProfilesRepository: Repository<ResponderProfile>);
    create(createResponderProfileDto: CreateResponderProfileDto): Promise<ResponderProfile>;
    findAll(): Promise<ResponderProfile[]>;
    findOne(id: string): Promise<ResponderProfile | null>;
    update(id: string, updateResponderProfileDto: UpdateResponderProfileDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
