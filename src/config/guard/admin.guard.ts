import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserService } from 'src/modules/user/services/user.service';
import { JwtAuthGuard } from './jwt.auth.guard';
@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private jwtAuthGuard: JwtAuthGuard,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    await this.jwtAuthGuard.canActivate(context);
    if (request?.user.UserRole.name !== 'admin')
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    return true;
  }
}
