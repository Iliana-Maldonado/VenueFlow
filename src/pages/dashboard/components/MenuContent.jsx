import { useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../../services/auth';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import EventSeatRoundedIcon from '@mui/icons-material/EventSeatRounded';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

const mainListItems = [
  {
    text: 'Dashboard',
    icon: <HomeRoundedIcon />,
    path: '/',
  },
  {
    text: 'Bookings',
    icon: <CalendarMonthRoundedIcon />,
    path: '/bookings',
  },
  {
    text: 'Seating',
    icon: <EventSeatRoundedIcon />,
    path: '/seating',
  },
  {
    text: 'Check-in',
    icon: <HowToRegRoundedIcon />,
    path: '/check-in',
  },
  {
    text: 'Customers',
    icon: <PeopleRoundedIcon />,
    path: '/customers',
  },
  {
    text: 'Reports',
    icon: <AssessmentRoundedIcon />,
    path: '/reports',
  },
];

const secondaryListItems = [
  {
    text: 'Restaurant',
    icon: <StorefrontRoundedIcon />,
    path: '/restaurant',
  },
  {
    text: 'Settings',
    icon: <SettingsRoundedIcon />,
    path: '/settings',
  },
];

export default function MenuContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Stack
      sx={{
        flexGrow: 1,
        p: 1,
        justifyContent: 'space-between',
      }}
    >
      <List dense>
        {mainListItems.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
            sx={{ display: 'block' }}
          >
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List dense>
        {secondaryListItems.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
            sx={{ display: 'block' }}
          >
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}

        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Stack>
  );
}