import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
   constructor(private readonly prismaService: PrismaService) {}

   async findOne(id: string) {
     const findOneUser = await this.prismaService.user.findUnique({
      where: {
        id
      },
      include: {
        Task: true
      }
     })

     
   }
}
