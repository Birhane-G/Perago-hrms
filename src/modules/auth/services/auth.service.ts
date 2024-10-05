import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { SignUpDto } from '../dto/signup.dto';
import { UserService } from 'src/modules/user/services/user.service';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  /**
   * Registers a new user.
   * @param signUpDto The user signup data.
   * @returns The newly created user object.
   * @throws BadRequestException If email or username is already in use.
   *
   */
  async register(signUpDto: SignUpDto): Promise<User> {
    return await this.userService.signUp(signUpDto);
  }

  /**
   * Logs in a user and returns a JWT token.
   * @param loginDto The user login data.
   * @returns A string containing the JWT token.
   * @throws UnauthorizedException If email or password is invalid.
   *
   */
  async login(loginDto: LoginDto): Promise<User | null> {
    const user = await this.userService.checkEmail(loginDto.email);
    if (!user)
      throw new UnauthorizedException(
        'invalid credentials/This Email is not registered',
      );
    if (!(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('invalid credentials');
    }
    return user;
  }

  async generatJwtToken(user: User): Promise<string> {
    const token = this.jwtService.sign({
      name: user.username,
      sub: user.user_id,
    });
    return token;
  }
}
