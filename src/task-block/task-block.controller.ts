import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { TaskBlockService } from './task-block.service';
import { CreateTaskBlockDto } from './dto/create-task-block.dto';
import { UpdateTaskBlockDto } from './dto/update-task-block.dto';

@Controller('task-block')
export class TaskBlockController {
    constructor(private readonly taskBlockService: TaskBlockService) {}

    @Post()
    create(@Body() createTaskBlockDto: CreateTaskBlockDto) {
        return this.taskBlockService.create(createTaskBlockDto);
    }

    @Get()
    findAll() {
        return this.taskBlockService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.taskBlockService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateTaskBlockDto: UpdateTaskBlockDto,
    ) {
        return this.taskBlockService.update(+id, updateTaskBlockDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.taskBlockService.remove(+id);
    }
}
