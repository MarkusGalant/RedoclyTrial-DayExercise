import {
  IsOptional,
  IsString,
  IsBoolean,
  IsEnum,
  IsArray,
  IsObject,
  ValidateNested,
  IsDateString,
  Min,
  Max,
  IsNumber,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { PaginationMetaDto, SortDirection } from '../../common/common.dto';

export enum MembershipRole {
  OWNER = 'OWNER',
  MEMBER = 'MEMBER',
  VIEWER = 'VIEWER',
}

export enum MembershipsGridSortField {
  NAME = 'name',
  EMAIL = 'email',
  ROLE = 'role',
  LAST_LOGIN = 'lastLogin',
  TEAMS = 'teams',
}

// Team filter structure: { teamIds, noTeam }
export class TeamFilterDto {
  @ApiProperty({
    required: false,
    type: [String],
    description: 'List of team IDs to filter memberships by specific teams.',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  teamIds?: string[];

  @ApiProperty({
    required: false,
    type: Boolean,
    description:
      'Boolean flag to include memberships that are not assigned to any team.',
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true', { toClassOnly: true }) // Make sure it transforms correctly
  noTeam?: boolean;
}

export class FilterMembershipsGridDto {
  @ApiProperty({
    required: false,
    description:
      'Filter memberships by one or more roles (OWNER, MEMBER, VIEWER).',
  })
  @IsOptional()
  @IsArray()
  @IsEnum(MembershipRole, { each: true })
  roles?: MembershipRole[];

  @ApiProperty({
    required: false,
    type: Boolean,
    description: 'Filter to include only guest memberships if true.',
  })
  @IsOptional()
  @IsBoolean()
  isGuest?: boolean;

  @ApiProperty({
    required: false,
    type: String,
    description: 'Filter memberships based on last login date.',
  })
  @IsOptional()
  @IsDateString()
  lastLoginAfter?: string;

  @ApiProperty({
    required: false,
    type: TeamFilterDto,
    description: 'Filter memberships based on team assignment criteria.',
  })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => TeamFilterDto)
  teams?: TeamFilterDto;
}

export class MembershipsGridRequestDto {
  @ApiProperty({
    required: false,
    type: String,
    description:
      'Search string to filter memberships by name or email containing this value.',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    required: true,
    type: FilterMembershipsGridDto,
    description: 'Filter memberships based on various criteria.',
  })
  @ValidateNested()
  @Type(() => FilterMembershipsGridDto)
  filter: FilterMembershipsGridDto;

  @ApiProperty({
    required: false,
    enum: MembershipsGridSortField,
    default: MembershipsGridSortField.NAME,
    description: 'Field on which the memberships should be sorted.',
  })
  @IsOptional()
  @IsEnum(MembershipsGridSortField)
  sortBy: MembershipsGridSortField = MembershipsGridSortField.NAME;

  @ApiProperty({
    required: false,
    enum: SortDirection,
    default: SortDirection.ASC,
    description: 'Direction of sorting: ascending or descending.',
  })
  @IsOptional()
  @IsEnum(SortDirection)
  sortDirection?: SortDirection = SortDirection.ASC;
  @ApiProperty({
    default: 1,
    description: 'Page number for paginated results, starting from 1.',
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(1_000)
  page: number = 1;

  @ApiProperty({
    default: 20,
    description: 'Number of memberships to return per page.',
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(1_000)
  limit: number = 20;
}

export class TeamDto {
  @ApiProperty({ description: 'Unique identifier of the team.' })
  id: string;

  @ApiProperty({ description: 'Name of the team.' })
  name: string;
}

export class MembershipsGridDto {
  @ApiProperty({ description: 'Unique identifier of the membership.' })
  id: string;

  @ApiProperty({ description: 'Email address of the member.' })
  email: string;

  @ApiProperty({
    required: false,
    description: 'Full name of the member. May be null if not set.',
  })
  name: string | null;

  @ApiProperty({ description: 'Role of the member in the organization.' })
  role: string;

  @ApiProperty({ description: 'Indicates if the member is a guest user.' })
  isGuest: boolean;

  @ApiProperty({
    required: false,
    description:
      'Timestamp of the last login of the member, or null if never logged in.',
  })
  lastLoginAt: Date | null;

  @ApiProperty({
    type: [TeamDto],
    description: 'List of teams this member belongs to.',
  })
  teams: TeamDto[];

  @ApiProperty({ description: 'Timestamp when the membership was created.' })
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp when the membership was last updated.',
  })
  updatedAt: Date;
}

export class MembershipGridResponseDto {
  @ApiProperty({
    type: [MembershipsGridDto],
    description: 'List of membership records.',
  })
  data: MembershipsGridDto[];

  @ApiProperty({ description: 'Pagination metadata for the memberships.' })
  meta: PaginationMetaDto;
}
