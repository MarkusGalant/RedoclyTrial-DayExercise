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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembershipGridResultDto = exports.PaginationMetaDto = exports.MembershipDto = exports.TeamDto = exports.FilterMembershipsDto = exports.TeamFilterDto = exports.SortField = exports.SortDirection = exports.MembershipRole = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
var MembershipRole;
(function (MembershipRole) {
    MembershipRole["OWNER"] = "OWNER";
    MembershipRole["MEMBER"] = "MEMBER";
    MembershipRole["VIEWER"] = "VIEWER";
})(MembershipRole || (exports.MembershipRole = MembershipRole = {}));
var SortDirection;
(function (SortDirection) {
    SortDirection["ASC"] = "asc";
    SortDirection["DESC"] = "desc";
})(SortDirection || (exports.SortDirection = SortDirection = {}));
var SortField;
(function (SortField) {
    SortField["NAME"] = "name";
    SortField["EMAIL"] = "email";
    SortField["ROLE"] = "role";
    SortField["LAST_LOGIN"] = "lastLogin";
    SortField["TEAMS"] = "teams";
})(SortField || (exports.SortField = SortField = {}));
class TeamFilterDto {
}
exports.TeamFilterDto = TeamFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: [String],
        description: 'List of team IDs to filter memberships by specific teams.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], TeamFilterDto.prototype, "teamIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: Boolean,
        description: 'Boolean flag to include memberships that are not assigned to any team.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true'),
    __metadata("design:type", Boolean)
], TeamFilterDto.prototype, "noTeam", void 0);
class FilterMembershipsDto {
    constructor() {
        this.sortBy = SortField.NAME;
        this.sortDirection = SortDirection.ASC;
        this.page = 1;
        this.limit = 20;
    }
}
exports.FilterMembershipsDto = FilterMembershipsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Filter memberships by one or more roles (OWNER, MEMBER, VIEWER).',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(MembershipRole, { each: true }),
    __metadata("design:type", Array)
], FilterMembershipsDto.prototype, "roles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: Boolean,
        description: 'Filter to include only guest memberships if true.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], FilterMembershipsDto.prototype, "isGuest", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: TeamFilterDto,
        description: 'Filter memberships based on team assignment criteria.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TeamFilterDto),
    __metadata("design:type", TeamFilterDto)
], FilterMembershipsDto.prototype, "teams", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: String,
        description: 'Search string to filter memberships by name or email containing this value.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterMembershipsDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        enum: SortField,
        default: SortField.NAME,
        description: 'Field on which the memberships should be sorted.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(SortField),
    __metadata("design:type", String)
], FilterMembershipsDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        enum: SortDirection,
        default: SortDirection.ASC,
        description: 'Direction of sorting: ascending or descending.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(SortDirection),
    __metadata("design:type", String)
], FilterMembershipsDto.prototype, "sortDirection", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        default: 1,
        description: 'Page number for paginated results, starting from 1.',
    }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], FilterMembershipsDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        default: 20,
        description: 'Number of memberships to return per page.',
    }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], FilterMembershipsDto.prototype, "limit", void 0);
class TeamDto {
}
exports.TeamDto = TeamDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique identifier of the team.' }),
    __metadata("design:type", String)
], TeamDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Name of the team.' }),
    __metadata("design:type", String)
], TeamDto.prototype, "name", void 0);
class MembershipDto {
}
exports.MembershipDto = MembershipDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique identifier of the membership.' }),
    __metadata("design:type", String)
], MembershipDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Email address of the member.' }),
    __metadata("design:type", String)
], MembershipDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Full name of the member. May be null if not set.',
    }),
    __metadata("design:type", Object)
], MembershipDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Role of the member in the organization.' }),
    __metadata("design:type", String)
], MembershipDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Indicates if the member is a guest user.' }),
    __metadata("design:type", Boolean)
], MembershipDto.prototype, "isGuest", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Timestamp of the last login of the member, or null if never logged in.',
    }),
    __metadata("design:type", Object)
], MembershipDto.prototype, "lastLoginAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [TeamDto],
        description: 'List of teams this member belongs to.',
    }),
    __metadata("design:type", Array)
], MembershipDto.prototype, "teams", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Flag indicating whether the member is not assigned to any team.',
    }),
    __metadata("design:type", Boolean)
], MembershipDto.prototype, "hasNoTeam", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Timestamp when the membership was created.' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], MembershipDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Timestamp when the membership was last updated.',
    }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], MembershipDto.prototype, "updatedAt", void 0);
class PaginationMetaDto {
}
exports.PaginationMetaDto = PaginationMetaDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total number of memberships available.' }),
    __metadata("design:type", Number)
], PaginationMetaDto.prototype, "totalCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Current page number in the pagination.' }),
    __metadata("design:type", Number)
], PaginationMetaDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of memberships returned per page.' }),
    __metadata("design:type", Number)
], PaginationMetaDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total number of pages available.' }),
    __metadata("design:type", Number)
], PaginationMetaDto.prototype, "totalPages", void 0);
class MembershipGridResultDto {
}
exports.MembershipGridResultDto = MembershipGridResultDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [MembershipDto],
        description: 'List of membership records.',
    }),
    __metadata("design:type", Array)
], MembershipGridResultDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Pagination metadata for the memberships.' }),
    __metadata("design:type", PaginationMetaDto)
], MembershipGridResultDto.prototype, "meta", void 0);
//# sourceMappingURL=filter-memberships.dto.js.map