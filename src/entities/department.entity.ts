import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('departments')
export class Department {
  @PrimaryGeneratedColumn()
  department_id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  created_on: Date;

  @UpdateDateColumn()
  updated_on: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_on: Date;

  @ManyToOne(() => User, (User) => User.Department)
  createdBy: User;

  @ManyToOne(() => Department, (department) => department.childDepartments, {
    nullable: true,
  })
  parentDepartment: Department;

  @OneToMany(() => Department, (department) => department.parentDepartment)
  childDepartments: Department[];
}
