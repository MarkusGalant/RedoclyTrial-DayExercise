/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { SortDirection } from '../common/common.dto';

import {
  MembershipsGridRequestDto,
  MembershipGridResponseDto,
  MembershipsGridDto,
  MembershipsGridSortField,
} from './dtos/grid.dto';
import { isDefined } from 'class-validator';

@Injectable()
export class MembershipsService {
  constructor(private readonly prisma: PrismaService) {}

  async grid(
    dto: MembershipsGridRequestDto,
  ): Promise<MembershipGridResponseDto> {
    const { filter, search, sortBy, sortDirection, page, limit } = dto;
    const { roles, isGuest, teams } = filter || {};
    const where: any = {};

    if (!!roles && roles.length > 0) {
      where.role = { in: roles };
    }

    if (isDefined(filter.lastLoginAfter)) {
      where.user = {
        ...where.user,
        lastLoginAt: {
          gte: new Date(filter.lastLoginAfter),
        },
      };
    }
    if (isDefined(isGuest)) {
      where.isGuest = isGuest;
    }

    if (isDefined(teams)) {
      if (teams.teamIds && teams.teamIds.length > 0)
        where.user = {
          ...where.user,
          teamLinks: {
            some: {
              teamId: { in: teams.teamIds },
            },
          },
        };

      if (teams.noTeam) {
        where.user = {
          ...where.user,
          teamLinks: {
            none: {},
          },
        };
      }
    }

    if (isDefined(search)) {
      where.user = {
        ...where.user,
        OR: [{ email: { contains: search } }, { name: { contains: search } }],
      };
    }

    const orderBy = this.getOrderByField(sortBy, sortDirection);

    const [data, totalCount] = await this.prisma.$transaction([
      this.prisma.membership.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              lastLoginAt: true,
              teamLinks: {
                include: {
                  team: true,
                },
              },
            },
          },
        },
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.membership.count({ where }),
    ]);

    return {
      data: data.map(
        (membership): MembershipsGridDto => ({
          id: membership.id,
          email: membership.user.email,
          name: membership.user.name,
          role: membership.role,
          isGuest: membership.isGuest,
          lastLoginAt: membership.user.lastLoginAt,
          teams: membership.user.teamLinks.map((link) => ({
            id: link.team.id,
            name: link.team.name,
          })),
          createdAt: membership.createdAt,
          updatedAt: membership.updatedAt,
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

  private getOrderByField(
    sortBy?: MembershipsGridSortField,
    sortDirection?: SortDirection,
  ): Prisma.MembershipOrderByWithRelationInput {
    const direction = sortDirection === SortDirection.DESC ? 'desc' : 'asc';

    if (!sortBy) {
      return {
        user: {
          name: {
            sort: direction,
            nulls: 'first',
          },
        },
      };
    }

    switch (sortBy) {
      case MembershipsGridSortField.NAME:
        return {
          user: {
            name: {
              sort: direction,
              nulls: 'first',
            },
          },
        };
      case MembershipsGridSortField.EMAIL:
        return {
          user: {
            email: direction,
          },
        };
      case MembershipsGridSortField.ROLE:
        return {
          role: direction,
        };
      case MembershipsGridSortField.LAST_LOGIN:
        return {
          user: {
            lastLoginAt: direction,
          },
        };
      //TDO: Fix team sorting
      // case MembershipsGridSortField.TEAMS: {
      //   return {
      //     user: {
      //       teamLinks: {
      //         team: {
      //           name: direction,
      //         },
      //       },
      //     },
      //   };
      // }
      default:
        throw new Error(`Unknown sort field.`);
    }
  }
}
