import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('district_services')
export class DistrictService {
  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar', { unique: true })
  district: string;

  @Column('varchar', { nullable: true })
  police_contact: string;

  @Column('varchar', { nullable: true })
  hospital_contact: string;

  @Column('varchar', { nullable: true })
  fire_department_contact: string;

  @Column('varchar', { nullable: true, array: true })
  other_services: string[];
}