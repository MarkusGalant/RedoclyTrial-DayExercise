import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, Max, Min } from 'class-validator';

import { PaginationMetaDto } from 'src/common/common.dto';

export class TeamListRequestDto {
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
    description: 'Number of team to return per page.',
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(1_000)
  limit: number = 20;
}

export class TeamListDto {
  @ApiProperty({ description: 'Unique identifier of the team.' })
  id: string;

  @ApiProperty({ description: 'Name of the team.' })
  name: string;
}

export class TeamListResponseDto {
  @ApiProperty({
    type: [TeamListDto],
    description: 'List of team records.',
  })
  data: TeamListDto[];

  @ApiProperty({ description: 'Pagination metadata for the memberships.' })
  meta: PaginationMetaDto;
}
