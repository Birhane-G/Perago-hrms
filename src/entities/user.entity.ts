import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserDetail } from './userdetail.entity';
import { UserRole } from './userrole.entity';
import { Department } from './department.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ unique: true, length: 50 })
  username: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_on: Date;

  @UpdateDateColumn()
  updated_on: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_on: Date;

  @OneToOne(() => UserDetail, (userDetails) => userDetails.user)
  userDetails: UserDetail;

  @ManyToOne(() => UserRole, (UserRole) => UserRole.users)
  @JoinColumn({ name: 'userRole' })
  UserRole: UserRole;

  @OneToMany(() => Department, (Department) => Department.createdBy)
  Department: Department[];
}
