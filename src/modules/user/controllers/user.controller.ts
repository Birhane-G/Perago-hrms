import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RoleDto } from '../dto/role.dto';
import { UserService } from '../services/user.service';
import { UserDto } from '../dto/user.dto';
import { AdminRoleGuard } from 'src/config/guard/admin.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  /**
   * Handles findallUsers @GET requests.
   * @returns The all users.
   */
  @Get()
  async findAllUsers() {
    return await this.userService.findAllUsers();
  }
  /**
   * Handles createnewuser @POST requests.
   * @param userDto The user DTO data.
   * @returns The newly created user object.
   */
  @Post('createuser')
  async createUser(@Body() userDto: UserDto) {
    return await this.userService.createUser(userDto);
  }
  /**
   * Handles createnewrole @POST requests.
   * @param roleDto The role DTO data.
   * @returns The newly created role object.
   */
  @Post('role')
  async createRole(@Body() roleDto: RoleDto) {
    return await this.userService.createRole(roleDto);
  }
  /**
   * Handles findallroles @GET requests.
   * @param roleDto The role DTO data.
   * @returns The newly created role object.
   */
  @Get('role')
  async findAllRoles() {
    return await this.userService.findAllRoles();
  }
}
