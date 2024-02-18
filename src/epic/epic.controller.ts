import { Controller} from '@nestjs/common';
import { EpicService } from './epic.service';

@Controller('epic')
export class EpicController {
  constructor(private readonly epicService: EpicService) {}

}
