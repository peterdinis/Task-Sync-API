import { ApiProperty } from '@nestjs/swagger';
import { ImporatntPriority, Project, User } from '@prisma/client';
import { Transform } from 'class-transformer';

export class ViewTaskDto {
    @ApiProperty()
    createdAt: Date | string;

    @ApiProperty()
    updatedAt: Date | string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    isCompleted: boolean;

    @ApiProperty()
    @Transform(({ value }) => ('' + value).toLowerCase())
    imporatntPriority?: ImporatntPriority;

    @ApiProperty()
    reporter: string;

    @ApiProperty()
    project: Project;

    @ApiProperty()
    user: User;

    @ApiProperty()
    isDone: boolean;

    @ApiProperty()
    totalSec: number;

    @ApiProperty()
    startWorkingOnTask: boolean;
}
