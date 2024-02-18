import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ProjectService } from 'src/project/project.service';

@Injectable()
export class EpicService {
  constructor(private readonly prismaService: PrismaService, private readonly projectsService: ProjectService) {}

  
}
