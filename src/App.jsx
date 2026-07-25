import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Login from './pages/login/Login';

import Dashboard from './pages/dashboard/Dashboard';
import MainGrid from './pages/dashboard/components/MainGrid';

import Bookings from './pages/bookings/Bookings';
import Seating from './pages/seating/Seating';
import CheckIn from './pages/check-in/CheckIn';
import Customers from './pages/customers/Customers';
import Reports from './pages/reports/Reports';
import Restaurant from './pages/restaurant/Restaurant';
import Settings from './pages/settings/Settings';

import { isLoggedIn } from './services/auth';

function ProtectedRoute({ children }) {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<MainGrid />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="seating" element={<Seating />} />
          <Route path="check-in" element={<CheckIn />} />
          <Route path="customers" element={<Customers />} />
          <Route path="reports" element={<Reports />} />
          <Route path="restaurant" element={<Restaurant />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}