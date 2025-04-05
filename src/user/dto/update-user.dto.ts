// src/user/dto/update-user.dto.ts
import { IsOptional, IsString, IsEnum } from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEnum(Role)
    role?: Role;
}
