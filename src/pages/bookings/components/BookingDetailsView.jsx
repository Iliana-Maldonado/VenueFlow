import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import PendingActionsRoundedIcon from '@mui/icons-material/PendingActionsRounded';

import { useNavigate } from 'react-router-dom';

import ReservationTable from '../../../components/ReservationTable';
import BookingSummaryCard from './BookingSummaryCard';

export default function BookingDetailsView({
  selectedDate,
  selectedDateText,
  reservations,
  columns,
  totalGuests,
  confirmedBookings,
  pendingBookings,
  onBack,
}) {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Button
          variant="text"
          startIcon={<ArrowBackRoundedIcon />}
          onClick={onBack}
        >
          Back to Calendar
        </Button>

        <Button
          variant="text"
          endIcon={<ArrowForwardRoundedIcon />}
          onClick={() =>
            navigate('/check-in', {
              state: {
                selectedDate,
              },
            })
          }
        >
          Go to Check-In
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          component="h1"
          fontWeight={700}
        >
          Daily Bookings
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mt: 0.5 }}
        >
          Reservations scheduled for {selectedDateText}.
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
        <BookingSummaryCard
          icon={<CalendarMonthRoundedIcon />}
          title="Bookings"
          value={reservations.length}
        />

        <BookingSummaryCard
          icon={<GroupsRoundedIcon />}
          title="Total Guests"
          value={totalGuests}
        />

        <BookingSummaryCard
          icon={<CheckCircleRoundedIcon />}
          title="Confirmed"
          value={confirmedBookings}
        />

        <BookingSummaryCard
          icon={<PendingActionsRoundedIcon />}
          title="Pending"
          value={pendingBookings}
        />
      </Stack>

      <ReservationTable
        rows={reservations}
        columns={columns}
        searchableFields={[
          'customer',
          'email',
          'phone',
          'vendor',
          'status',
          'table',
        ]}
        searchPlaceholder="Search daily bookings..."
        pageSize={10}
      />
    </Box>
  );
}