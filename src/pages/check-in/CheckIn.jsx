import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';

import ReservationTable from '../../components/ReservationTable';
import { initialReservations } from '../../data/reservations';

const statusStyles = {
  Confirmed: {
    backgroundColor: '#E7F8E5',
    color: '#2E7D32',
  },
  'Checked-in': {
    backgroundColor: '#F0E6FF',
    color: '#8E44DD',
  },
  Pending: {
    backgroundColor: '#FFF3CD',
    color: '#B7791F',
  },
  Reschedule: {
    backgroundColor: '#FCE4F1',
    color: '#D63384',
  },
  Canceled: {
    backgroundColor: '#FDE2E2',
    color: '#D32F2F',
  },
};

function StatusChip({ status }) {
  const styles = statusStyles[status] || {
    backgroundColor: '#EEEEEE',
    color: '#616161',
  };

  return (
    <Chip
      label={status}
      size="small"
      sx={{
        ...styles,
        minWidth: 96,
        fontWeight: 600,
      }}
    />
  );
}

function formatDateKey(selectedDate) {
  if (!selectedDate) return '';

  const month = String(selectedDate.month + 1).padStart(2, '0');
  const day = String(selectedDate.day).padStart(2, '0');

  return `${selectedDate.year}-${month}-${day}`;
}

function formatDateText(dateKey) {
  if (!dateKey) return '';

  const [year, month, day] = dateKey.split('-').map(Number);

  return new Intl.DateTimeFormat('en-IE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(year, month - 1, day));
}

function getDefaultDateKey() {
  const today = new Date();

  const todayKey = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0'),
  ].join('-');

  const hasBookingsToday = initialReservations.some(
    (reservation) => reservation.date === todayKey,
  );

  if (hasBookingsToday) {
    return todayKey;
  }

  return initialReservations[0]?.date || todayKey;
}

