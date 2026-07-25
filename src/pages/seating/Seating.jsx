import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const tables = [
  { id: 1, name: 'Table 1', capacity: 8, status: 'Reserved' },
  { id: 2, name: 'Table 2', capacity: 6, status: 'Available' },
  { id: 3, name: 'Table 3', capacity: 10, status: 'Occupied' },
  { id: 4, name: 'Table 4', capacity: 8, status: 'Reserved' },
  { id: 5, name: 'Table 5', capacity: 6, status: 'Available' },
  { id: 6, name: 'Table 6', capacity: 10, status: 'Available' },
  { id: 7, name: 'Table 7', capacity: 8, status: 'Occupied' },
  { id: 8, name: 'Table 8', capacity: 6, status: 'Reserved' },
];

function getChipColor(status) {
  if (status === 'Available') {
    return 'success';
  }

  if (status === 'Reserved') {
    return 'warning';
  }

  return 'error';
}

export default function Seating() {
  return (
    <Box sx={{ width: '100%' }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h4" component="h1">
            Seating
          </Typography>

          <Typography variant="body1" color="text.secondary">
            View table availability and guest capacity.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1}>
          <Chip label="Available" color="success" variant="outlined" />
          <Chip label="Reserved" color="warning" variant="outlined" />
          <Chip label="Occupied" color="error" variant="outlined" />
        </Stack>
      </Stack>

      <Grid container spacing={2}>
        {tables.map((table) => (
          <Grid key={table.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card
              variant="outlined"
              sx={{
                height: '100%',
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="h6">
                      {table.name}
                    </Typography>

                    <Chip
                      label={table.status}
                      color={getChipColor(table.status)}
                      size="small"
                    />
                  </Stack>

                  <Typography variant="body2" color="text.secondary">
                    Capacity: {table.capacity} guests
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}