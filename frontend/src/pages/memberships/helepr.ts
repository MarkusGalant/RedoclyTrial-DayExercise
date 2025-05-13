import { SortDirection } from "@mui/material";
import { GridSortModel } from "@mui/x-data-grid";

  const convertMuiSortField = (field?: string) => {
    return field || "name"
  }

  const convertMuiSortDirection = (sort?: SortDirection | null) => {
    if(sort === 'asc') {
      return 'asc';
    }
    if(sort === 'desc') {
      return 'desc';
    }
    return 'asc';
  }

  export const convertMuiSortModel = (model: GridSortModel) => {
    const sortBy = convertMuiSortField(model[0]?.field);
    const sortOrder = convertMuiSortDirection(model[0]?.sort);

    return {
      sortBy,
      sortOrder,
    }
  }