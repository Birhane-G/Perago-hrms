import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignUpDto } from '../dto/signup.dto';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { LocalAuthGuard } from 'src/config/guard/local-auth.gurad';
import { JwtAuthGuard } from 'src/config/guard/jwt.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtServices: JwtService,
  ) {}
  /**
   *  Handles user signup requests.
   *  @param signUpDto The user signup data.
   *  @returns The response from the authentication service.
   */
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signup(@Body() signUpDto: SignUpDto) {
    return await this.authService.register(signUpDto);
  }
  /**
   * Handles user login requests.
   * @param loginDto The user login DTO data.
   * @returns The response from the authentication service.
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    const payload = {
      email: request.user.email,
      sub: request.user.id,
    };
    const token = this.jwtServices.sign(payload);
    // const access_token = this.authService.generatJwtToken(request.user);
    response.cookie('jwt', token, { httpOnly: true });
    return {
      message: 'Successfully logged in',
    };
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async user(@Request() request) {
    return request.user;
  }
}
