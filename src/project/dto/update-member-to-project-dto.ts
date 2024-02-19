import { PartialType } from '@nestjs/swagger';
import { AddMemberToProjectDto } from './add-member-to-project-dto';

export class UpdateMemberProjectDto extends PartialType(
    AddMemberToProjectDto,
) {}
