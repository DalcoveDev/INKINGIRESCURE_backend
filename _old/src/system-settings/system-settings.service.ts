import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemSetting } from './entities/system-setting.entity';
import { CreateSystemSettingDto } from './dto/create-system-setting.dto';
import { UpdateSystemSettingDto } from './dto/update-system-setting.dto';

@Injectable()
export class SystemSettingsService {
  constructor(
    @InjectRepository(SystemSetting)
    private systemSettingsRepository: Repository<SystemSetting>,
  ) {}

  create(createSystemSettingDto: CreateSystemSettingDto) {
    const systemSetting = this.systemSettingsRepository.create(createSystemSettingDto);
    return this.systemSettingsRepository.save(systemSetting);
  }

  findAll() {
    return this.systemSettingsRepository.find();
  }

  findOne(id: string) {
    return this.systemSettingsRepository.findOne({ where: { id } });
  }

  update(id: string, updateSystemSettingDto: UpdateSystemSettingDto) {
    return this.systemSettingsRepository.update(id, updateSystemSettingDto);
  }

  remove(id: string) {
    return this.systemSettingsRepository.delete(id);
  }
}