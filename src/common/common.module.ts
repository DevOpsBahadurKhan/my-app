// src/common/common.module.ts
import { Module } from '@nestjs/common';
import { RolesGuard } from './guards/roles.guard';

@Module({
  providers: [RolesGuard], // We'll add services here later
  exports: [RolesGuard],   // We'll export them for other modules
})
export class CommonModule {}