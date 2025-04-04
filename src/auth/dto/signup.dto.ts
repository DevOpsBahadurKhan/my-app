import { IsEmail, IsNotEmpty, MinLength,IsEnum } from 'class-validator';
import { Role } from '../enums/role.enum';

export class SignupDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsEnum(Role)
  role: Role;
}
