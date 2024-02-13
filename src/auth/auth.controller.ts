import {
    Body,
    Controller,
    Post,
    Req,
    Res,
    UnauthorizedException,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({
        summary: 'Login user',
    })
    @ApiCreatedResponse({
        status: 201,
        type: LoginDto
    })
    @UsePipes(new ValidationPipe())
    @Post('/login')
    async loginUser(
        @Body() loginDto: LoginDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const { refreshToken, ...response } =
            await this.authService.login(loginDto);
        this.authService.refreshTokenAddToResponse(res, refreshToken);
        return response;
    }

    @ApiOperation({
        summary: 'Register user',
    })
    @ApiCreatedResponse({
        status: 201,
        type: RegisterDto
    })
    @UsePipes(new ValidationPipe())
    @Post('/register')
    async registerUser(
        @Body() registerDto: RegisterDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const { refreshToken, ...response } =
            await this.authService.register(registerDto);
        this.authService.refreshTokenAddToResponse(res, refreshToken);
        return response;
    }

    @ApiOperation({
        summary: "New access token"
    })
    @ApiOkResponse({
        status: 200
    })
    @Post("/access-token/new")
    async getNewAccessToken(@Req() req: Request, @Res({passthrough: true}) res: Response) {
        const refreshTokenFromCookies = req.cookies[process.env.REFRESH_TOKEN_NAME];
        if(!refreshTokenFromCookies) {
            this.authService.refreshTokenRemoveToResponse(res);
            throw new UnauthorizedException("Refresh token not passed");
        }

        const {refreshToken, ...response} = await this.authService.getNewToken(refreshTokenFromCookies);
        this.authService.refreshTokenAddToResponse(res, refreshToken);
        return response;
    }

    @ApiOperation({
        summary: "Logout user"
    })
    @ApiOkResponse({
        status: 200
    })
    @Post("/logout")
    async logoutUser(@Res({passthrough: true}) res: Response) {
        this.authService.refreshTokenRemoveToResponse(res);
        return true;
    }
}
