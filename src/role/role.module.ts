import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { UserRole } from './entities/user-role.entity';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { UserModule } from 'src/user/user.module'; // Import UserModule for User entity access

@Module({
  imports: [TypeOrmModule.forFeature([Role, UserRole]), UserModule], // UserModule imported
  providers: [RoleService],
  controllers: [RoleController],
  exports: [RoleService], // For other modules
})
export class RoleModule {}