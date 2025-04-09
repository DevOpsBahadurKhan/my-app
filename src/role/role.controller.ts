import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/common/enums/role.enum';


@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN) // Assuming you have a UserRole enum or similar
    @Post()
    async create(@Body() body: { name: string; description?: string }) {
        return this.roleService.createRole(body.name, body.description);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN, Role.SUPER_ADMIN) // Assuming you have a UserRole enum or similar
    @Post('assign')
    async assignRole(@Body() body: { userId: number; roleId: number }) {
        return this.roleService.assignRole(body.userId, body.roleId);
    }

    @Get('user/:userId')
    async getUserRoles(@Param('userId') userId: string) {
        return this.roleService.getUserRoles(+userId);
    }
}