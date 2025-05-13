import React, { useState, } from 'react';
import { useQuery } from '@tanstack/react-query';

import {
  Box,
  Tabs,
  Tab,
  Button,
  Badge,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import ClearAllIcon from '@mui/icons-material/ClearAll';

import { DataGrid, GridColDef, } from '@mui/x-data-grid';

import { apiV1 } from '../../api/api';
import { MembershipsGridDto, MembershipsGridRequestDto, TeamDto } from '../../api/__generated__/Api';
import { convertMuiSortModel } from './helepr';

type Filter = {
  role: "All" | "OWNER" | "MEMBER" | "VIEWER";
  guest: "All" | "GUEST" | "NON-GUEST";
  lastLogin: "ANY TIME" | "LAST_7_DAYS" | "LAST_30_DAYS" | "LAST_90_DAYS";
  teams: "ALL_TEAM" | string[];
}
type SortFields = "name" | "email" | "role" | "lastLogin" | "teams";

const GridPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState({
    sortBy: 'name' as SortFields,
    sortOrder: 'asc' as 'asc' | 'desc',
  });
  const [paging, setPaging] = useState({
    page: 0,
    pageSize: 20,
  });
  const [filter, serFilter] = useState<Filter>({
    role: "All",
    guest: "All",
    lastLogin: "ANY TIME",
    teams: "NO_TEAM",
  })



  const crateMembershipsGridRequest = () => {
    const result: MembershipsGridRequestDto = {
      filter: {},
      sortBy: sort.sortBy,
      sortDirection: sort.sortOrder,
      page: paging.page + 1,
      limit: paging.pageSize,
    };

    if(search) {
      result.search = search;
    }

    switch(filter.guest) {
      case "GUEST":
        result.filter.isGuest = true;
        break;
      case "NON-GUEST":
        result.filter.isGuest = false;
        break;

    }

    switch(filter.lastLogin) {
      case "LAST_7_DAYS":
        result.filter.lastLoginAfter = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
        break;
      case "LAST_30_DAYS":
        result.filter.lastLoginAfter = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
        break;
      case "LAST_90_DAYS":
        result.filter.lastLoginAfter = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString();
        break;
      default:
        break;
    }

    if(filter.role !== "All") {
      result.filter.roles = [filter.role];
    }

    return result;
  }

  const membershipGrid = useQuery({
    queryKey: ['memberships', { paging, sort, filter, search }],
    queryFn: () =>
      apiV1.memberships.grid(crateMembershipsGridRequest()),
  })

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1.5 },
    { field: 'role', headerName: 'Role', flex: 1 },
    { field: 'lastLogin', headerName: 'Last Login', flex: 1 },
    {
      field: 'teams',
      headerName: 'Teams',
      flex: 1.5,
      //TODO fix ANY
      valueGetter: (teams: TeamDto[]) => teams.map(team => team.name).join(', ') || '',
    },
  ];

  return (
    <Box sx={{ bgcolor: '#121212', color: '#FFF', height: '100vh', p: 3 }}>
      {/* Tabs */}
      <Tabs value={0} textColor="inherit" indicatorColor="primary">
        <Tab label="People" />
        <Tab label="Invites" />
        <Tab label="Roles" />
      </Tabs>

      <Stack direction="row" justifyContent="flex-end" alignItems="center" mt={2} mb={1}>
        {/* Filters button + search */}
        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
          <Badge badgeContent={4} color="primary">
            <Button variant="outlined" >Filters</Button>
          </Badge>
          <TextField
            size="small"
            placeholder="Filter by name or email"
            variant="outlined"
            value={search}
            onChange={e => { setSearch(e.target.value); }}
          />
        </Stack>
      </Stack>

      {/* Filter controls */}
      <Stack direction="row" spacing={2} alignItems="center" mb={2} >
        <Stack flex={1} direction="row" spacing={1} alignItems="center" sx={{ maxWidth: 640 }}>

          {/* Role */}
          <FormControl fullWidth size="small">
            <InputLabel>Role</InputLabel>
            <Select

              label="Role"
              value={filter.role}
              onChange={e =>
                serFilter({
                  ...filter,
                  role: e.target.value,
                })
              }
            >
              <MenuItem value="ALL">All</MenuItem>
              <MenuItem value="OWNER">Owner</MenuItem>
              <MenuItem value="MEMBER">Member</MenuItem>
              <MenuItem value="VIEWER">Viewer</MenuItem>
            </Select>
          </FormControl>

          {/* Guest */}
          <FormControl fullWidth size="small">
            <InputLabel>Guest</InputLabel>
            <Select
              fullWidth
              label="Guest"
              value={filter?.guest}
              onChange={e =>
                serFilter({
                  ...filter,
                  guest: e.target.value,
                })
              }
            >
              <MenuItem value="ALL">All</MenuItem>
              <MenuItem value="GUEST">Guest</MenuItem>
              <MenuItem value="NON-GUEST">Non-Guest</MenuItem>
            </Select>
          </FormControl>

          {/* Last Login */}
          <FormControl fullWidth size="small">
            <InputLabel>Last Login</InputLabel>
            <Select
              label="Last Login"
              value={filter.lastLogin}
              onChange={e =>
                serFilter({
                  ...filter,
                  lastLogin: e.target.value,
                })
              }
            >
              <MenuItem value="ANY TIME">Any time</MenuItem>
              <MenuItem value="LAST_7_DAYS">Last 7 days</MenuItem>
              <MenuItem value="LAST_30_DAYS">Last 30 days</MenuItem>
              <MenuItem value="LAST_90_DAYS">Last 90 days</MenuItem>
            </Select>
          </FormControl>

          {/* Teams */}
          <FormControl
            fullWidth
            size="small">
            <InputLabel>Teams</InputLabel>
            <Select
              label="Teams"
              value={filter.teams}
              onChange={e =>
                serFilter({
                  ...filter,
                  teams: e.target.value,
                })
              }
            >
              <MenuItem value="ALL_TEAM">All teams</MenuItem>
              <MenuItem value="NO_TEAM">NO teams</MenuItem>
              {/* TOODo */}
              {/* <MenuItem value="TeamA">Team A</MenuItem> */}
            </Select>
          </FormControl>
        </Stack>

        <Stack direction="row" spacing={1}>
          {/* Add filter / Clear all */}
          <Button startIcon={<AddIcon />} size="small">Add filter</Button>
          <Button startIcon={<ClearAllIcon />} size="small">Clear all</Button>
        </Stack>
      </Stack>

      <DataGrid
        rows={(membershipGrid?.data as any)?.data || []}
        columns={columns}
        sortModel={[{ field: sort.sortBy, sort: sort.sortOrder }]}
        paginationModel={paging}
        paginationMode="server"
        sortingMode="server"
        loading={membershipGrid.isLoading}
        pagination
        onPaginationModelChange={(model) => setPaging(model)}
        onSortModelChange={(model) => setSort(convertMuiSortModel(model))}
        getRowId={(row: MembershipsGridDto) => row.id}
      />
    </Box >
  );
};

export default GridPage;
