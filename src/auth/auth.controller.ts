import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

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
    @Post("/login")
    async loginUser(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }
}
