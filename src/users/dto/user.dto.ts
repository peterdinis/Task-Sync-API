import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { RegisterDto } from 'src/auth/dto/register.dto';

export class TaskTimerDto {
    @IsOptional()
    @IsNumber()
    @Min(1)
    workInterval?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    breakInterval?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(20)
    intervalsCount?: number;
}


export class UserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsOptional()
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4, {
        message: 'Password must have more than 4 letters',
    })
    password: string;
}