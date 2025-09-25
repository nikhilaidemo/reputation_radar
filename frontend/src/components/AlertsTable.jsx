import React from 'react';

const AlertsTable = ({ alerts, onResolveToggle }) => {
  return (
    <div className="overflow-x-auto bg-gray-800 rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-900">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Post ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Alert Type
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Severity
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Created At
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Resolved
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {alerts.map((alert) => (
            <tr key={alert.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{alert.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{alert.post_id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{alert.alert_type}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    alert.severity === 'High' ? 'bg-red-500 text-red-100' :
                    alert.severity === 'Critical' ? 'bg-purple-500 text-purple-100' :
                    'bg-yellow-500 text-yellow-100'
                  }`}
                >
                  {alert.severity}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {new Date(alert.created_at).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {alert.resolved ? 'Yes' : 'No'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => onResolveToggle(alert.id, !alert.resolved)}
                  className={`text-indigo-400 hover:text-indigo-300 ${alert.resolved ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={alert.resolved}
                >
                  {alert.resolved ? 'Resolved' : 'Resolve'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlertsTable;