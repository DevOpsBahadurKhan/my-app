import { MinLength} from 'class-validator';
import { BaseUserDto } from 'src/common/dtos/base-user.dto';

export class SignupDto extends BaseUserDto {
  @MinLength(6)
  password: string;
}
