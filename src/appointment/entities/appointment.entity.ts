import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Slot } from 'src/slot/entities/slot.entity';
import { AppointmentStatus } from 'src/common/enums/appointment-status';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { nullable: true, eager: true }) // Nullable for guest patients
  @JoinColumn({ name: 'patientId' })
  patient: User;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'doctorId' })
  doctor: User;

  @ManyToOne(() => Slot, { eager: true })
  @JoinColumn({ name: 'slotId' })
  slot: Slot;

  @Column({ nullable: true }) // For guest patients
  guestName: string;

  @Column({ nullable: true }) // For guest patients
  guestPhone: string;

  @ManyToOne(() => User, { nullable: true, eager: true }) // Admin/Staff who booked it
  @JoinColumn({ name: 'bookedById' })
  bookedBy: User;

  @Column({ type: 'enum', enum: AppointmentStatus, default: AppointmentStatus.PENDING })
  status: AppointmentStatus;

  @Column({ type: 'text', nullable: true })
  reason: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}