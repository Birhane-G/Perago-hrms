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

  @IsString()
  @IsNotEmpty()
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

  @IsNumber()
  userRoleRoleId: number;
}
