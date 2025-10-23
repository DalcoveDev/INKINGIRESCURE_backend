import { PartialType } from '@nestjs/mapped-types';
import { CreateDistrictServiceDto } from './create-district-service.dto';

export class UpdateDistrictServiceDto extends PartialType(CreateDistrictServiceDto) {}