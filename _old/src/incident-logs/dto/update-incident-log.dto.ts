import { PartialType } from '@nestjs/mapped-types';
import { CreateIncidentLogDto } from './create-incident-log.dto';

export class UpdateIncidentLogDto extends PartialType(CreateIncidentLogDto) {}