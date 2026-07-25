import PlaceholderPage from '../../components/PlaceholderPage';

const reportItems = [
  {
    title: 'Tonight’s Attendance',
    description: '238 expected guests across 46 bookings.',
    status: '74%',
    color: 'info',
  },
  {
    title: 'Table Occupancy',
    description: '28 of 35 tables currently assigned.',
    status: '80%',
    color: 'success',
  },
  {
    title: 'No-show Rate',
    description: '3 no-shows recorded during the current week.',
    status: '4%',
    color: 'warning',
  },
  {
    title: 'Vendor Bookings',
    description: '12 bookings imported from external vendors.',
    status: '12',
    color: 'info',
  },
];

export default function Reports() {
  return (
    <PlaceholderPage
      title="Reports"
      description="Review venue performance and booking statistics."
      items={reportItems}
    />
  );
}