import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EpicService } from './epic.service';
import { CreateEpicDto } from './dto/create-epic.dto';
import { UpdateEpicDto } from './dto/update-epic.dto';

@Controller('epic')
export class EpicController {
  constructor(private readonly epicService: EpicService) {}

  @Post()
  create(@Body() createEpicDto: CreateEpicDto) {
    return this.epicService.create(createEpicDto);
  }

  @Get()
  findAll() {
    return this.epicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.epicService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEpicDto: UpdateEpicDto) {
    return this.epicService.update(+id, updateEpicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.epicService.remove(+id);
  }
}
