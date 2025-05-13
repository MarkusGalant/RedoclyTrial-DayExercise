import { PrismaService } from '../prisma/prisma.service';
import { FilterMembershipsDto, MembershipGridResultDto } from './dtos/filter-memberships.dto';
export declare class MembershipsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    grid(filterDto: FilterMembershipsDto): Promise<MembershipGridResultDto>;
}
