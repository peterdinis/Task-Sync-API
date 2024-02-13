import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        private jwt: JwtService,
        private userService: UsersService
    ) {}

    async login(loginDto: LoginDto) {}

    async register(registerDto: RegisterDto) {
        
    }
}
