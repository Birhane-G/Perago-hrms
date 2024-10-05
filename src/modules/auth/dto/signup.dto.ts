import { IsEmail, IsString, IsNumber } from 'class-validator';

export class SignUpDto {
  @IsString()
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsNumber()
  role_id: number;
}
