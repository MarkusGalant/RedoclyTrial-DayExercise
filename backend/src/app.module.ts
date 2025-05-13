import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { MembershipsService } from './memberships/memberships.service';
import { MembershipsModule } from './memberships/memberships.module';
import { TeamsModule } from './teams/teams.module';

@Module({
  imports: [PrismaModule, MembershipsModule, TeamsModule],
  controllers: [],
  providers: [MembershipsService],
})
export class AppModule {}
