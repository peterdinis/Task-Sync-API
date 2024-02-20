import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("payments")
@Controller("Payments")
export class PaymentsController {}