import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { UserRole } from './entities/user-role.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
    private userService: UserService, // Inject UserService
  ) {}

  async createRole(name: string, description?: string): Promise<Role> {
    const role = this.roleRepository.create({ name, description });
    return this.roleRepository.save(role);
  }

async assignRole(userId: number, roleId: number): Promise<UserRole> {
    const user = await this.userService.findOne(userId); // Now works
    if (!user) throw new Error('User not found');
    const role = await this.roleRepository.findOne({ where: { id: roleId } });
    if (!role) throw new Error('Role not found');
    const userRole = this.userRoleRepository.create({ user, role });
    return this.userRoleRepository.save(userRole);
  }

  async getUserRoles(userId: number): Promise<Role[]> {
    const userRoles = await this.userRoleRepository.find({
      where: { user: { id: userId } },
      relations: ['role'],
    });
    return userRoles.map((ur) => ur.role);
  }
}