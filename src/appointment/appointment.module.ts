import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Slot } from 'src/slot/entities/slot.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Slot, User])],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
