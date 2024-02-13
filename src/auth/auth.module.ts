import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [PrismaModule, UsersModule],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
