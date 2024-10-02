import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('userroles')
export class UserRole {
  @PrimaryGeneratedColumn()
  role_id: number;

  @Column({
    unique: true,
    type: 'enum',
    enum: ['admin', 'employee'],
  })
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_on: Date;

  @UpdateDateColumn()
  updated_on: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_on: Date;

  @OneToMany(() => User, (user) => user.UserRole)
  users: User[];
}
