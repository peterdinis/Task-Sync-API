import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentsService } from './payments.service';
import { ConfigurableModuleClass } from './config.module.builder';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PaymentsController } from './payments.controller';

@Module({
    controllers: [PaymentsController],
    providers: [PaymentsService],
    exports: [PaymentsService],
    imports: [ConfigModule, PrismaModule],
})
export class StripeModule extends ConfigurableModuleClass {}
