import { useMemo, useState } from 'react';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EventSeatRoundedIcon from '@mui/icons-material/EventSeatRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import SelectedTablePanel from './components/SelectedTablePanel';
import Table from '../../components/table/Table';
import { initialReservations } from '../../data/reservations';
import venueLayouts from '../../data/tables';

const venues = [
  {
    id: 'celtic',
    name: 'Celtic Nights',
  },
  {
    id: 'arlington',
    name: 'Arlington Bar',
  },
  {
    id: 'sinatras',
    name: "Sinatra's",
  },
];

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

const createInitialLayouts = () =>
  Object.fromEntries(
    Object.entries(venueLayouts).map(([venueId, tables]) => [
      venueId,
      tables.map((table) => ({
        ...table,
        reservation: table.reservation ?? null,
      })),
    ]),
  );

export default function Seating() {
  const [selectedVenue, setSelectedVenue] = useState('celtic');
  const [selectedTableId, setSelectedTableId] = useState(null);

  const [layouts, setLayouts] = useState(createInitialLayouts);

  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [moveDialogOpen, setMoveDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [selectedMoveTableId, setSelectedMoveTableId] =
  useState(null);
  const [reservationSearch, setReservationSearch] = useState('');
  const [selectedReservationId, setSelectedReservationId] = useState(null);

  const currentTables = layouts[selectedVenue] ?? [];

  const selectedTable = useMemo(
    () =>
      currentTables.find((table) => table.id === selectedTableId) ?? null,
    [currentTables, selectedTableId],
  );

  const tableStatus = selectedTable?.status;

const isAvailable = tableStatus === 'available';
const isReserved = tableStatus === 'reserved';
const isOccupied = tableStatus === 'occupied';
const isOutOfService = tableStatus === 'out-of-service';

const hasReservation = Boolean(selectedTable?.reservation);

const canAssignBooking = isAvailable;

const canChangeBooking =
  isReserved && hasReservation;

const canRemoveBooking =
  isReserved && hasReservation;

const canMoveTable =
  (isReserved || isOccupied) && hasReservation;

  const selectedReservation = useMemo(
    () =>
      initialReservations.find(
        (reservation) => reservation.id === selectedReservationId,
      ) ?? null,
    [selectedReservationId],
  );

  const tableCounts = useMemo(
    () =>
      currentTables.reduce(
        (counts, table) => {
          if (Object.hasOwn(counts, table.status)) {
            counts[table.status] += 1;
          }

          return counts;
        },
        {
          available: 0,
          reserved: 0,
          occupied: 0,
        },
      ),
    [currentTables],
  );

  const assignedReservationIds = useMemo(() => {
    const assignedIds = Object.values(layouts)
      .flat()
      .map((table) => table.reservation?.id)
      .filter((reservationId) => reservationId !== undefined);

    return new Set(assignedIds);
  }, [layouts]);

  const filteredReservations = useMemo(() => {
    const normalisedSearch = reservationSearch.trim().toLowerCase();
    const currentReservationId = selectedTable?.reservation?.id ?? null;

    return initialReservations
      .filter((reservation) => reservation.status !== 'Canceled')
      .filter((reservation) => {
        const isCurrentReservation =
          reservation.id === currentReservationId;

        const isAssignedElsewhere =
          assignedReservationIds.has(reservation.id) &&
          !isCurrentReservation;

        return !isAssignedElsewhere;
      })
      .filter((reservation) => {
        if (!selectedTable) {
          return true;
        }

        return reservation.guests <= selectedTable.seats;
      })
      .filter((reservation) => {
        if (!normalisedSearch) {
          return true;
        }

        return (
          reservation.customer.toLowerCase().includes(normalisedSearch) ||
          reservation.vendor.toLowerCase().includes(normalisedSearch) ||
          reservation.time.toLowerCase().includes(normalisedSearch) ||
          String(reservation.id).includes(normalisedSearch)
        );
      });
  }, [
    reservationSearch,
    selectedTable,
    assignedReservationIds,
  ]);

  const selectedVenueName =
    venues.find((venue) => venue.id === selectedVenue)?.name ?? 'Venue';

  const handleVenueChange = (event) => {
    setSelectedVenue(event.target.value);
    setSelectedTableId(null);
    setAssignDialogOpen(false);
    setReservationSearch('');
    setSelectedReservationId(null);
  };

  const handleTableSelect = (tableId) => {
    setSelectedTableId((currentId) =>
      currentId === tableId ? null : tableId,
    );
  };

  const handleOpenAssignDialog = () => {
    if (!selectedTable) {
      return;
    }

    setReservationSearch('');
    setSelectedReservationId(selectedTable.reservation?.id ?? null);
    setAssignDialogOpen(true);
  };

const handleCloseAssignDialog = () => {
  setAssignDialogOpen(false);
  setReservationSearch('');
  setSelectedReservationId(null);
};

const handleOpenMoveDialog = () => {
  if (!selectedTable) {
    return;
  }

  setMoveDialogOpen(true);
};

const handleOpenStatusDialog = () => {
  if (!selectedTable) {
    return;
  }

  setStatusDialogOpen(true);
};

const handleCloseStatusDialog = () => {
  setStatusDialogOpen(false);
};

const handleChangeStatus = (newStatus) => {
  if (!selectedTable) {
    return;
  }

  setLayouts((currentLayouts) => ({
    ...currentLayouts,
    [selectedVenue]: (currentLayouts[selectedVenue] ?? []).map((table) =>
      table.id === selectedTable.id
        ? {
            ...table,
            status: newStatus,
          }
        : table
    ),
  }));

  setStatusDialogOpen(false);
};

const handleSelectStatus = (newStatus) => {
  handleChangeStatus(newStatus);
  handleCloseStatusDialog();
};

const handleCloseMoveDialog = () => {
  setMoveDialogOpen(false);
  setSelectedMoveTableId(null);
};

  const handleAssignBooking = () => {
    if (!selectedTable || !selectedReservation) {
      return;
    }

    const assignedReservation = {
      ...selectedReservation,
      table: `Table ${selectedTable.id}`,
    };

    setLayouts((currentLayouts) => ({
      ...currentLayouts,
      [selectedVenue]: (currentLayouts[selectedVenue] ?? []).map((table) =>
        table.id === selectedTable.id
          ? {
              ...table,
              status: 'reserved',
              guests: selectedReservation.guests,
              reservation: assignedReservation,
            }
          : table,
      ),
    }));

    handleCloseAssignDialog();
  };

  const handleMoveTable = () => {
  if (
    !selectedTable ||
    !selectedTable.reservation ||
    selectedMoveTableId === null
  ) {
    return;
  }

  const previousTableId = selectedTable.id;
  const previousStatus = selectedTable.status;

  const movedReservation = {
    ...selectedTable.reservation,
    table: `Table ${selectedMoveTableId}`,
  };

  setLayouts((currentLayouts) => ({
    ...currentLayouts,
    [selectedVenue]: (currentLayouts[selectedVenue] ?? []).map((table) => {
      if (table.id === previousTableId) {
        return {
          ...table,
          status: 'available',
          guests: 0,
          reservation: null,
        };
      }

      if (table.id === selectedMoveTableId) {
        return {
          ...table,
          status: previousStatus,
          guests: selectedTable.guests,
          reservation: movedReservation,
        };
      }

      return table;
    }),
  }));

  setSelectedTableId(selectedMoveTableId);
  setSelectedMoveTableId(null);
  handleCloseMoveDialog();
};

  const handleRemoveBooking = () => {
    if (!selectedTable?.reservation) {
      return;
    }

    setLayouts((currentLayouts) => ({
      ...currentLayouts,
      [selectedVenue]: (currentLayouts[selectedVenue] ?? []).map((table) =>
        table.id === selectedTable.id
          ? {
              ...table,
              status: 'available',
              guests: 0,
              reservation: null,
            }
          : table,
      ),
    }));
  };

  return (
    <Box
      sx={{
        width: '100%',
        minWidth: 0,
      }}
    >
      {/* Page heading */}
      <Stack
        direction={{
          xs: 'column',
          md: 'row',
        }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{
          xs: 'stretch',
          md: 'center',
        }}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography
            component="h1"
            variant="h4"
            sx={{
              fontWeight: 700,
              letterSpacing: '-0.03em',
            }}
          >
            Seating
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            Manage venue layouts and table assignments.
          </Typography>
        </Box>

        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
          spacing={1.5}
        >
          <FormControl
            size="small"
            sx={{
              minWidth: 210,
            }}
          >
            <Select
              value={selectedVenue}
              onChange={handleVenueChange}
              aria-label="Select venue"
            >
              {venues.map((venue) => (
                <MenuItem
                  key={venue.id}
                  value={venue.id}
                >
                  {venue.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            startIcon={<AddRoundedIcon />}
            onClick={() => {
              console.log('Add venue');
            }}
            sx={{
              whiteSpace: 'nowrap',
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Add Venue
          </Button>
        </Stack>
      </Stack>

      {/* Main seating workspace */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            lg: 'minmax(0, 1fr) 300px',
          },
          gap: 2,
          alignItems: 'start',
        }}
      >
        {/* Seating map */}
        <Paper
          variant="outlined"
          sx={{
            minWidth: 0,
            overflow: 'hidden',
            borderRadius: 3,
          }}
        >
          <Stack
            direction={{
              xs: 'column',
              sm: 'row',
            }}
            spacing={1}
            justifyContent="space-between"
            alignItems={{
              xs: 'flex-start',
              sm: 'center',
            }}
            sx={{
              px: 2.5,
              py: 2,
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700 }}
              >
                {selectedVenueName}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                {currentTables.length}{' '}
                {currentTables.length === 1 ? 'table' : 'tables'}
              </Typography>
            </Box>

            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              useFlexGap
            >
              <Chip
                size="small"
                label={`Available ${tableCounts.available}`}
                sx={statusChipColors.available}
              />

              <Chip
                size="small"
                label={`Reserved ${tableCounts.reserved}`}
                sx={statusChipColors.reserved}
              />

              <Chip
                size="small"
                label={`Occupied ${tableCounts.occupied}`}
                sx={statusChipColors.occupied}
              />
            </Stack>
          </Stack>

          <Box
            sx={{
              overflow: 'auto',
              backgroundColor: 'grey.50',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: 900,
                height: 500,
                minWidth: 900,
                backgroundImage: `
                  linear-gradient(to right, rgba(148, 163, 184, 0.15) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(148, 163, 184, 0.15) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
              }}
            >
              {currentTables.length === 0 ? (
                <Stack
                  spacing={1.5}
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    color: 'text.secondary',
                  }}
                >
                  <EventSeatRoundedIcon
                    sx={{
                      fontSize: 48,
                      opacity: 0.45,
                    }}
                  />

                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600 }}
                  >
                    No tables added yet
                  </Typography>

                  <Typography variant="body2">
                    This venue layout is ready to be configured.
                  </Typography>
                </Stack>
              ) : (
                currentTables.map((table) => (
                  <Box
                    key={table.id}
                    sx={{
                      position: 'absolute',
                      left: table.x,
                      top: table.y,
                    }}
                  >
                    <Table
                      id={table.id}
                      type={table.type}
                      seats={table.seats}
                      guests={table.guests}
                      status={table.status}
                      rotation={table.rotation}
                      selected={selectedTableId === table.id}
                      onClick={() => handleTableSelect(table.id)}
                    />
                  </Box>
                ))
              )}
            </Box>
          </Box>
        </Paper>

        {/* Selected table panel */}
<SelectedTablePanel
  selectedTable={selectedTable}
  selectedVenueName={selectedVenueName}
  canAssignBooking={canAssignBooking}
  canChangeBooking={canChangeBooking}
  canRemoveBooking={canRemoveBooking}
  canMoveTable={canMoveTable}
  isOccupied={isOccupied}
  isOutOfService={isOutOfService}
  onOpenAssignDialog={handleOpenAssignDialog}
  onOpenMoveDialog={handleOpenMoveDialog}
  onOpenStatusDialog={handleOpenStatusDialog}
  onRemoveBooking={handleRemoveBooking}
/>
      </Box>

      <Dialog
  open={moveDialogOpen}
  onClose={handleCloseMoveDialog}
  fullWidth
  maxWidth="sm"
>
  <DialogTitle>Move Table</DialogTitle>

  <DialogContent dividers>
  <Typography sx={{ mb: 2 }}>
    Move booking from Table {selectedTable?.id} to another available table.
  </Typography>

  {currentTables
    .filter(
      (table) =>
        table.status === 'available' &&
        table.seats >= (selectedTable?.guests ?? 0),
    )
    .map((table) => (
      <Button
  key={table.id}
  variant={
    selectedMoveTableId === table.id
      ? 'contained'
      : 'outlined'
  }
  fullWidth
  onClick={() => setSelectedMoveTableId(table.id)}
  sx={{
    mb: 1,
    justifyContent: 'space-between',
    textTransform: 'none',
  }}
>
  Table {table.id}
  <span>{table.seats} seats</span>
</Button>
    ))}
</DialogContent>

  <DialogActions>
  <Button
    onClick={handleCloseMoveDialog}
    sx={{ textTransform: 'none' }}
  >
    Cancel
  </Button>

  <Button
  variant="contained"
  disabled={selectedMoveTableId === null}
  onClick={handleMoveTable}
  sx={{
    textTransform: 'none',
    fontWeight: 600,
  }}
>
  Move
</Button>
</DialogActions>
</Dialog>

      {/* Assign booking dialog */}
      <Dialog
        open={assignDialogOpen}
        onClose={handleCloseAssignDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {selectedTable?.reservation
            ? 'Change Booking'
            : 'Assign Booking'}

          {selectedTable && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              Table {selectedTable.id} · Capacity {selectedTable.seats}
            </Typography>
          )}
        </DialogTitle>

        <DialogContent dividers>
          <TextField
            fullWidth
            size="small"
            placeholder="Search by customer, vendor, time or booking ID"
            value={reservationSearch}
            onChange={(event) => setReservationSearch(event.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon />
                  </InputAdornment>
                ),
              },
            }}
            sx={{ mb: 2 }}
          />

          {filteredReservations.length > 0 ? (
            <List disablePadding>
              {filteredReservations.map((reservation, index) => {
                const isSelected =
                  selectedReservationId === reservation.id;

                return (
                  <Box key={reservation.id}>
                    <ListItemButton
                      selected={isSelected}
                      onClick={() =>
                        setSelectedReservationId(reservation.id)
                      }
                      sx={{
                        borderRadius: 2,
                        alignItems: 'flex-start',
                        py: 1.5,
                      }}
                    >
                      <ListItemText
                        primary={
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={2}
                          >
                            <Typography
                              sx={{
                                fontWeight: 700,
                              }}
                            >
                              {reservation.customer}
                            </Typography>

                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 600,
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {reservation.time}
                            </Typography>
                          </Stack>
                        }
                        secondary={
                          <Stack
                            spacing={0.5}
                            sx={{ mt: 0.7 }}
                          >
                            <Typography
                              variant="body2"
                              color="text.secondary"
                            >
                              {reservation.guests}{' '}
                              {reservation.guests === 1
                                ? 'guest'
                                : 'guests'}{' '}
                              · {reservation.vendor}
                            </Typography>

                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              #{reservation.id} · {reservation.status} ·{' '}
                              {reservation.table}
                            </Typography>
                          </Stack>
                        }
                      />
                    </ListItemButton>

                    {index < filteredReservations.length - 1 && (
                      <Divider sx={{ my: 0.5 }} />
                    )}
                  </Box>
                );
              })}
            </List>
          ) : (
            <Stack
              spacing={1}
              alignItems="center"
              sx={{
                py: 5,
                textAlign: 'center',
              }}
            >
              <EventSeatRoundedIcon
                sx={{
                  fontSize: 42,
                  color: 'text.secondary',
                  opacity: 0.5,
                }}
              />

              <Typography sx={{ fontWeight: 700 }}>
                No suitable bookings found
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Try another search or select a table with more capacity.
              </Typography>
            </Stack>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={handleCloseAssignDialog}
            sx={{
              textTransform: 'none',
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            disabled={!selectedReservation}
            onClick={handleAssignBooking}
            sx={{
              textTransform: 'none',
              fontWeight: 700,
            }}
          >
            {selectedTable?.reservation ? 'Save Change' : 'Assign'}
          </Button>
        </DialogActions>
            </Dialog>

      <Dialog
        open={statusDialogOpen}
        onClose={handleCloseStatusDialog}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Change Table Status</DialogTitle>

<DialogContent>
  <Stack spacing={1.5} sx={{ mt: 1 }}>
    <Button
      variant="outlined"
      onClick={() => handleChangeStatus('available')}
      sx={{ textTransform: 'none' }}
    >
      Available
    </Button>

    <Button
      variant="outlined"
      onClick={() => handleChangeStatus('reserved')}
      sx={{ textTransform: 'none' }}
    >
      Reserved
    </Button>

    <Button
      variant="outlined"
      onClick={() => handleChangeStatus('occupied')}
      sx={{ textTransform: 'none' }}
    >
      Occupied
    </Button>

    <Button
      variant="outlined"
      onClick={() => handleChangeStatus('out-of-service')}
      sx={{ textTransform: 'none' }}
    >
      Out of Service
    </Button>
  </Stack>
</DialogContent>

<DialogActions>
          <Button
            onClick={handleCloseStatusDialog}
            sx={{ textTransform: 'none' }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}