import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentsService } from './payments.service';
import { ConfigurableModuleClass } from './config.module.builder';


@Module({
  providers: [PaymentsService],
  exports: [PaymentsService],
  imports: [ConfigModule],
})
export class StripeModule extends ConfigurableModuleClass {}