import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { SignUpDto } from 'src/modules/auth/dto/signup.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/entities/userrole.entity';
import { RoleDto } from '../dto/role.dto';
import { UserDto } from '../dto/user.dto';
import { UserDetailDto } from '../dto/userdetail.dto';
import { UserDetail } from 'src/entities/userdetail.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserRole)
    private readonly roleRepository: Repository<UserRole>,
    @InjectRepository(UserDetail)
    private readonly userDetailRepository: Repository<UserDetail>,
  ) {}
  /**
   *  Checks if a email with the given email exists.
   *  @param email The emial of the user to check.
   *  @returns The `user` object if found, otherwise `null`.
   */
  async checkEmail(email: any): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }
  /**
   *  Checks if a username with the given username exists.
   *  @param username The username of the user to check.
   *  @returns The `user` object if found, otherwise `null`.
   */
  async checkUserName(username: any): Promise<User | null> {
    return await this.userRepository.findOne({ where: { username } });
  }
  /**
   *  Checks if a role with the given name exists.
   *  @param name The name of the role to check.
   *  @returns The `UserRole` object if found, otherwise `null`.
   */
  async checkRole(name: any): Promise<UserRole | null> {
    return await this.roleRepository.findOne({ where: { name } });
  }
  /**
   * Retrieves all Users.
   * @returns An array of `users` objects, or null if no users are found.
   */
  async findAllUsers(): Promise<User[] | null> {
    return await this.userRepository.find();
  }
  /**
   * Creates a new user.
   * @param signUpDto The user signup DTO data.
   * @returns The newly created user object, excluding the password.
   */
  async signUp(signUpDto: SignUpDto): Promise<User | null> {
    const { email, username } = signUpDto;
    if (await this.checkEmail(email))
      throw new BadRequestException('Email already in use');
    if (await this.checkUserName(username))
      throw new BadRequestException('username already in use');

    const hashedpassword = await bcrypt.hash(signUpDto.password, 12);

    const user = this.userRepository.create({
      ...signUpDto,
      password: hashedpassword,
    });
    await this.userRepository.insert(user);
    delete user.password;
    return user;
  }
  /**
   * Creates a new User.
   * @param roleDto The role DTO data.
   * @returns The newly created role object.
   */
  async createUser(userDto: UserDto) {
    const { username, email, password, ...userdetail } = userDto;
    const user = await this.signUp({ username, email, password });
    const user_id = user.user_id;
    const userDetail = await this.createUserDetail({
      ...userdetail,
      user_id,
    });
    // const user = await this.userRepository.create({ username, email, password });
    return userDetail;
  }
  /**
   * Creates a UserDeatail.
   * @param userDetailDto The userDetail DTO data.
   * @returns The newly created UserDetail object.
   */
  async createUserDetail(userDetailDto: UserDetailDto) {
    const userDetail = this.userDetailRepository.create({
      ...userDetailDto,
    });
    await this.userDetailRepository.insert(userDetail);
    return userDetail;
  }
  /**
   * Creates a new role.
   * @param roleDto The role data.
   * @returns The newly created role object.
   */
  async createRole(roleDto: RoleDto): Promise<UserRole | null> {
    const role = this.roleRepository.create({ ...roleDto });
    await this.roleRepository.insert(role);
    return role;
  }
  /**
   * Retrieves all roles.
   * @returns An array of `UserRole` objects, or null if no roles are found.
   */
  async findAllRoles(): Promise<UserRole[] | null> {
    return await this.roleRepository.find();
  }
}
