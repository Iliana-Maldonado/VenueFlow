import { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import { DataGrid } from '@mui/x-data-grid';

export default function ReservationTable({
  rows = [],
  columns = [],
  showSearch = true,
  searchPlaceholder = 'Search...',
  searchableFields = [],
  pageSize = 10,
  noRowsTitle = 'No data found',
  noRowsMessage = 'There are no records matching your search.',
}) {
  const [search, setSearch] = useState('');

  const filteredRows = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return rows;
    }

    return rows.filter((row) => {
      const valuesToSearch =
        searchableFields.length > 0
          ? searchableFields.map((field) => row[field])
          : Object.values(row);

      return valuesToSearch.some((value) =>
        String(value ?? '')
          .toLowerCase()
          .includes(normalizedSearch),
      );
    });
  }, [rows, search, searchableFields]);

  return (
    <Box sx={{ width: '100%' }}>
      {showSearch && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mb: 2,
          }}
        >
          <TextField
            size="small"
            placeholder={searchPlaceholder}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            sx={{
              width: {
                xs: '100%',
                sm: 340,
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
      )}

      <DataGrid
        rows={filteredRows}
        columns={columns}
        autoHeight
        disableRowSelectionOnClick
        rowHeight={58}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize,
            },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        slots={{
          noRowsOverlay: () => (
            <EmptyTable
              title={noRowsTitle}
              message={noRowsMessage}
            />
          ),
        }}
        sx={{
          border: 0,

          '& .MuiDataGrid-columnHeaders': {
            fontWeight: 700,
          },

          '& .MuiDataGrid-row:nth-of-type(even)': {
            backgroundColor: 'action.hover',
          },

          '& .MuiDataGrid-cell': {
            display: 'flex',
            alignItems: 'center',
          },

          '& .MuiDataGrid-overlayWrapper': {
            minHeight: 180,
          },
        }}
      />
    </Box>
  );
}

function EmptyTable({ title, message }) {
  return (
    <Box
      sx={{
        minHeight: 180,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        textAlign: 'center',
      }}
    >
      <Typography variant="subtitle1" fontWeight={700}>
        {title}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 0.5 }}
      >
        {message}
      </Typography>
    </Box>
  );
}