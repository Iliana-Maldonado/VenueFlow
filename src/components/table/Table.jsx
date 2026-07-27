import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { tableStatusStyles } from './TableStatus';

const tableSizes = {
  rectangle: {
    width: 190,
    height: 112,
    borderRadius: 3,
  },
  round: {
    width: 142,
    height: 142,
    borderRadius: '50%',
  },
  square: {
    width: 140,
    height: 140,
    borderRadius: 3,
  },
};

export default function Table({
  id,
  type = 'rectangle',
  seats = 4,
  guests = 0,
  status = 'available',
  rotation = 0,
  selected = false,
  onClick,
}) {
  const size = tableSizes[type] ?? tableSizes.rectangle;

  const visualStatus = selected ? 'selected' : status;
  const colors =
    tableStatusStyles[visualStatus] ?? tableStatusStyles.available;

  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      aria-label={`Table ${id}, ${guests} of ${seats} guests`}
      sx={{
        width: size.width,
        height: size.height,
        borderRadius: size.borderRadius,
        border: `2px solid ${colors.border}`,
        backgroundColor: colors.background,
        color: colors.text,
        p: 1.5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: onClick ? 'pointer' : 'default',
        transform: `rotate(${rotation}deg)`,
        transition:
          'transform 180ms ease, box-shadow 180ms ease, background-color 180ms ease',
        boxShadow: selected
          ? `0 0 0 4px ${colors.background}, 0 8px 24px ${colors.border}55`
          : '0 3px 10px rgba(15, 23, 42, 0.08)',

        '&:hover': onClick
          ? {
              transform: `rotate(${rotation}deg) scale(1.04)`,
              boxShadow: `0 10px 24px ${colors.border}40`,
            }
          : undefined,

        '&:focus-visible': {
          outline: `3px solid ${colors.border}`,
          outlineOffset: '4px',
        },
      }}
    >
      <Typography
        component="span"
        sx={{
          fontWeight: 700,
          fontSize: type === 'rectangle' ? '1rem' : '0.95rem',
          lineHeight: 1.1,
        }}
      >
        Table {id}
      </Typography>

      <Typography
        component="span"
        sx={{
          mt: 0.6,
          fontWeight: 600,
          fontSize: '0.82rem',
          lineHeight: 1,
        }}
      >
        {guests} / {seats}
      </Typography>
    </Box>
  );
}

Table.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  type: PropTypes.oneOf(['rectangle', 'round', 'square']),
  seats: PropTypes.number,
  guests: PropTypes.number,
  status: PropTypes.oneOf([
    'available',
    'reserved',
    'occupied',
    'selected',
    'out-of-service',
  ]),
  rotation: PropTypes.number,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};