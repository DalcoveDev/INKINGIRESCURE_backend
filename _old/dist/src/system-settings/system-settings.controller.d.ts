import { SystemSettingsService } from './system-settings.service';
import { CreateSystemSettingDto } from './dto/create-system-setting.dto';
import { UpdateSystemSettingDto } from './dto/update-system-setting.dto';
export declare class SystemSettingsController {
    private readonly systemSettingsService;
    constructor(systemSettingsService: SystemSettingsService);
    create(createSystemSettingDto: CreateSystemSettingDto): Promise<import("./entities/system-setting.entity").SystemSetting>;
    findAll(): Promise<import("./entities/system-setting.entity").SystemSetting[]>;
    findOne(id: string): Promise<import("./entities/system-setting.entity").SystemSetting | null>;
    update(id: string, updateSystemSettingDto: UpdateSystemSettingDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
