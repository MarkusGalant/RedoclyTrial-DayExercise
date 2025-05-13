import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import {
  TeamListDto,
  TeamListRequestDto,
  TeamListResponseDto,
} from './dtos/list.dto';

@Injectable()
export class TeamsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(dto: TeamListRequestDto): Promise<TeamListResponseDto> {
    const { page, limit } = dto;
    const [data, totalCount] = await this.prisma.$transaction([
      this.prisma.team.findMany({
        select: {
          id: true,
          name: true,
        },
        orderBy: {
          name: 'asc',
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.team.count(),
    ]);

    return {
      data: data.map(
        (team): TeamListDto => ({
          id: team.id,
          name: team.name,
        }),
      ),
      meta: {
        totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  }
}
