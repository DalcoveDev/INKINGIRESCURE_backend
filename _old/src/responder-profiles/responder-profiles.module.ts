import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponderProfilesService } from './responder-profiles.service';
import { ResponderProfilesController } from './responder-profiles.controller';
import { ResponderProfile } from './entities/responder-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResponderProfile])],
  controllers: [ResponderProfilesController],
  providers: [ResponderProfilesService],
  exports: [ResponderProfilesService],
})
export class ResponderProfilesModule {}