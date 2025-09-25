import React, { useState, useEffect } from 'react';
import AlertsTable from '../components/AlertsTable';
import { alerts } from '../api';

const AlertsPage = () => {
  const [allAlerts, setAllAlerts] = useState([]);
  const [filterResolved, setFilterResolved] = useState('all'); // 'all', 'resolved', 'unresolved'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAlerts = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (filterResolved === 'resolved') {
        params.resolved = true;
      } else if (filterResolved === 'unresolved') {
        params.resolved = false;
      }
      const response = await alerts.getAlerts(params);
      setAllAlerts(response.data.sort((a,b) => new Date(b.created_at) - new Date(a.created_at)));
    } catch (err) {
      setError('Failed to fetch alerts.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, [filterResolved]);

  const handleResolveToggle = async (id, resolvedStatus) => {
    try {
      await alerts.resolveAlert(id, resolvedStatus);
      setAllAlerts(prevAlerts =>
        prevAlerts.map(alert =>
          alert.id === id ? { ...alert, resolved: resolvedStatus } : alert
        )
      );
    } catch (err) {
      alert('Failed to update alert status.');
      console.error(err);
    }
  };

  if (loading) return <div className="text-center p-4">Loading alerts...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-100">Alerts</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4">
        <label htmlFor="filter-resolved" className="block text-sm font-medium text-gray-300">
          Filter by Status:
        </label>
        <select
          id="filter-resolved"
          className="mt-1 block w-48 py-2 px-3 border border-gray-600 bg-gray-700 text-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={filterResolved}
          onChange={(e) => setFilterResolved(e.target.value)}
        >
          <option value="all">All</option>
          <option value="unresolved">Unresolved</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      <AlertsTable alerts={allAlerts} onResolveToggle={handleResolveToggle} />
    </div>
  );
};

export default AlertsPage;