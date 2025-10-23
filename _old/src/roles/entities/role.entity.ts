import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('roles')
export class Role {
  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar', { unique: true })
  name: string;

  @Column('int')
  level: number;

  // Relationships
  @OneToMany(() => User, user => user.role)
  users: User[];
}