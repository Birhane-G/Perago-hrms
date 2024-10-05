import { IsEmail, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
