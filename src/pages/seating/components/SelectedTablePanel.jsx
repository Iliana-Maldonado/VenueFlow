import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EventSeatRoundedIcon from '@mui/icons-material/EventSeatRounded';
import SwapHorizRoundedIcon from '@mui/icons-material/SwapHorizRounded';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const statusLabels = {
  available: 'Available',
  reserved: 'Reserved',
  occupied: 'Occupied',
  selected: 'Selected',
  'out-of-service': 'Out of service',
};

const statusChipColors = {
  available: {
    backgroundColor: '#E8F5E9',
    color: '#1B5E20',
  },
  reserved: {
    backgroundColor: '#FFF7E6',
    color: '#B45309',
  },
  occupied: {
    backgroundColor: '#FEECEC',
    color: '#B91C1C',
  },
  selected: {
    backgroundColor: '#F3E8FF',
    color: '#6D28D9',
  },
  'out-of-service': {
    backgroundColor: '#F3F4F6',
    color: '#6B7280',
  },
};

export default function SelectedTablePanel({
  selectedTable,
  selectedVenueName,
  canAssignBooking,
  canChangeBooking,
  canRemoveBooking,
  canMoveTable,
  isOccupied,
  isOutOfService,
  onOpenAssignDialog,
  onOpenMoveDialog,
  onOpenStatusDialog,
  onRemoveBooking,
}) {
  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
      }}
    >
      {selectedTable ? (
        <>
          <Box
            sx={{
              px: 2.5,
              py: 2,
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 700 }}
            >
              Table {selectedTable.id}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {selectedVenueName}
            </Typography>
          </Box>

          <Stack
            spacing={2}
            sx={{ p: 2.5 }}
          >
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Status
              </Typography>

              <Box sx={{ mt: 0.7 }}>
                <Chip
                  size="small"
                  label={
                    statusLabels[selectedTable.status] ??
                    selectedTable.status
                  }
                  sx={
                    statusChipColors[selectedTable.status] ??
                    statusChipColors.available
                  }
                />
              </Box>
            </Box>

            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Table type
              </Typography>

              <Typography
                sx={{
                  mt: 0.3,
                  fontWeight: 600,
                  textTransform: 'capitalize',
                }}
              >
                {selectedTable.type}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Guests
              </Typography>

              <Typography
                sx={{
                  mt: 0.3,
                  fontWeight: 600,
                }}
              >
                {selectedTable.guests} / {selectedTable.seats}
              </Typography>
            </Box>

            {selectedTable.reservation && (
              <>
                <Divider />

                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    Reservation
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.3,
                      fontWeight: 700,
                    }}
                  >
                    {selectedTable.reservation.customer}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {selectedTable.reservation.time}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    Vendor
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.3,
                      fontWeight: 600,
                    }}
                  >
                    {selectedTable.reservation.vendor}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    Booking reference
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.3,
                      fontWeight: 600,
                    }}
                  >
                    #{selectedTable.reservation.id}
                  </Typography>
                </Box>
              </>
            )}

            {canAssignBooking && (
              <Button
                variant="contained"
                fullWidth
                onClick={onOpenAssignDialog}
                sx={{
                  mt: 1,
                  textTransform: 'none',
                  fontWeight: 700,
                }}
              >
                Assign Booking
              </Button>
            )}

            {canChangeBooking && (
              <Button
                variant="contained"
                fullWidth
                onClick={onOpenAssignDialog}
                sx={{
                  mt: 1,
                  textTransform: 'none',
                  fontWeight: 700,
                }}
              >
                Change Booking
              </Button>
            )}

            {canMoveTable && (
              <Button
                variant="outlined"
                fullWidth
                startIcon={<SwapHorizRoundedIcon />}
                onClick={onOpenMoveDialog}
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                Move Table
              </Button>
            )}

            {canRemoveBooking && (
              <Button
                variant="outlined"
                color="error"
                fullWidth
                startIcon={<DeleteOutlineRoundedIcon />}
                onClick={onRemoveBooking}
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                Remove Booking
              </Button>
            )}

            {isOccupied && (
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: 'action.hover',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700 }}
                >
                  Table currently occupied
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  Booking changes are disabled while guests are
                  seated. The booking can still be moved to another
                  available table.
                </Typography>
              </Paper>
            )}

            {isOutOfService && (
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: 'action.hover',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700 }}
                >
                  Table unavailable
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  Change the table status before assigning a booking.
                </Typography>
              </Paper>
            )}

            <Button
  variant="outlined"
  fullWidth
  onClick={onOpenStatusDialog}
  sx={{
    textTransform: 'none',
    fontWeight: 600,
  }}
>
  Change Status
</Button>
          </Stack>
        </>
      ) : (
        <Stack
          spacing={1.5}
          alignItems="center"
          justifyContent="center"
          sx={{
            minHeight: 280,
            p: 3,
            textAlign: 'center',
            color: 'text.secondary',
          }}
        >
          <EventSeatRoundedIcon
            sx={{
              fontSize: 42,
              opacity: 0.45,
            }}
          />

          <Typography
            variant="subtitle1"
            sx={{
              color: 'text.primary',
              fontWeight: 700,
            }}
          >
            Select a table
          </Typography>

          <Typography variant="body2">
            Click a table on the layout to view its details.
          </Typography>
        </Stack>
      )}
    </Paper>
  );
}