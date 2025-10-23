import { Repository } from 'typeorm';
import { SystemSetting } from './entities/system-setting.entity';
import { CreateSystemSettingDto } from './dto/create-system-setting.dto';
import { UpdateSystemSettingDto } from './dto/update-system-setting.dto';
export declare class SystemSettingsService {
    private systemSettingsRepository;
    constructor(systemSettingsRepository: Repository<SystemSetting>);
    create(createSystemSettingDto: CreateSystemSettingDto): Promise<SystemSetting>;
    findAll(): Promise<SystemSetting[]>;
    findOne(id: string): Promise<SystemSetting | null>;
    update(id: string, updateSystemSettingDto: UpdateSystemSettingDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
