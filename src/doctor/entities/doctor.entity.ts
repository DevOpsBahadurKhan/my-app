import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
// import { Appointment } from '../appointments/appointment.entity'; // Agar appointment relation chahiye

@Entity() // Yeh batata hai ki yeh ek DB table hai
export class Doctor {
  @PrimaryGeneratedColumn() // Auto-increment ID
  id: number;

  @Column() // Database column banega
  doctorname: string;

  @Column()
  title: string;

  @Column()
  exp: string;

  // Optional: Agar appointments ke saath relation chahiye
//   @OneToMany(() => Appointment, (appointment) => appointment.doctor)
//   appointments: Appointment[];
}