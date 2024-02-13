import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({
        summary: "Login user"
    })
    @ApiCreatedResponse({
        status: 201
    })
    @UsePipes(new ValidationPipe())
    @Post("/login")
    async loginUser(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @ApiOperation({
        summary: "Register user"
    })
    @ApiCreatedResponse({
        status: 201
    })
    @UsePipes(new ValidationPipe())
    @Post("/register")
    async registerUser(@Body() registerDto: RegisterDto) {
        return this.authService.login(registerDto);
    }

    
}
