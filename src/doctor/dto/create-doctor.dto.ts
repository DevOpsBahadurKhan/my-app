import { IsNotEmpty } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateDoctorDto {
    @PrimaryGeneratedColumn()
    id: number;
    
    @IsNotEmpty()
    doctorname: string;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    exp: string;
}
