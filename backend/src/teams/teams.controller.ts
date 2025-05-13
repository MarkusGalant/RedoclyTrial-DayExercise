import { Body, Controller, Post } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { TeamListRequestDto, TeamListResponseDto } from './dtos/list.dto';

@Controller({
  path: 'teams',
})
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post('/gird')
  @ApiOperation({ operationId: 'list' })
  @ApiResponse({ status: 200, type: TeamListResponseDto })
  public async list(
    @Body() body: TeamListRequestDto,
  ): Promise<TeamListResponseDto> {
    return this.teamsService.list(body);
  }
}
