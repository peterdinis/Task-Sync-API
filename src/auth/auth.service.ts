import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { verify } from 'argon2';
import { Response } from 'express';
import { UpdateUserDto } from './dto/update.dto';

@Injectable()
export class AuthService {
    constructor(
        private jwt: JwtService,
        private userService: UsersService,
    ) {}

    async register(registerDto: RegisterDto) {
        const checkIfUserExists = await this.userService.findOneByEmail(
            registerDto.email,
        );
        if (checkIfUserExists)
            throw new BadRequestException('User already exists');

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...user } =
            await this.userService.createUser(registerDto);

        const tokens = this.issueTokens(user.id);
        return {
            user,
            ...tokens,
        };
    }

    async getNewTokens(refreshToken: string) {
        const result = await this.jwt.verifyAsync(refreshToken);
        if (!result) throw new UnauthorizedException('Invalid refresh token');

        const { password, ...user } = await this.userService.findOne(result.id);

        const tokens = this.issueTokens(user.id);

        return {
            user,
            ...tokens,
        };
    }

    async login(loginDto: LoginDto) {
        const { password, ...user } = await this.validateUser(loginDto);
        const tokens = this.issueTokens(user.id);
        return {
            user,
            ...tokens,
        };
    }

    private issueTokens(userId: string) {
        const data = { id: userId };
        const accessToken = this.jwt.sign(data, {
            expiresIn: '1h',
        });

        const refreshToken = this.jwt.sign(data, {
            expiresIn: '7d',
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    private async validateUser(dto: RegisterDto) {
        const user = await this.userService.findOneByEmail(dto.email);
        const isValid = await verify(user.password, dto.password);

        if (!isValid) throw new UnauthorizedException('Invalid password');

        return user;
    }

    refreshTokenAddToResponse(res: Response, refreshToken: string) {
        const expiresIn = new Date();
        expiresIn.setDate(
            (expiresIn.getDate() +
                process.env.EXPIRE_DAY_REFRESH_TOKEN) as unknown as number,
        );

        res.cookie(
            process.env.REFRESH_TOKEN_NAME as unknown as string,
            refreshToken,
            {
                httpOnly: true,
                expires: expiresIn,
                secure: false, // true in production
                domain: 'localhost',
                sameSite: 'none',
            },
        );
    }

    refreshTokenRemoveToResponse(res: Response) {
        const expiresIn = new Date();
        expiresIn.setDate(
            (expiresIn.getDate() +
                process.env.EXPIRE_DAY_REFRESH_TOKEN) as unknown as number,
        );

        res.cookie(process.env.REFRESH_TOKEN_NAME as unknown as string, '', {
            httpOnly: true,
            expires: new Date(0),
            secure: false, // true in production
            domain: 'localhost',
            sameSite: 'none',
        });
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto) {
        const findOneUser = this.userService.findOne(id);
        const updateOneUser = this.userService.updateUser(id, updateUserDto);
        return updateOneUser;
    }
}
