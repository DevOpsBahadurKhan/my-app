import { IsEnum, MinLength } from "class-validator";
import { BaseUserDto } from "src/common/dtos/base-user.dto";
import { Role } from "src/common/enums/role.enum";

export class CreateUserDto extends BaseUserDto {
    @MinLength(6)
    password: string;
  
    @IsEnum(Role)
    role: Role;
}
