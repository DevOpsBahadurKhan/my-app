import { Controller, Post, Body, Get, UseGuards, Request, ValidationPipe, UsePipes, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from 'src/common/enums/role.enum';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AssignRoleDto } from './dto/assign-role.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  getProfile(@Request() req) {
    return req.user; // Return the user object from the request
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  getAdminDashboard(@Request() req) {
    return { message: 'Welcome to the admin dashboard', user: req.user }; // Return a message and user object
  }

  @Post('assign-role')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  assignRole(@Body() assignRoleDto: AssignRoleDto, @Request() req) {
    return this.authService.assignRole(assignRoleDto, req.user); // Pass the DTO object
  }

}
