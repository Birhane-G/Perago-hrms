import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/services/user.service';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(private userService: UserService) {}
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    console.log('cfgvhbj');
    if (request?.user) {
      // const { id } = request.user;
      console.log('cfgvhbj');
      return true;
    }
    return true;
  }
}
