import { IsNotEmpty } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateDoctorDto {
    @PrimaryGeneratedColumn()
    id: number;
    
    @IsNotEmpty()
    title: string; 

    @IsNotEmpty()
    doctorname: string;

    @IsNotEmpty()
    specialization : string;

    @IsNotEmpty()
    exp: string;
}
