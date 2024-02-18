import { Module } from '@nestjs/common';
import { EpicService } from './epic.service';
import { EpicController } from './epic.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [PrismaModule, ProjectModule],
  controllers: [EpicController],
  providers: [EpicService],
})
export class EpicModule {}
