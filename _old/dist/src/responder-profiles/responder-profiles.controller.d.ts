import { ResponderProfilesService } from './responder-profiles.service';
import { CreateResponderProfileDto } from './dto/create-responder-profile.dto';
import { UpdateResponderProfileDto } from './dto/update-responder-profile.dto';
export declare class ResponderProfilesController {
    private readonly responderProfilesService;
    constructor(responderProfilesService: ResponderProfilesService);
    create(createResponderProfileDto: CreateResponderProfileDto): Promise<import("./entities/responder-profile.entity").ResponderProfile>;
    findAll(): Promise<import("./entities/responder-profile.entity").ResponderProfile[]>;
    findOne(id: string): Promise<import("./entities/responder-profile.entity").ResponderProfile | null>;
    update(id: string, updateResponderProfileDto: UpdateResponderProfileDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
