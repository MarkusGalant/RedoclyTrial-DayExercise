export declare enum MembershipRole {
    OWNER = "OWNER",
    MEMBER = "MEMBER",
    VIEWER = "VIEWER"
}
export declare enum SortDirection {
    ASC = "asc",
    DESC = "desc"
}
export declare enum SortField {
    NAME = "name",
    EMAIL = "email",
    ROLE = "role",
    LAST_LOGIN = "lastLogin",
    TEAMS = "teams"
}
export declare class TeamFilterDto {
    teamIds?: string[];
    noTeam?: boolean;
}
export declare class FilterMembershipsDto {
    roles?: MembershipRole[];
    isGuest?: boolean;
    teams?: TeamFilterDto;
    search?: string;
    sortBy: SortField;
    sortDirection?: SortDirection;
    page: number;
    limit: number;
}
export declare class TeamDto {
    id: string;
    name: string;
}
export declare class MembershipDto {
    id: string;
    email: string;
    name: string | null;
    role: string;
    isGuest: boolean;
    lastLoginAt: Date | null;
    teams: TeamDto[];
    hasNoTeam: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare class PaginationMetaDto {
    totalCount: number;
    page: number;
    limit: number;
    totalPages: number;
}
export declare class MembershipGridResultDto {
    data: MembershipDto[];
    meta: PaginationMetaDto;
}
