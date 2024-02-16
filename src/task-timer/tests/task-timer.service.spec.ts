import { Test, TestingModule } from '@nestjs/testing';
import { TaskTimerService } from '../task-timer.service';

describe('TaskTimerService', () => {
  let service: TaskTimerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskTimerService],
    }).compile();

    service = module.get<TaskTimerService>(TaskTimerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
