import React, { useState, useEffect } from 'react';
import { posts, sources } from '../api';
import SentimentChart from '../components/SentimentChart';

const ChannelsPage = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [dataSources, setDataSources] = useState([]);
  const [selectedSourceId, setSelectedSourceId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [postsRes, sourcesRes] = await Promise.all([
          posts.getPosts(),
          sources.getSources()
        ]);
        setAllPosts(postsRes.data);
        setDataSources(sourcesRes.data);
        if (sourcesRes.data.length > 0) {
          setSelectedSourceId(sourcesRes.data[0].id);
        }
      } catch (err) {
        setError('Failed to fetch channel data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getSentimentDataForSource = (sourceId) => {
    const filteredPosts = allPosts.filter(post => post.source_id === sourceId);
    const sentimentCounts = filteredPosts.reduce((acc, post) => {
      acc[post.sentiment_label] = (acc[post.sentiment_label] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(sentimentCounts).map(([label, value]) => ({
      label,
      value,
    }));
  };

  const getPostsForSelectedSource = () => {
    return allPosts
      .filter(post => post.source_id === parseInt(selectedSourceId))
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  };

  if (loading) return <div className="text-center p-4">Loading channels data...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Channels View</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <label htmlFor="source-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select Channel:
        </label>
        <select
          id="source-select"
          className="mt-1 block w-full md:w-1/3 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={selectedSourceId}
          onChange={(e) => setSelectedSourceId(parseInt(e.target.value))}
        >
          {dataSources.map(source => (
            <option key={source.id} value={source.id}>
              {source.name} ({source.type})
            </option>
          ))}
        </select>
      </div>

      {selectedSourceId && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sentiment Chart for Selected Source */}
          <SentimentChart
            title={`Sentiment for ${dataSources.find(s => s.id === selectedSourceId)?.name || 'Selected Channel'}`}
            data={getSentimentDataForSource(selectedSourceId)}
          />

          {/* Top Posts for Selected Source */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              Top Posts from {dataSources.find(s => s.id === selectedSourceId)?.name || 'Selected Channel'}
            </h2>
            {getPostsForSelectedSource().length === 0 ? (
              <p className="text-gray-500">No posts found for this channel.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {getPostsForSelectedSource().map((post) => (
                  <li key={post.id} className="py-3">
                    <p className="text-sm text-gray-800">{post.content}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      By {post.author} on {new Date(post.timestamp).toLocaleString()} | Sentiment: {post.sentiment_label} ({post.sentiment_score})
                    </p>
                    {post.url && (
                      <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-600 hover:text-indigo-800">
                        Read more
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChannelsPage;