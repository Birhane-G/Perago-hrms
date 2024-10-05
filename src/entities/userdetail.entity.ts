import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('userdetails')
export class UserDetail {
  @PrimaryGeneratedColumn()
  userdetail_id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  phonenumber: number;

  @Column()
  hiredate: Date;

  @Column()
  terminationdate: Date;

  @CreateDateColumn()
  created_on: Date;

  @UpdateDateColumn()
  updated_on: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_on: Date;

  @OneToOne(() => User, (user) => user.userDetails)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
