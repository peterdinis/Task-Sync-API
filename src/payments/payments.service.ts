import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { MODULE_OPTIONS_TOKEN } from './config.module.builder';
import { StripeModuleOptions } from './options/payments-module-options';

@Injectable()
export class PaymentsService {
  public readonly stripe: Stripe;
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: StripeModuleOptions,
  ) {
    this.stripe = new Stripe(this.options.apiKey, this.options.options);
  }
}