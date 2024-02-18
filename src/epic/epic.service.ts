import { Injectable } from '@nestjs/common';
import { CreateEpicDto } from './dto/create-epic.dto';
import { UpdateEpicDto } from './dto/update-epic.dto';

@Injectable()
export class EpicService {
  create(createEpicDto: CreateEpicDto) {
    return 'This action adds a new epic';
  }

  findAll() {
    return `This action returns all epic`;
  }

  findOne(id: number) {
    return `This action returns a #${id} epic`;
  }

  update(id: number, updateEpicDto: UpdateEpicDto) {
    return `This action updates a #${id} epic`;
  }

  remove(id: number) {
    return `This action removes a #${id} epic`;
  }
}
