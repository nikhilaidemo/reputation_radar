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

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="glass rounded-xl p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
        <p className="text-dark-300">Loading dashboard insights...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="flex items-center justify-center h-64">
      <div className="glass rounded-xl p-8 text-center border-danger-500/20">
        <div className="w-12 h-12 bg-danger-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-danger-400 text-xl">⚠</span>
        </div>
        <p className="text-danger-400 font-medium">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold gradient-text">Dashboard</h1>
          <p className="text-dark-400 mt-2">Real-time insights into your brand's reputation</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary text-sm">
            <span className="mr-2">📊</span> Export Report
          </button>
          <button className="btn-primary text-sm">
            <span className="mr-2">🔄</span> Refresh Data
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-400 text-sm font-medium">Total Mentions</p>
              <p className="text-3xl font-bold text-white mt-1">2,847</p>
              <p className="text-success-400 text-sm mt-2">↗ 12% vs last week</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <span className="text-white text-xl">📈</span>
            </div>
          </div>
        </div>

        <div className="card group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-400 text-sm font-medium">Sentiment Score</p>
              <p className="text-3xl font-bold text-white mt-1">7.8/10</p>
              <p className="text-success-400 text-sm mt-2">↗ 0.3 improvement</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-success-500 to-success-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <span className="text-white text-xl">😊</span>
            </div>
          </div>
        </div>

        <div className="card group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-400 text-sm font-medium">Active Alerts</p>
              <p className="text-3xl font-bold text-white mt-1">{recentAlerts.length}</p>
              <p className="text-warning-400 text-sm mt-2">↓ 5 resolved today</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-warning-500 to-warning-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <span className="text-white text-xl">🚨</span>
            </div>
          </div>
        </div>

        <div className="card group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-400 text-sm font-medium">Response Time</p>
              <p className="text-3xl font-bold text-white mt-1">2.4h</p>
              <p className="text-success-400 text-sm mt-2">↗ 15% faster</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <span className="text-white text-xl">⚡</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sentiment Chart - Takes 2 columns */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Sentiment Distribution</h2>
            <div className="flex items-center space-x-2 text-sm text-dark-400">
              <span className="w-2 h-2 bg-success-500 rounded-full"></span>
              <span>Live Data</span>
            </div>
          </div>
          <SentimentChart title="" data={sentimentData} />
        </div>

        {/* Brand Health Index */}
        <div className="card">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white mb-6">Brand Health Index</h2>
            <div className="relative inline-flex items-center justify-center">
              <div className="w-32 h-32 bg-gradient-to-br from-success-500 to-success-600 rounded-full flex items-center justify-center shadow-glow">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">7.8</p>
                  <p className="text-sm text-success-100">out of 10</p>
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-dark-400">Positive Mentions</span>
                <span className="text-success-400 font-medium">68%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-dark-400">Neutral Mentions</span>
                <span className="text-dark-300 font-medium">24%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-dark-400">Negative Mentions</span>
                <span className="text-danger-400 font-medium">8%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Recent Alerts</h2>
          <button className="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors">
            View All →
          </button>
        </div>
        
        {recentAlerts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-dark-400 text-2xl">📋</span>
            </div>
            <p className="text-dark-400">No recent alerts to display</p>
            <p className="text-dark-500 text-sm mt-1">All systems are running smoothly</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentAlerts.map((alert, index) => (
              <div key={alert.id} className="flex items-center justify-between p-4 bg-dark-800/50 rounded-lg border border-dark-700 hover:border-dark-600 transition-all duration-200 animate-slide-up" style={{animationDelay: `${index * 100}ms`}}>
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    alert.severity === 'Critical' ? 'bg-danger-500/20 text-danger-400' :
                    alert.severity === 'High' ? 'bg-warning-500/20 text-warning-400' :
                    'bg-primary-500/20 text-primary-400'
                  }`}>
                    <span className="text-sm font-bold">
                      {alert.severity === 'Critical' ? '🚨' : alert.severity === 'High' ? '⚠️' : '📢'}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{alert.alert_type}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        alert.severity === 'Critical' ? 'bg-danger-500/20 text-danger-400' :
                        alert.severity === 'High' ? 'bg-warning-500/20 text-warning-400' :
                        'bg-primary-500/20 text-primary-400'
                      }`}>
                        {alert.severity}
                      </span>
                      <span className="text-xs text-dark-400">
                        {new Date(alert.created_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    alert.resolved 
                      ? 'bg-success-500/20 text-success-400 border border-success-500/30' 
                      : 'bg-danger-500/20 text-danger-400 border border-danger-500/30'
                  }`}>
                    {alert.resolved ? '✓ Resolved' : '⏳ Pending'}
                  </span>
                  <button className="text-dark-400 hover:text-white transition-colors">
                    <span className="text-lg">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Trending Keywords */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Trending Keywords</h2>
          <div className="flex items-center space-x-2 text-sm text-dark-400">
            <span className="w-2 h-2 bg-accent-500 rounded-full animate-pulse"></span>
            <span>Updated 5 min ago</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {[
            { word: 'Experience', size: 'text-3xl', color: 'text-primary-400', weight: 'font-bold' },
            { word: 'Product', size: 'text-2xl', color: 'text-accent-400', weight: 'font-semibold' },
            { word: 'Service', size: 'text-xl', color: 'text-success-400', weight: 'font-medium' },
            { word: 'Update', size: 'text-xl', color: 'text-warning-400', weight: 'font-semibold' },
            { word: 'Brand', size: 'text-2xl', color: 'text-primary-300', weight: 'font-medium' },
            { word: 'Launch', size: 'text-lg', color: 'text-accent-300', weight: 'font-medium' },
            { word: 'Feedback', size: 'text-base', color: 'text-dark-300', weight: 'font-normal' },
            { word: 'Bug', size: 'text-lg', color: 'text-danger-400', weight: 'font-medium' },
          ].map((keyword, index) => (
            <span
              key={keyword.word}
              className={`${keyword.size} ${keyword.color} ${keyword.weight} hover:scale-110 transition-all duration-200 cursor-pointer animate-fade-in`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {keyword.word}
            </span>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-dark-800/30 rounded-lg border border-dark-700">
          <p className="text-sm text-dark-400">
            Keywords are sized based on mention frequency and sentiment impact. 
            Click on any keyword to explore related conversations. ( Future enhancement )
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;