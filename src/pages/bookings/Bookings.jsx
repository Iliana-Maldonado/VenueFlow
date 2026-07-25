import { useMemo, useState } from 'react';

import Chip from '@mui/material/Chip';

import BookingCalendarView from './components/BookingCalendarView';
import BookingDetailsView from './components/BookingDetailsView';

import { initialReservations } from '../../data/reservations';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const statusColors = {
  Confirmed: 'success',
  'Checked-in': 'primary',
  Pending: 'warning',
  Reschedule: 'info',
  Canceled: 'error',
};

function formatDateKey(selectedDate) {
  if (!selectedDate) return '';

  const month = String(selectedDate.month + 1).padStart(2, '0');
  const day = String(selectedDate.day).padStart(2, '0');

  return `${selectedDate.year}-${month}-${day}`;
}

export default function Bookings() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const bookingStats = useMemo(() => {
  return initialReservations.reduce((stats, reservation) => {
    if (!stats[reservation.date]) {
      stats[reservation.date] = {
        bookings: 0,
        guests: 0,
      };
    }

    stats[reservation.date].bookings += 1;
    stats[reservation.date].guests +=
      Number(reservation.guests) || 0;

    return stats;
  }, {});
}, []);

  const selectedDateKey = formatDateKey(selectedDate);

  const dailyReservations = useMemo(() => {
    if (!selectedDateKey) return [];

    return initialReservations.filter(
      (reservation) => reservation.date === selectedDateKey,
    );
  }, [selectedDateKey]);

  const totalGuests = useMemo(() => {
  return dailyReservations.reduce(
    (total, reservation) =>
      total + (Number(reservation.guests) || 0),
    0,
  );
}, [dailyReservations]);

  const confirmedBookings = useMemo(() => {
    return dailyReservations.filter(
      (reservation) => reservation.status === 'Confirmed',
    ).length;
  }, [dailyReservations]);

  const pendingBookings = useMemo(() => {
    return dailyReservations.filter(
      (reservation) => reservation.status === 'Pending',
    ).length;
  }, [dailyReservations]);

  const columns = useMemo(
    () => [
      {
        field: 'time',
        headerName: 'Time',
        width: 90,
      },
      {
        field: 'customer',
        headerName: 'Customer',
        flex: 1,
        minWidth: 180,
      },
      {
        field: 'guests',
        headerName: 'Guests',
        width: 90,
        type: 'number',
      },
      {
        field: 'vendor',
        headerName: 'Vendor',
        flex: 1,
        minWidth: 140,
      },
      {
        field: 'table',
        headerName: 'Table',
        width: 100,
      },
      {
        field: 'payment',
        headerName: 'Payment',
        width: 110,
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 130,
        renderCell: (params) => (
          <Chip
            label={params.value}
            color={statusColors[params.value] || 'default'}
            size="small"
            variant="outlined"
          />
        ),
      },
    ],
    [],
  );

  const selectedDateText = selectedDate
    ? `${selectedDate.day} ${months[selectedDate.month]} ${selectedDate.year}`
    : '';

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setShowDetails(true);
  };

  const handleBackToCalendar = () => {
    setShowDetails(false);
  };

  if (showDetails && selectedDate) {
    return (
      <BookingDetailsView
  selectedDate={selectedDate}
  selectedDateText={selectedDateText}
  reservations={dailyReservations}
  columns={columns}
  totalGuests={totalGuests}
  confirmedBookings={confirmedBookings}
  pendingBookings={pendingBookings}
  onBack={handleBackToCalendar}
/>
    );
  }

  return (
    <BookingCalendarView
      year={year}
      selectedDate={selectedDate}
      bookingStats={bookingStats}
      onPreviousYear={() => setYear((currentYear) => currentYear - 1)}
      onNextYear={() => setYear((currentYear) => currentYear + 1)}
      onSelectDate={handleSelectDate}
    />
  );
}