import PlaceholderPage from '../../components/PlaceholderPage';

const restaurantItems = [
  {
    title: 'Celtic Nights',
    description: 'Main venue · Capacity 320 guests',
    status: 'Open',
    color: 'success',
  },
  {
    title: 'Arlington Bar',
    description: 'Ground floor venue · Capacity 120 guests',
    status: 'Open',
    color: 'success',
  },
  {
    title: 'Dining Room',
    description: 'Private events area · Capacity 60 guests',
    status: 'Available',
    color: 'info',
  },
];

export default function Restaurant() {
  return (
    <PlaceholderPage
      title="Restaurant"
      description="Manage venue spaces, capacities and availability."
      items={restaurantItems}
    />
  );
}