import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import {verify} from "argon2"

@Injectable()
export class AuthService {
    constructor(
        private jwt: JwtService,
        private userService: UsersService
    ) {}

    async register(registerDto: RegisterDto) {
        const checkIfUserExists = await this.userService.findOneByEmail(registerDto.email);
        if(checkIfUserExists) throw new BadRequestException("User already exists");

        const {password, ...user} = await this.userService.createUser(registerDto);

        const tokens = this.issueTokens(user.id);
        return {
            user,
            ...tokens
        }
    }

    async login(loginDto: LoginDto) {
        const {password, ...user} = await this.validateUser(loginDto);
        const tokens = this.issueTokens(user.id);
        return {
            user,
            ...tokens
        }
    }

    private issueTokens(userId: string) {
        const data = {id: userId};
        const accessToken = this.jwt.sign(data, {
            expiresIn: "1h",
        })

        const refreshToken = this.jwt.sign(data, {
            expiresIn: "7d",
        });

        return {
            accessToken,
            refreshToken
        }
    }

    private async validateUser(dto: RegisterDto) {
        const user = await this.userService.findOneByEmail(dto.email);
        const isValid = await verify(user.password, dto.password);

        if(!isValid) throw new UnauthorizedException("Invalid password");

        return user;
    }
}
