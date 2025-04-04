import { Injectable } from '@nestjs/common';
import { CreateSlotDto } from './dto/create-slot.dto';
import { UpdateSlotDto } from './dto/update-slot.dto';
import { Slot } from './entities/slot.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

@Injectable()
export class SlotService {

  constructor(
     @InjectRepository(Slot)
     private slotRepository: Repository<Slot>,
   ) { }
  
   async create(createSlotDto: CreateSlotDto) {
    const { doctorId, startTime, endTime, autoGenerate, customSlots } = createSlotDto;
  
    const slotsToCreate: Slot[] = [];
  
    // ✅ Auto 15-min slot generation
    if (autoGenerate && startTime && endTime) {
      let current = new Date(startTime);
      while (current < new Date(endTime)) {
        const slotStart = new Date(current);
        const slotEnd = new Date(current.getTime() + 15 * 60 * 1000);
        if (slotEnd > new Date(endTime)) break;
  
        slotsToCreate.push(
          this.slotRepository.create({
            doctorId,
            startTime: slotStart,
            endTime: slotEnd,
            isAvailable: true,
          }),
        );
  
        current = slotEnd;
      }
    }
  
    // ✅ Manual slots
    if (!autoGenerate && customSlots && customSlots.length > 0) {
      for (const s of customSlots) {
        const slot = this.slotRepository.create({
          doctorId,
          startTime: new Date(s.startTime),
          endTime: new Date(s.endTime),
          isAvailable: true,
        });
        slotsToCreate.push(slot);
      }
    }
  
    return this.slotRepository.save(slotsToCreate);
  }
  
  

  findAll() {
    return this.slotRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} slot`;
  }

  update(id: number, updateSlotDto: UpdateSlotDto) {
    return `This action updates a #${id} slot`;
  }

  remove(id: number) {
    return `This action removes a #${id} slot`;
  }
}
