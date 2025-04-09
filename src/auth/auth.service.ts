import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
        const existingUser = await this.userRepository.findOne({ where: { email: signupDto.email } });
        if (existingUser) {
            throw new ForbiddenException('Email already exists');
        }

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
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(loginDto.password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { username: user.username, sub: user.id, role: user.role };
        return { user, access_token: this.jwtService.sign(payload) };
    }

    async assignRole(assignRoleDto: AssignRoleDto, requestingUser: any) {
        if (requestingUser.role !== Role.ADMIN) {
            throw new ForbiddenException('Only admins can assign roles');
        }
        const user = await this.userRepository.findOne({ where: { id: assignRoleDto.userId } });
        if (!user) throw new NotFoundException('User not found');
        user.role = assignRoleDto.role;
        await this.userRepository.save(user);
        return { message: 'Role updated successfully' };
    }



    // Google Login handler method
    async googleLogin(req: any) {
        if (!req.user) {
            return 'No user from Google';
        }

        let user = await this.userRepository.findOne({ where: { email: req.user.email } });

        if (!user) {
            // Create user if doesn't exist
            user = this.userRepository.create({
                email: req.user.email,
                username: req.user.name,
                password: '', // no password from Google
                role: Role.USER,
            });
            await this.userRepository.save(user);
        }

        const payload = {
            email: user.email,
            sub: user.id,
            role: user.role,
        };

        return {
            message: 'Google login success',
            user,
            access_token: this.jwtService.sign(payload),
        };
    }


}
