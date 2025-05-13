import { Body, Controller, Post } from '@nestjs/common';
import { MembershipsService } from './memberships.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import {
  MembershipsGridRequestDto,
  MembershipGridResponseDto,
} from './dtos/grid.dto';

@Controller({
  path: 'memberships',
})
export class MembershipsController {
  constructor(private readonly membershipsService: MembershipsService) {}

  @Post('/gird')
  @ApiOperation({ operationId: 'grid' })
  @ApiResponse({ status: 200, type: MembershipGridResponseDto })
  public async grid(
    @Body() body: MembershipsGridRequestDto,
  ): Promise<MembershipGridResponseDto> {
    return this.membershipsService.grid(body);
  }
}
