import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { SignUpDto } from '../dto/signup.dto';
import { UserService } from 'src/modules/user/services/user.service';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userService: UserService,
    private jwtServices: JwtService,
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
   *  @returns A string containing the JWT token.
   *  @throws UnauthorizedException If email or password is invalid.
   *
   */
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userService.checkEmail(email);
    if (!user) throw new UnauthorizedException('invalid credentials');
    const checkpassword = await bcrypt.compare(password, user.password);
    if (!checkpassword) {
      throw new UnauthorizedException('invalid credentials');
    }
    const payload = { sub: user.user_id };
    const jwt = await this.jwtServices.signAsync(payload);
    // response.cookie('jwt', jwt, { httpOnly: true });

    return jwt;
    // return {
    //   message: 'Successfully logged in',
    // };
  }
}
