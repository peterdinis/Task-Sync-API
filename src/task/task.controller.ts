import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { TaskService } from './task.service';
import {
    ApiTags,
    ApiOkResponse,
    ApiNotFoundResponse,
    ApiBadRequestResponse,
    ApiForbiddenResponse,
} from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create.task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';
import { CurrentUser } from 'src/users/decorators/user.decorator';

@ApiTags('Tasks')
@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get("/user")
    async getUserTasks(@CurrentUser("id") userId: string) {
        return this.taskService.getAllUserTasks(userId);
    }

    @Get()
    @ApiOkResponse({ description: 'List of all tasks' })
    async findAllTasks() {
        return await this.taskService.findAllTasks();
    }

    @Get(':id')
    @ApiOkResponse({ description: 'Task found by ID' })
    @ApiNotFoundResponse({ description: 'Task not found' })
    async findTaskById(@Param('id') id: string) {
        return await this.taskService.findTaskById(id);
    }

    @Post()
    @ApiOkResponse({ description: 'Task created successfully' })
    @ApiBadRequestResponse({
        description: 'Bad request - Task cannot be created',
    })
    async createTask(@Body() createTaskDto: CreateTaskDto) {
        return await this.taskService.createTask(createTaskDto);
    }

    @Patch(':id')
    @ApiOkResponse({ description: 'Task updated successfully' })
    @ApiNotFoundResponse({ description: 'Task not found' })
    @ApiForbiddenResponse({ description: 'Problem with updating task' })
    async updateTask(
        @Param('id') id: string,
        @Body() updateTaskDto: UpdateTaskDto,
    ) {
        return await this.taskService.updateTask(updateTaskDto, id);
    }

    @Delete(':id')
    @ApiOkResponse({ description: 'Task deleted successfully' })
    @ApiNotFoundResponse({ description: 'Task not found' })
    @ApiBadRequestResponse({
        description: 'Bad request - Task cannot be deleted',
    })
    async deleteTask(@Param('id') id: string) {
        return await this.taskService.deleteTask(id);
    }
}
