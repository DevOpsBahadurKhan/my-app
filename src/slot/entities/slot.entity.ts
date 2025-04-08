import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { SlotStatus } from 'src/common/enums/slot-status.enum';

@Entity()
export class Slot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @Column({
    type: 'enum',
    enum: SlotStatus,
    default: SlotStatus.AVAILABLE,
  })
  status: SlotStatus;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })  // Optional: Delete slots if doctor deleted
  @JoinColumn({ name: 'doctorId' }) // This line is important
  doctor: User;
}
