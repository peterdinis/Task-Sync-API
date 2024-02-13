import { Injectable, NotFoundException } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {}

    async findOne(id: string) {
        const findOneUser = await this.prismaService.user.findUnique({
            where: {
                id,
            },
            include: {
                Task: true,
            },
        });

        if (!findOneUser) {
            throw new NotFoundException('User Not found');
        }

        return findOneUser;
    }

    async findOneByEmail(email: string) {
        const findUserByEmail = await this.prismaService.user.findFirst({
            where: {
                email,
            },
            include: {
                Task: true,
            },
        });

        if (!findUserByEmail) {
            throw new NotFoundException('Requested user with this email does not exists');
        }

        return findUserByEmail;
    }
}
