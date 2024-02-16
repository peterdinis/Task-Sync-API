import { PartialType } from '@nestjs/swagger';
import { CreateTaskTimerDto } from './create-task-timer.dto';

export class UpdateTaskTimerDto extends PartialType(CreateTaskTimerDto) {}
