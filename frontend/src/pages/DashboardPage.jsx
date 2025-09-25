import React, { useState, useEffect } from 'react';
import SentimentChart from '../components/SentimentChart';
import { posts, alerts } from '../api';

const DashboardPage = () => {
  const [sentimentData, setSentimentData] = useState([]);
  const [recentAlerts, setRecentAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [postsRes, alertsRes] = await Promise.all([
          posts.getPosts(),
          alerts.getAlerts({ resolved: false }) // Fetch only unresolved alerts
        ]);

        // Process posts for sentiment chart
        const sentimentCounts = postsRes.data.reduce((acc, post) => {
          acc[post.sentiment_label] = (acc[post.sentiment_label] || 0) + 1;
          return acc;
        }, {});

        const processedSentimentData = Object.entries(sentimentCounts).map(([label, value]) => ({
          label,
          value,
        }));
        setSentimentData(processedSentimentData);

        // Filter and sort recent alerts (e.g., last 5)
        const sortedAlerts = alertsRes.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setRecentAlerts(sortedAlerts.slice(0, 5));

      } catch (err) {
        setError('Failed to fetch dashboard data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center p-4">Loading dashboard...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

      {/* Sentiment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SentimentChart title="Overall Sentiment Distribution" data={sentimentData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Brand Health Index (Dummy)</h2>
          <p className="text-4xl font-bold text-green-600">7.8/10</p>
          <p className="text-gray-600 mt-2">
            Based on recent sentiment trends. (This is a static dummy value)
          </p>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Alerts</h2>
        {recentAlerts.length === 0 ? (
          <p className="text-gray-500">No recent alerts.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {recentAlerts.map((alert) => (
              <li key={alert.id} className="py-3 flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {alert.alert_type} - Severity: <span className={
                      `font-bold ${alert.severity === 'High' ? 'text-red-600' :
                       alert.severity === 'Critical' ? 'text-purple-600' : 'text-yellow-600'}`
                    }>{alert.severity}</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Created: {new Date(alert.created_at).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    alert.resolved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {alert.resolved ? 'Resolved' : 'Unresolved'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Example Word Cloud (Placeholder) */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Top Keywords (Word Cloud Placeholder)</h2>
        <div className="flex flex-wrap gap-2 text-gray-700">
          <span className="text-2xl font-bold">Product</span>
          <span className="text-lg">Service</span>
          <span className="text-xl font-semibold">Update</span>
          <span className="text-md">Bug</span>
          <span className="text-3xl font-extrabold text-blue-600">Experience</span>
          <span className="text-base">Launch</span>
          <span className="text-sm">Feedback</span>
          <span className="text-2xl">Brand</span>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          (This is a static placeholder for a word cloud visualization.)
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;