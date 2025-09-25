import React, { useState, useEffect } from 'react';
import PlaybookModal from '../components/PlaybookModal';
import { playbooks } from '../api';

const PlaybooksPage = () => {
  const [allPlaybooks, setAllPlaybooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPlaybooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await playbooks.getPlaybooks();
      setAllPlaybooks(response.data);
    } catch (err) {
      setError('Failed to fetch playbooks.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaybooks();
  }, []);

  const handleCreatePlaybook = async (newPlaybookData) => {
    try {
      await playbooks.createPlaybook(newPlaybookData);
      fetchPlaybooks(); // Refresh the list
    } catch (err) {
      alert('Failed to create playbook.');
      console.error(err);
    }
  };

  const handleApplyPlaybook = async (playbookId) => {
    try {
      await playbooks.applyPlaybook(playbookId);
      alert('Playbook applied (dummy action)! Check console for details.');
      fetchPlaybooks(); // Refresh to update last_used timestamp
    } catch (err) {
      alert('Failed to apply playbook.');
      console.error(err);
    }
  };

  if (loading) return <div className="text-center p-4">Loading playbooks...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Playbooks</h1>

      <div className="flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create New Playbook
        </button>
      </div>

      <PlaybookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreatePlaybook}
      />

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Available Playbooks</h2>
        {allPlaybooks.length === 0 ? (
          <p className="text-gray-500">No playbooks found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trigger Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sentiment Threshold
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Template Text
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Used
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allPlaybooks.map((playbook) => (
                  <tr key={playbook.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{playbook.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{playbook.trigger_type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{playbook.sentiment_threshold}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{playbook.template_text}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {playbook.last_used ? new Date(playbook.last_used).toLocaleString() : 'Never'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleApplyPlaybook(playbook.id)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Apply (Dummy)
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaybooksPage;