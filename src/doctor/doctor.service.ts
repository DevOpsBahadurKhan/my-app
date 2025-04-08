import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/common/enums/role.enum';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) { }

  // Create Doctor
  async create(createDoctorDto: CreateDoctorDto) {
    const doctor = this.userRepo.create({
      ...createDoctorDto,
      role: Role.ADMIN, // or Role.DOCTOR
    });
    return await this.userRepo.save(doctor);
  }

  // Get All Doctors
  findAll() {
    return this.userRepo.find({
      where: { role: Role.ADMIN }, // or Role.DOCTOR
    });
  }

  // Get Single Doctor
  async findOne(id: number) {
    const doctor = await this.userRepo.findOne({
      where: { id, role: Role.ADMIN }, // Role check is important
    });

    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }

    return doctor;
  }

  // Update Doctor
  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    const result = await this.userRepo.update(
      { id, role: Role.ADMIN },
      updateDoctorDto,
    );

    if (result.affected === 0) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }

    return { message: 'Doctor updated successfully' };
  }

  // Delete Doctor
  async remove(id: number) {
    const result = await this.userRepo.delete({ id, role: Role.ADMIN });

    if (result.affected === 0) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }

    return { message: 'Doctor deleted successfully' };
  }
}
