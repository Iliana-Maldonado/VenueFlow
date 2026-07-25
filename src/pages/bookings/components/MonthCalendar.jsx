import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const monthNames = [
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

function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(month, year) {
  return new Date(year, month, 1).getDay();
}

function formatDateKey(day, month, year) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(
    day,
  ).padStart(2, '0')}`;
}

function getCapacityStatus(guestCount) {
  if (guestCount <= 100) return 'available';
  if (guestCount <= 220) return 'medium';

  return 'busy';
}

function getCapacityLabel(status) {
  if (status === 'available') return 'Available';
  if (status === 'medium') return 'Medium';

  return 'Busy';
}

const statusStyles = {
  available: {
    backgroundColor: '#8BEA52',
    color: '#173F3D',
    border: 1,
    borderColor: '#8BEA52',
  },
  medium: {
    backgroundColor: '#F4D43C',
    color: '#173F3D',
    border: 1,
    borderColor: '#F4D43C',
  },
  busy: {
    backgroundColor: '#FF5B61',
    color: '#173F3D',
    border: 1,
    borderColor: '#FF5B61',
  },
};

export default function MonthCalendar({
  month,
  year,
  selectedDate,
  onSelectDate,
  bookingStats = {},
}) {
  const totalDays = getDaysInMonth(month, year);
  const firstDay = getFirstDayOfMonth(month, year);

  const cells = [];

  for (let index = 0; index < firstDay; index += 1) {
    cells.push(null);
  }

  for (let day = 1; day <= totalDays; day += 1) {
    cells.push(day);
  }

  const isSelected = (day) =>
    selectedDate?.day === day &&
    selectedDate?.month === month &&
    selectedDate?.year === year;

  const isPastDate = (day) => {
    const today = new Date();
    const currentDate = new Date(year, month, day);

    today.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    return currentDate < today;
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 0.5,
          mb: 0.5,
        }}
      >
        {weekDays.map((weekDay) => (
          <Typography
            key={weekDay}
            variant="caption"
            color="text.secondary"
            textAlign="center"
          >
            {weekDay}
          </Typography>
        ))}
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 0.5,
        }}
      >
        {cells.map((day, index) => {
          if (!day) {
            return (
              <Box
                key={`empty-${index}`}
                sx={{ aspectRatio: '1 / 1' }}
              />
            );
          }

          const selected = isSelected(day);
          const past = isPastDate(day);
          const dateKey = formatDateKey(day, month, year);

          const dayStats = bookingStats[dateKey] || {
            bookings: 0,
            guests: 0,
          };

          const bookingCount = dayStats.bookings;
          const guestCount = dayStats.guests;
          const status = getCapacityStatus(guestCount);
          const capacityLabel = getCapacityLabel(status);

          const tooltipContent = (
            <Box sx={{ p: 0.5 }}>
              <Typography
                variant="subtitle2"
                fontWeight={700}
                sx={{ mb: 0.5 }}
              >
                {day} {monthNames[month]} {year}
              </Typography>

              <Typography variant="caption" display="block">
                Guests: {guestCount}
              </Typography>

              <Typography variant="caption" display="block">
                Bookings: {bookingCount}
              </Typography>

              <Typography variant="caption" display="block">
                Capacity: {capacityLabel}
              </Typography>
            </Box>
          );

          return (
            <Tooltip
              key={day}
              title={tooltipContent}
              arrow
              placement="top"
            >
              <Box
                component="button"
                type="button"
                onClick={() =>
                  onSelectDate({
                    day,
                    month,
                    year,
                  })
                }
                aria-label={`${dateKey}, ${bookingCount} bookings, ${guestCount} guests`}
                sx={{
                  borderRadius: 1.5,
                  aspectRatio: '1 / 1',
                  minWidth: 0,
                  p: 0.35,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 0.2,
                  transition:
                    'transform 0.15s ease, box-shadow 0.15s ease',

                  ...(past
                    ? {
                        backgroundColor: 'action.disabledBackground',
                        color: 'text.disabled',
                        border: 1,
                        borderColor: 'divider',
                      }
                    : statusStyles[status]),

                  ...(selected && {
                    backgroundColor: '#111111',
                    color: '#ffffff',
                    borderColor: '#111111',
                    boxShadow: 2,
                  }),

                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 1,
                  },
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  {day}
                </Typography>

                {guestCount > 0 && (
                  <Box
                    component="span"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.35,
                      fontSize: '0.56rem',
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        width: 4,
                        height: 4,
                        borderRadius: '50%',
                        backgroundColor: selected
                          ? '#ffffff'
                          : 'currentColor',
                      }}
                    />

                    {guestCount}
                  </Box>
                )}
              </Box>
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  );
}