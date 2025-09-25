import React, { useState } from 'react';

const SourceManager = ({ sources, onSubmitSource, onDeleteSource }) => {
  const [newSourceName, setNewSourceName] = useState('');
  const [newSourceType, setNewSourceType] = useState('Twitter/X'); // Default type
  const [newSourceApiConfig, setNewSourceApiConfig] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const apiConfig = JSON.parse(newSourceApiConfig || '{}');
      onSubmitSource({
        name: newSourceName,
        type: newSourceType,
        api_config: apiConfig,
      });
      setNewSourceName('');
      setNewSourceType('Twitter/X');
      setNewSourceApiConfig('');
    } catch (error) {
      alert('Invalid JSON for API Config.');
      console.error('Error parsing API Config:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Manage Data Sources</h2>

      {/* Existing Sources */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Current Sources</h3>
        {sources.length === 0 ? (
          <p className="text-gray-500">No data sources registered.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {sources.map((source) => (
              <li key={source.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{source.name} ({source.type})</p>
                  <p className="text-xs text-gray-500">Active: {source.is_active ? 'Yes' : 'No'}</p>
                </div>
                {/* <button
                  onClick={() => onDeleteSource(source.id)}
                  className="ml-4 text-red-600 hover:text-red-900 text-sm"
                >
                  Delete (Dummy)
                </button> */}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add New Source Form */}
      <div>
        <h3 className="text-lg font-medium mb-2">Add New Source</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="sourceName" className="block text-sm font-medium text-gray-700">Source Name</label>
            <input
              type="text"
              id="sourceName"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={newSourceName}
              onChange={(e) => setNewSourceName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="sourceType" className="block text-sm font-medium text-gray-700">Source Type</label>
            <select
              id="sourceType"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={newSourceType}
              onChange={(e) => setNewSourceType(e.target.value)}
              required
            >
              <option value="Twitter/X">Twitter/X</option>
              <option value="Reddit">Reddit</option>
              <option value="Review Site">Review Site</option>
              <option value="News Feed">News Feed</option>
              {/* Add more types as needed */}
            </select>
          </div>
          <div>
            <label htmlFor="apiConfig" className="block text-sm font-medium text-gray-700">API Configuration (JSON)</label>
            <textarea
              id="apiConfig"
              rows="3"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder='{"consumer_key": "abc", "consumer_secret": "xyz"}'
              value={newSourceApiConfig}
              onChange={(e) => setNewSourceApiConfig(e.target.value)}
            ></textarea>
<p className="mt-1 text-xs text-gray-500">Enter API credentials as a JSON object (e.g., {`{api_key: "your_key"}`}).</p>
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Source
          </button>
        </form>
      </div>
    </div>
  );
};

export default SourceManager;