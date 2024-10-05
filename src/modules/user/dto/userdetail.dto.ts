import { IsString, IsNotEmpty } from 'class-validator';

export class UserDetailDto {
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
}
