export const TABLE_STATUS = {
  AVAILABLE: 'available',
  RESERVED: 'reserved',
  OCCUPIED: 'occupied',
  SELECTED: 'selected',
  OUT_OF_SERVICE: 'out-of-service',
};

export const tableStatusStyles = {
  available: {
    border: '#2E7D32',
    background: '#E8F5E9',
    text: '#1B5E20',
  },
  reserved: {
    border: '#F59E0B',
    background: '#FFF7E6',
    text: '#B45309',
  },
  occupied: {
    border: '#EF4444',
    background: '#FEECEC',
    text: '#B91C1C',
  },
  selected: {
    border: '#8B5CF6',
    background: '#F3E8FF',
    text: '#6D28D9',
  },
  'out-of-service': {
    border: '#9CA3AF',
    background: '#F3F4F6',
    text: '#6B7280',
  },
};