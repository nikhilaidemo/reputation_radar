import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ChannelsPage from './pages/ChannelsPage';
import AlertsPage from './pages/AlertsPage';
import PlaybooksPage from './pages/PlaybooksPage';
import AdminPage from './pages/AdminPage';
import Layout from './components/Layout';
import { AuthProvider, useAuth } from './hooks/useAuth';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <p className="p-4 text-red-600">Access Denied: You do not have the necessary permissions.</p>; // Or redirect to a permission denied page
  }

  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute allowedRoles={['pr_manager', 'social_media_analyst', 'executive', 'admin']}>
                <Layout><DashboardPage /></Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/channels"
            element={
              <PrivateRoute allowedRoles={['pr_manager', 'social_media_analyst', 'admin']}>
                <Layout><ChannelsPage /></Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/alerts"
            element={
              <PrivateRoute allowedRoles={['pr_manager', 'social_media_analyst', 'admin']}>
                <Layout><AlertsPage /></Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/playbooks"
            element={
              <PrivateRoute allowedRoles={['pr_manager', 'admin']}>
                <Layout><PlaybooksPage /></Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <Layout><AdminPage /></Layout>
              </PrivateRoute>
            }
          />
          {/* Add a 404 Not Found page */}
          <Route path="*" element={<Layout><h1 className="text-2xl font-bold p-4">404 - Page Not Found</h1></Layout>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;