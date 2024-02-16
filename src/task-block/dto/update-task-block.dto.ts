import { PartialType } from '@nestjs/swagger';
import { CreateTaskBlockDto } from './create-task-block.dto';

export class UpdateTaskBlockDto extends PartialType(CreateTaskBlockDto) {}
