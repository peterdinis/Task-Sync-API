import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2';
import { startOfDay, subDays } from './utils/dateFunctions';

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {}

    async createUser(registerDto: RegisterDto) {
        const newUser = await this.prismaService.user.create({
            data: {
                ...registerDto,
                password: hash(registerDto.password) as unknown as string
            },
        });

        if (!newUser) {
            throw new BadRequestException('Failed to create user');
        }

        return newUser;
    }

    async updateUser(id: string, userDto: RegisterDto) {
        const findOneUser = await this.findOne(id);

        const updateUser = await this.prismaService.user.update({
            where: {
                id: findOneUser.id
            },

            data: {
                ...userDto
            }
        });

        if(!updateUser) {
            throw new BadRequestException("Something went wrong doing update");
        }

        return updateUser;
    }

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
            throw new NotFoundException(
                'Requested user with this email does not exists',
            );
        }

        return findUserByEmail;
    }

    async getProfile(id: string) {
        const userProfile = await this.findOne(id);
        const totalTaks = userProfile.Task.length;
        const completedTasks = await this.prismaService.task.count({
            where: {
                userId: id,
                isCompleted: true
            }
        });

        const todayStart = startOfDay(new Date());
        const weekStart = startOfDay(subDays(new Date(), 7));

        const todayTasks = await this.prismaService.task.count({
            where: {
                userId: id,
                createdAt: {
                    gte: todayStart.toISOString()
                }
            }
        });

        const weekTasks = await this.prismaService.task.count({
            where: {
                userId: id,
                createdAt: {
                    gte: todayStart.toISOString()
                }
            }
        });

        // eslint-disable-next-line @typescript-eslint/no-unsued-vars
        const {password, ...rest} = userProfile;

        return {
            user: rest,
            statistics: [
                {label: "Total ", value: totalTaks},
                {label: "Completed tasks", value: completedTasks},
                {label: "Today tasks", value: todayTasks},
                {label: "Week tasks", value: weekTasks}
            ]
        }
    }
}
