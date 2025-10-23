import { Entity, Column, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('system_settings')
export class SystemSetting {
  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar', { unique: true })
  key: string;

  @Column('text')
  value: string;

  @UpdateDateColumn()
  updated_at: Date;
}