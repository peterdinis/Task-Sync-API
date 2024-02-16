import { Test, TestingModule } from '@nestjs/testing';
import { TaskBlockService } from './task-block.service';

describe('TaskBlockService', () => {
  let service: TaskBlockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskBlockService],
    }).compile();

    service = module.get<TaskBlockService>(TaskBlockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
