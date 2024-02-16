import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from 'src/task/task.module';
import { TaskBlockModule } from 'src/task-block/task-block.module';

@Module({
    imports: [
        PrismaModule,
        AuthModule,
        UsersModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TaskModule,
        TaskBlockModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
