import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';
import { TaskTimerDto } from 'src/users/dto/user.dto';

export class RegisterDto extends TaskTimerDto {
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
