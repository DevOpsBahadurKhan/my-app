import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from 'src/common/enums/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @Column({ nullable: true })
  specialization: string;

  @Column({ nullable: true })
  exp: string;

}

  // Optional: Agar appointments ke saath relation chahiye
  //   @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  //   appointments: Appointment[];

