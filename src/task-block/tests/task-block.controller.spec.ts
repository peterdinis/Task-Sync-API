import { Test, TestingModule } from '@nestjs/testing';
import { TaskBlockController } from '../task-block.controller';
import { TaskBlockService } from '../task-block.service';

describe('TaskBlockController', () => {
    let controller: TaskBlockController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TaskBlockController],
            providers: [TaskBlockService],
        }).compile();

        controller = module.get<TaskBlockController>(TaskBlockController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
