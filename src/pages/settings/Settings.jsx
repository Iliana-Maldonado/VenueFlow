import PlaceholderPage from '../../components/PlaceholderPage';

const settingsItems = [
  {
    title: 'Venue Information',
    description: 'Update venue name, address and contact details.',
    status: 'Configured',
    color: 'success',
  },
  {
    title: 'Booking Preferences',
    description: 'Manage booking limits, table durations and capacity.',
    status: 'Active',
    color: 'success',
  },
  {
    title: 'Notifications',
    description: 'Configure booking and check-in notifications.',
    status: 'Enabled',
    color: 'info',
  },
  {
    title: 'User Management',
    description: 'Manage staff accounts and permissions.',
    status: '3 users',
    color: 'default',
  },
];

export default function Settings() {
  return (
    <PlaceholderPage
      title="Settings"
      description="Configure VenueFlow preferences and account options."
      items={settingsItems}
    />
  );
}