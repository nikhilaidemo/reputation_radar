import React from 'react';

const SentimentChart = ({ title, data }) => {
  // This is a dummy chart component. In a real application, you would use a charting library
  // like Chart.js, Recharts, or Nivo.
  // The 'data' prop is expected to be an array of objects like { label: 'positive', value: 50 }

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {data.length === 0 ? (
        <p className="text-gray-500">No data available for sentiment analysis.</p>
      ) : (
        <div className="flex flex-col items-center">
          <div className="flex justify-center w-full my-4">
            {/* Simple bar representation */}
            {data.map((item, index) => (
              <div
                key={index}
                className="h-24 flex items-end justify-center text-xs text-white p-1"
                style={{
                  width: `${(item.value / total) * 100}%`,
                  backgroundColor:
                    item.label === 'positive' ? '#4CAF50' :
                    item.label === 'negative' ? '#F44336' :
                    '#FFC107',
                }}
                title={`${item.label}: ${item.value}`}
              >
                {Math.round((item.value / total) * 100)}%
              </div>
            ))}
          </div>
          <div className="flex justify-center w-full space-x-4 mt-4">
            {data.map((item, index) => (
              <div key={index} className="flex items-center">
                <span
                  className="w-4 h-4 rounded-full mr-2"
                  style={{
                    backgroundColor:
                      item.label === 'positive' ? '#4CAF50' :
                      item.label === 'negative' ? '#F44336' :
                      '#FFC107',
                  }}
                ></span>
                <span className="text-sm text-gray-700">{item.label} ({item.value})</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SentimentChart;