// src/auth/dto/assign-role.dto.ts
import { IsNumber, IsEnum } from 'class-validator';
import { Role } from '../enums/role.enum';

export class AssignRoleDto {
  @IsNumber()
  userId: number;

  @IsEnum(Role)
  role: Role;
}