import { IsString, IsNotEmpty, IsEmail, IsNumber } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  phonenumber: number;

  @IsNotEmpty()
  hiredate: Date;

  @IsNotEmpty()
  terminationdate: Date;

  @IsNotEmpty()
  @IsNumber()
  role_id: number;
}
