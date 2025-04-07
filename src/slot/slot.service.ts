import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSlotDto } from './dto/create-slot.dto';
import { Slot } from './entities/slot.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { SlotStatus } from 'src/common/enums/slot-status.enum';
import { User } from 'src/user/entities/user.entity';


@Injectable()
export class SlotService {

  constructor(
    @InjectRepository(Slot)
    private slotRepo: Repository<Slot>,
  
    @InjectRepository(User)
    private userRepo: Repository<User>,  // yeh correct hai
  ) { }
  



  async create(createSlotDto: CreateSlotDto, doctorId: number) {
    const doctor = await this.userRepo.findOne({ where: { id: doctorId } });
  
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
  
    // Check for Time Conflict
    const existingSlot = await this.slotRepo.findOne({
      where: {
        doctor: { id: doctorId },
        date: createSlotDto.date,
        startTime: LessThanOrEqual(createSlotDto.endTime),
        endTime: MoreThanOrEqual(createSlotDto.startTime),
      },
    });
  
    if (existingSlot) {
      throw new BadRequestException('Slot is already booked for this time');
    }
  
    const slot = this.slotRepo.create({
      date: createSlotDto.date,
      startTime: createSlotDto.startTime,
      endTime: createSlotDto.endTime,
      status: createSlotDto.status || SlotStatus.AVAILABLE,
      doctor,
    });
  
    return await this.slotRepo.save(slot);
  }
  

}
