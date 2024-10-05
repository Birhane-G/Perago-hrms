import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { UserRole } from 'src/entities/userrole.entity';
import { UserDetail } from 'src/entities/userdetail.entity';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from 'src/config/guard/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserService } from '../user/services/user.service';
import { JwtStrategy } from 'src/config/guard/jwt.strategy';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      global: true,
      secret:
        'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([User, UserRole, UserDetail]),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
