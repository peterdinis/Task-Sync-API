import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskTimerService } from './task-timer.service';
import { CreateTaskTimerDto } from './dto/create-task-timer.dto';
import { UpdateTaskTimerDto } from './dto/update-task-timer.dto';

@Controller('task-timer')
export class TaskTimerController {
  constructor(private readonly taskTimerService: TaskTimerService) {}

  @Post()
  create(@Body() createTaskTimerDto: CreateTaskTimerDto) {
    return this.taskTimerService.create(createTaskTimerDto);
  }

  @Get()
  findAll() {
    return this.taskTimerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskTimerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskTimerDto: UpdateTaskTimerDto) {
    return this.taskTimerService.update(+id, updateTaskTimerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskTimerService.remove(+id);
  }
}
