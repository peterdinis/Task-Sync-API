import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { startOfDay, subDays } from 'date-fns';
import {hash} from "bcrypt";

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {}

    async findAllUsers() {
        const getAllUsers = await this.prismaService.user.findMany();
        return getAllUsers;
    }

    async createUser(registerDto: RegisterDto) {
        const newUser = await this.prismaService.user.create({
            data: {
                email: registerDto.email,
                username: registerDto.username,
                password: registerDto.password
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
                id: findOneUser.id,
            },

            data: userDto,
            select: {
                username: true,
                email: true,
            },
        });

        if (!updateUser) {
            throw new BadRequestException('Something went wrong doing update');
        }

        return updateUser;
    }

    async findOne(id: string) {
        const findOneUser = await this.prismaService.user.findUnique({
            where: {
                id,
            },
            include: {
                tasks: true,
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
                tasks: true,
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
        const totalTaks = userProfile.tasks.length;
        const projectsThatIAmIn =
            await this.prismaService.projectMembership.findMany({
                where: {
                    userId: id,
                },
                include: {
                    project: true,
                },
            });
        const completedTasks = await this.prismaService.task.count({
            where: {
                userId: id,
                isCompleted: true,
            },
        });

        const todayStart = startOfDay(new Date());
        const weekStart = subDays(new Date(), 7);

        const todayTasks = await this.prismaService.task.count({
            where: {
                userId: id,
                createdAt: {
                    gte: todayStart.toISOString(),
                },
            },
        });

        const weekTasks = await this.prismaService.task.count({
            where: {
                userId: id,
                createdAt: {
                    gte: weekStart.toISOString(),
                },
            },
        });

        const myReportedTasks = await this.prismaService.task.findMany({
            where: {
                reporter: userProfile.email,
            },
        });

        // eslint-disable-next-line @typescript-eslint/no-unsued-vars
        const { password, ...rest } = userProfile;

        return {
            user: rest,
            projects: projectsThatIAmIn.map((membership) => membership.project),
            statistics: [
                { label: 'Total ', value: totalTaks },
                { label: 'Completed tasks', value: completedTasks },
                { label: 'Today tasks', value: todayTasks },
                { label: 'Week tasks', value: weekTasks },
                { label: 'Reported tasks', value: myReportedTasks },
            ],
        };
    }
}
