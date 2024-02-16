import { Test, TestingModule } from '@nestjs/testing';
import { TaskTimerController } from '../task-timer.controller';
import { TaskTimerService } from '../task-timer.service';

describe('TaskTimerController', () => {
    let controller: TaskTimerController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TaskTimerController],
            providers: [TaskTimerService],
        }).compile();

        controller = module.get<TaskTimerController>(TaskTimerController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
