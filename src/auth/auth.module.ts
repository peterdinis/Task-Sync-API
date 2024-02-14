import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt.guard';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET as unknown as string,
            signOptions: { expiresIn: '60s' },
        }),
        PrismaModule,
        UsersModule,
    ],
    providers: [AuthService, JwtAuthGuard],
    controllers: [AuthController],
})
export class AuthModule {}
