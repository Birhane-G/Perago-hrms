import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignUpDto } from '../dto/signup.dto';
import { LoginDto } from '../dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}
  /**
   *  Handles user signup requests.
   *  @param signUpDto The user signup data.
   *  @returns The response from the authentication service.
   */
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signup(@Body() signUpDto: SignUpDto) {
    return await this.AuthService.register(signUpDto);
  }

  /**
   * Handles user login requests.
   * @param loginDto The user login DTO data.
   * @returns The response from the authentication service.
   */
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.AuthService.login(loginDto);
  }
}
