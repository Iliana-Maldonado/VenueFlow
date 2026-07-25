import PlaceholderPage from '../../components/PlaceholderPage';

const customerItems = [
  {
    title: 'Maria Martinez',
    description: 'maria@example.com · 3 previous bookings',
    status: 'Returning',
    color: 'success',
  },
  {
    title: 'Sarah Collins',
    description: 'sarah@example.com · 1 previous booking',
    status: 'New',
    color: 'info',
  },
  {
    title: 'Pedro Almeida',
    description: 'pedro@example.com · 5 previous bookings',
    status: 'Returning',
    color: 'success',
  },
  {
    title: 'John Murphy',
    description: 'john@example.com · 2 previous bookings',
    status: 'Returning',
    color: 'success',
  },
];

export default function Customers() {
  return (
    <PlaceholderPage
      title="Customers"
      description="View customer details and booking history."
      items={customerItems}
    />
  );
}