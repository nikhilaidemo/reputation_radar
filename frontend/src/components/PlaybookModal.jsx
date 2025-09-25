import React, { useState } from 'react';

const PlaybookModal = ({ isOpen, onClose, onSubmit }) => {
  const [triggerType, setTriggerType] = useState('');
  const [sentimentThreshold, setSentimentThreshold] = useState('');
  const [templateText, setTemplateText] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      trigger_type: triggerType,
      sentiment_threshold: parseFloat(sentimentThreshold),
      template_text: templateText,
    });
    setTriggerType('');
    setSentimentThreshold('');
    setTemplateText('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Create New Playbook</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="triggerType" className="block text-sm font-medium text-gray-700">Trigger Type</label>
            <input
              type="text"
              id="triggerType"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={triggerType}
              onChange={(e) => setTriggerType(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="sentimentThreshold" className="block text-sm font-medium text-gray-700">Sentiment Threshold</label>
            <input
              type="number"
              step="0.1"
              id="sentimentThreshold"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={sentimentThreshold}
              onChange={(e) => setSentimentThreshold(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="templateText" className="block text-sm font-medium text-gray-700">Template Text</label>
            <textarea
              id="templateText"
              rows="4"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={templateText}
              onChange={(e) => setTemplateText(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Playbook
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlaybookModal;