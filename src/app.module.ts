import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { DoctorModule } from './doctor/doctor.module';
import { AppointmentModule } from './appointment/appointment.module';
import { SlotModule } from './slot/slot.module';
import dataSource from './data-source';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSource.options,
      autoLoadEntities: true 
    }),
    AuthModule,
    DoctorModule,
    AppointmentModule,
    SlotModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
