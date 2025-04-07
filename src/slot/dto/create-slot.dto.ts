import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { SlotStatus } from 'src/common/enums/slot-status.enum';

export class CreateSlotDto {
  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  startTime: string;

  @IsNotEmpty()
  @IsString()
  endTime: string;

  @IsEnum(SlotStatus)
  status: SlotStatus;

  @IsNotEmpty()
  @IsNumber()
  doctor: number;  // userId as doctor id
}
