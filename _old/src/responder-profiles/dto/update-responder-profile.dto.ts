import { PartialType } from '@nestjs/mapped-types';
import { CreateResponderProfileDto } from './create-responder-profile.dto';

export class UpdateResponderProfileDto extends PartialType(CreateResponderProfileDto) {}