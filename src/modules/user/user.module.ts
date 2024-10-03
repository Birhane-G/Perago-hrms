import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRole } from 'src/entities/userrole.entity';
import { UserDetail } from 'src/entities/userdetail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRole, UserDetail])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
