import { IsString, IsEnum, IsNotEmpty } from 'class-validator';

export class RoleDto {
  @IsString()
  @IsEnum(['admin', 'employee'], { message: 'invalid role' })
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
