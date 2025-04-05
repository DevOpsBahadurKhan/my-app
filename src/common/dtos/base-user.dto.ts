// src/common/dto/base-user.dto.ts
import { IsEmail, IsString, MinLength } from 'class-validator';

export class BaseUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;
}
