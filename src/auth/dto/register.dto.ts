import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';

export class RegisterDto {
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
