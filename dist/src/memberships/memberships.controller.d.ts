import { MembershipsService } from './memberships.service';
import { FilterMembershipsDto, MembershipGridResultDto } from './dtos/filter-memberships.dto';
export declare class MembershipsController {
    private readonly membershipsService;
    constructor(membershipsService: MembershipsService);
    grid(filterDto: FilterMembershipsDto): Promise<MembershipGridResultDto>;
}
