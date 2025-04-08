import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { User } from 'src/user/entities/user.entity';
import { Slot } from 'src/slot/entities/slot.entity';
import { AppointmentStatus } from 'src/common/enums/appointment-status';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,

    @InjectRepository(Slot)
    private slotRepository: Repository<Slot>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(dto: CreateAppointmentDto) {
    const slot = await this.slotRepository.findOne({ where: { id: dto.slotId } });
    if (!slot) throw new NotFoundException('Slot not found');

    const patient = await this.userRepository.findOne({ where: { id: dto.patientId } });
    if (!patient) throw new NotFoundException('Patient not found');

    const doctor = await this.userRepository.findOne({ where: { id: dto.doctorId } });
    if (!doctor) throw new NotFoundException('Doctor not found');

    const appointment = this.appointmentRepository.create({
      slot: { id: slot.id },      // Use DeepPartial, not full entity
      doctor: { id: doctor.id },
      patient: { id: patient.id },
      reason: dto.reason,
      status: AppointmentStatus.PENDING,
    });

    return await this.appointmentRepository.save(appointment);
  }


  async findAll() {
    return await this.appointmentRepository.find({
      relations: ['doctor', 'patient', 'slot'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    const appt = await this.appointmentRepository.findOne({
      where: { id },
      relations: ['doctor', 'patient', 'slot'],
    });

    if (!appt) throw new NotFoundException('Appointment not found');
    return appt;
  }

  async update(id: number, dto: UpdateAppointmentDto) {
    const appt = await this.findOne(id);
    Object.assign(appt, dto);
    return await this.appointmentRepository.save(appt);
  }

  async remove(id: number) {
    const appt = await this.findOne(id);
    return await this.appointmentRepository.remove(appt);
  }
}
