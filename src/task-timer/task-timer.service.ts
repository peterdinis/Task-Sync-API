import { Injectable } from '@nestjs/common';
import { CreateTaskTimerDto } from './dto/create-task-timer.dto';
import { UpdateTaskTimerDto } from './dto/update-task-timer.dto';

@Injectable()
export class TaskTimerService {
    create(createTaskTimerDto: CreateTaskTimerDto) {
        return 'This action adds a new taskTimer';
    }

    findAll() {
        return `This action returns all taskTimer`;
    }

    findOne(id: number) {
        return `This action returns a #${id} taskTimer`;
    }

    update(id: number, updateTaskTimerDto: UpdateTaskTimerDto) {
        return `This action updates a #${id} taskTimer`;
    }

    remove(id: number) {
        return `This action removes a #${id} taskTimer`;
    }
}
