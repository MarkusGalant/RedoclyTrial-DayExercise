import { ApiProperty } from '@nestjs/swagger';

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export class PaginationMetaDto {
  @ApiProperty({ description: 'Total number of available data.' })
  totalCount: number;

  @ApiProperty({ description: 'Current page number in the pagination.' })
  page: number;

  @ApiProperty({ description: 'Number of returned per page.' })
  limit: number;

  @ApiProperty({ description: 'Total number of pages available.' })
  totalPages: number;
}
