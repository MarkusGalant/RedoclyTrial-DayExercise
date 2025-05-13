"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembershipsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MembershipsService = class MembershipsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async grid(filterDto) {
        const { roles, isGuest, teams, search, sortBy, sortDirection, page, limit, } = filterDto;
        const where = {};
        if (roles && roles.length > 0) {
            where.role = { in: roles };
        }
        if (isGuest !== undefined) {
            where.isGuest = isGuest;
        }
        if (teams?.teamIds && teams.teamIds.length > 0) {
            where.user = {
                teamLinks: {
                    some: {
                        teamId: { in: teams.teamIds },
                    },
                },
            };
        }
        if (teams?.noTeam) {
            where.user = {
                teamLinks: {
                    none: {},
                },
            };
        }
        if (search) {
            where.user = {
                ...where.user,
                OR: [
                    { email: { contains: search, mode: 'insensitive' } },
                    { name: { contains: search, mode: 'insensitive' } },
                ],
            };
        }
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
                orderBy: {
                    [sortBy]: sortDirection,
                },
                skip: (page - 1) * limit,
                take: limit,
            }),
            this.prisma.membership.count({ where }),
        ]);
        const memberships = data.map((membership) => ({
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
            hasNoTeam: !membership.user.teamLinks.length,
            createdAt: membership.createdAt,
            updatedAt: membership.updatedAt,
        }));
        return {
            data: memberships,
            meta: {
                totalCount,
                page,
                limit,
                totalPages: Math.ceil(totalCount / limit),
            },
        };
    }
};
exports.MembershipsService = MembershipsService;
exports.MembershipsService = MembershipsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MembershipsService);
//# sourceMappingURL=memberships.service.js.map