export default function CheckIn() {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedDateKey =
    formatDateKey(location.state?.selectedDate) ||
    getDefaultDateKey();

  const selectedDateText = formatDateText(selectedDateKey);

  const [reservations, setReservations] = useState(() =>
    initialReservations.filter(
      (reservation) => reservation.date === selectedDateKey,
    ),
  );

  const [editingTableId, setEditingTableId] = useState(null);
  const [tableValue, setTableValue] = useState('');

  const handleCheckIn = (reservationId) => {
    setReservations((currentReservations) =>
      currentReservations.map((reservation) =>
        reservation.id === reservationId
          ? {
              ...reservation,
              status: 'Checked-in',
            }
          : reservation,
      ),
    );
  };

  const handleEditTable = (reservation) => {
    setEditingTableId(reservation.id);

    setTableValue(
      reservation.table === 'No seat'
        ? ''
        : reservation.table.replace('Table ', ''),
    );
  };

  const handleSaveTable = (reservationId) => {
    const newTable = tableValue.trim();

    setReservations((currentReservations) =>
      currentReservations.map((reservation) =>
        reservation.id === reservationId
          ? {
              ...reservation,
              table: newTable
                ? `Table ${newTable}`
                : 'No seat',
            }
          : reservation,
      ),
    );

    setEditingTableId(null);
    setTableValue('');
  };

  const handleCancelTableEdit = () => {
    setEditingTableId(null);
    setTableValue('');
  };

  const columns = useMemo(
    () => [
      {
        field: 'time',
        headerName: 'Time',
        minWidth: 105,
        flex: 0.6,
      },
      {
        field: 'id',
        headerName: 'Booking ID',
        minWidth: 140,
        flex: 0.9,
        valueFormatter: (value) => `#${value}`,
      },
      {
        field: 'customer',
        headerName: 'Customer',
        minWidth: 175,
        flex: 1.2,
      },
      {
        field: 'guests',
        headerName: 'Guests',
        minWidth: 80,
        flex: 0.5,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'vendor',
        headerName: 'Vendor',
        minWidth: 135,
        flex: 0.9,
      },
      {
        field: 'upsell',
        headerName: 'Upsell',
        minWidth: 100,
        flex: 0.7,
      },
      {
        field: 'table',
        headerName: 'Table',
        minWidth: 205,
        flex: 1.2,
        sortable: false,
        renderCell: (params) => {
          const isEditing = editingTableId === params.row.id;

          if (isEditing) {
            return (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.75,
                  width: '100%',
                }}
              >
                <TextField
                  size="small"
                  value={tableValue}
                  onChange={(event) =>
                    setTableValue(event.target.value)
                  }
                  placeholder="Number"
                  autoFocus
                  sx={{
                    width: 85,

                    '& .MuiInputBase-input': {
                      py: 0.75,
                    },
                  }}
                  onClick={(event) => event.stopPropagation()}
                  onKeyDown={(event) => {
                    event.stopPropagation();

                    if (event.key === 'Enter') {
                      handleSaveTable(params.row.id);
                    }

                    if (event.key === 'Escape') {
                      handleCancelTableEdit();
                    }
                  }}
                />

                <Button
                  size="small"
                  variant="contained"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleSaveTable(params.row.id);
                  }}
                  sx={{
                    minWidth: 54,
                    px: 1,
                  }}
                >
                  Save
                </Button>
              </Box>
            );
          }

          return (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                width: '100%',
              }}
            >
              <Chip
                label={params.value}
                size="small"
                variant="outlined"
                sx={{
                  backgroundColor:
                    params.value === 'No seat'
                      ? 'action.hover'
                      : '#E5FAFA',

                  color:
                    params.value === 'No seat'
                      ? 'text.secondary'
                      : '#218C8C',

                  borderColor:
                    params.value === 'No seat'
                      ? 'divider'
                      : '#BDEEEE',

                  fontWeight: 600,
                }}
              />

              <IconButton
                size="small"
                aria-label={`Edit table for ${params.row.customer}`}
                onClick={(event) => {
                  event.stopPropagation();
                  handleEditTable(params.row);
                }}
              >
                <EditRoundedIcon fontSize="small" />
              </IconButton>
            </Box>
          );
        },
      },
      {
        field: 'status',
        headerName: 'Status',
        minWidth: 125,
        flex: 0.8,
        renderCell: (params) => (
          <StatusChip status={params.value} />
        ),
      },
      {
        field: 'payment',
        headerName: 'Payment',
        minWidth: 105,
        flex: 0.6,
        align: 'right',
        headerAlign: 'right',
        valueFormatter: (value) =>
          `€${Number(value).toFixed(2)}`,
      },
      {
        field: 'actions',
        headerName: 'Action',
        minWidth: 125,
        sortable: false,
        filterable: false,
        renderCell: (params) => {
          const disabledStatuses = [
            'Canceled',
            'Reschedule',
            'Checked-in',
          ];

          const isDisabled = disabledStatuses.includes(
            params.row.status,
          );

          return (
            <Button
              size="small"
              variant={isDisabled ? 'outlined' : 'contained'}
              disabled={isDisabled}
              onClick={(event) => {
                event.stopPropagation();
                handleCheckIn(params.row.id);
              }}
              sx={{
                minWidth: 100,

                '&.Mui-disabled': {
                  color: '#757575',
                  borderColor: '#D0D0D0',
                  backgroundColor: '#EEEEEE',
                },
              }}
            >
              {params.row.status === 'Checked-in'
                ? 'Checked-in'
                : 'Check in'}
            </Button>
          );
        },
      },
    ],
    [editingTableId, tableValue],
  );

  const checkedInCount = reservations.filter(
    (reservation) => reservation.status === 'Checked-in',
  ).length;

  const totalGuests = reservations
    .filter((reservation) => reservation.status !== 'Canceled')
    .reduce(
      (total, reservation) =>
        total + (Number(reservation.guests) || 0),
      0,
    );

  const waitingCount = reservations.filter(
    (reservation) =>
      ![
        'Canceled',
        'Reschedule',
        'Checked-in',
      ].includes(reservation.status),
  ).length;

  return (
    <Box sx={{ width: '100%' }}>
      <Button
        variant="text"
        startIcon={<ArrowBackRoundedIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Back to Bookings
      </Button>

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          component="h1"
          fontWeight={700}
        >
          Check-in
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mt: 0.5 }}
        >
          Manage arrivals and guest check-ins for{' '}
          {selectedDateText}.
        </Typography>
      </Box>

      <Stack
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <SummaryCard
          title="Reservations"
          value={reservations.length}
        />

        <SummaryCard
          title="Expected guests"
          value={totalGuests}
        />

        <SummaryCard
          title="Checked-in"
          value={checkedInCount}
        />

        <SummaryCard
          title="Waiting"
          value={waitingCount}
        />
      </Stack>

      <Card variant="outlined">
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 2,
            }}
          >
            <HowToRegRoundedIcon color="primary" />

            <Typography variant="h6" fontWeight={700}>
              Bookings for {selectedDateText}
            </Typography>
          </Box>

          <ReservationTable
            rows={reservations}
            columns={columns}
            searchableFields={[
              'customer',
              'email',
              'phone',
              'id',
              'vendor',
              'table',
              'status',
            ]}
            searchPlaceholder="Search name, ID, vendor or table..."
            noRowsTitle="No bookings found"
            noRowsMessage={`There are no reservations scheduled for ${selectedDateText}.`}
          />
        </CardContent>
      </Card>
    </Box>
  );
}

function SummaryCard({ title, value }) {
  return (
    <Card
      variant="outlined"
      sx={{
        flex: 1,
        minWidth: 150,
      }}
    >
      <CardContent
        sx={{
          '&:last-child': {
            pb: 2,
          },
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>

        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ mt: 0.5 }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}