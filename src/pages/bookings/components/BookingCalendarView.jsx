import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import InputAdornment from '@mui/material/InputAdornment';

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

import MonthCalendar from './MonthCalendar';

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

export default function BookingCalendarView({
  year,
  selectedDate,
  bookingStats,
  onPreviousYear,
  onNextYear,
  onSelectDate,
}) {
  const selectedDateText = selectedDate
    ? `${selectedDate.day} ${months[selectedDate.month]} ${selectedDate.year}`
    : 'No date selected';

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: {
            xs: 'flex-start',
            md: 'center',
          },
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" component="h1" fontWeight={700}>
            Bookings Calendar
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            View yearly availability and select a date to manage bookings.
          </Typography>
        </Box>

        <TextField
          size="small"
          placeholder="Search booking..."
          sx={{
            width: {
              xs: '100%',
              md: 280,
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

      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent
          sx={{
            display: 'flex',
            alignItems: {
              xs: 'flex-start',
              md: 'center',
            },
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
            gap: 2,
            '&:last-child': {
              pb: 2,
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <IconButton
              onClick={onPreviousYear}
              aria-label="Previous year"
            >
              <ChevronLeftRoundedIcon />
            </IconButton>

            <Typography
              variant="h5"
              fontWeight={700}
              sx={{
                minWidth: 90,
                textAlign: 'center',
              }}
            >
              {year}
            </Typography>

            <IconButton
              onClick={onNextYear}
              aria-label="Next year"
            >
              <ChevronRightRoundedIcon />
            </IconButton>
          </Box>

          <Chip
            label={`Selected: ${selectedDateText}`}
            variant="outlined"
          />

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1.5,
            }}
          >
            <LegendItem label="Available" color="#8BEA52" />
            <LegendItem label="Medium" color="#F4D43C" />
            <LegendItem label="Busy" color="#FF5B61" />
            <LegendItem label="Selected" color="#111111" />
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={2}>
        {months.map((monthName, monthIndex) => (
          <Grid
            key={monthName}
            size={{
              xs: 12,
              sm: 6,
              lg: 4,
            }}
          >
            <Card
              variant="outlined"
              sx={{
                height: '100%',
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  textAlign="center"
                  fontWeight={700}
                  sx={{ mb: 2 }}
                >
                  {monthName}
                </Typography>

                <MonthCalendar
                  month={monthIndex}
                  year={year}
                  selectedDate={selectedDate}
                  onSelectDate={onSelectDate}
                  bookingStats={bookingStats}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

function LegendItem({ label, color }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.75,
      }}
    >
      <Box
        sx={{
          width: 12,
          height: 12,
          borderRadius: 0.75,
          backgroundColor: color,
        }}
      />

      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
    </Box>
  );
}