import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRole } from 'src/entities/userrole.entity';
import { UserDetail } from 'src/entities/userdetail.entity';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from 'src/config/guard/jwt.auth.guard';
import { AdminRoleGuard } from 'src/config/guard/admin.guard';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User, UserRole, UserDetail]),
  ],
  controllers: [UserController],
  providers: [UserService, JwtAuthGuard, AdminRoleGuard],
  exports: [UserService],
})
export class UserModule {}
