import { Doctor } from './entities/doctor.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorService {

  constructor(
    @InjectRepository(Doctor)
    private doctorRepo: Repository<Doctor>,
  ) { }

  // Create a new doctor
  create(createDoctorDto: CreateDoctorDto) {
    return this.doctorRepo.save(createDoctorDto);
  }

  // Fetch all doctors (no DTO needed)
  findAll() {
    return this.doctorRepo.find();
  }

  async findOne(id: number) {
    const doctor = await this.doctorRepo.findOne({ where: { id } });
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }
    return doctor;
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    const result = await this.doctorRepo.update(id, updateDoctorDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }

    return {
      message: 'Doctor updated successfully',
      result,
    };
  }

  async remove(id: number) {
    const result = await this.doctorRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }

    return { message: 'Doctor deleted successfully' };
  }

}
