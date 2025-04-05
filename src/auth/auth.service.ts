import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AssignRoleDto } from './dto/assign-role.dto';
import { Role } from 'src/common/enums/role.enum';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async signup(signupDto: SignupDto) {
        const hashedPassword = await bcrypt.hash(signupDto.password, 10);
        const user = this.userRepository.create({
            username: signupDto.username,
            email: signupDto.email,
            password: hashedPassword,
            role: Role.USER, // Default role for new users
        });
        await this.userRepository.save(user);
        return { message: 'User registered successfully', user };
    }

    async login(loginDto: LoginDto) {
        const user = await this.userRepository.findOne({ where: { email: loginDto.email } });
        if (!user) return { message: 'Invalid credentials' };

        const isMatch = await bcrypt.compare(loginDto.password, user.password);
        if (!isMatch) return { message: 'Invalid credentials' };

        const payload = { username: user.username, sub: user.id, role: user.role };
        return { user, access_token: this.jwtService.sign(payload) };
    }

    async assignRole(assignRoleDto:AssignRoleDto, requestingUser: any) {
        if (requestingUser.role !== Role.ADMIN) {
            throw new ForbiddenException('Only admins can assign roles');
        }
        const user = await this.userRepository.findOne({ where: { id: assignRoleDto.userId } });
        if (!user) throw new NotFoundException('User not found');
        user.role = assignRoleDto.role;
        await this.userRepository.save(user);
        return { message: 'Role updated successfully' };
    }
}
