import { IsNotEmpty, IsOptional, IsEmpty } from 'class-validator';

export class CreateDoctorDto {

    @IsEmpty({ message: 'id should not exist' })  // Important for safety
    id?: number;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    doctorname: string;

    @IsNotEmpty()
    specialization: string;

    @IsNotEmpty()
    exp: string;
}
