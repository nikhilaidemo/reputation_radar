import React, { useState, useEffect } from 'react';
import SourceManager from '../components/SourceManager';
import { sources, users } from '../api';

const AdminPage = () => {
  const [allSources, setAllSources] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAdminData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [sourcesRes, usersRes] = await Promise.all([
        sources.getSources(),
        users.getUsers(),
      ]);
      setAllSources(sourcesRes.data);
      setAllUsers(usersRes.data);
    } catch (err) {
      setError('Failed to fetch admin data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleAddSource = async (newSourceData) => {
    try {
      await sources.registerSource(newSourceData);
      fetchAdminData(); // Refresh list
    } catch (err) {
      alert('Failed to add source.');
      console.error(err);
    }
  };

  const handleCreateUser = async (newUserData) => {
    try {
      await users.createUser(newUserData);
      fetchAdminData();
      alert('User created successfully!');
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to create user.');
      console.error(err);
    }
  }

  // Dummy delete function for sources (not implemented in API for now)
  // const handleDeleteSource = (id) => {
  //   alert(`Deleting source with ID: ${id} (dummy action)`);
  //   setAllSources(prev => prev.filter(s => s.id !== id));
  // };

  if (loading) return <div className="text-center p-4">Loading admin data...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>

      {/* Source Management */}
      <SourceManager
        sources={allSources}
        onSubmitSource={handleAddSource}
        // onDeleteSource={handleDeleteSource}
      />

      {/* User Management */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
        {/* User List */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Current Users</h3>
          {allUsers.length === 0 ? (
            <p className="text-gray-500">No users found.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {allUsers.map((user) => (
                <li key={user.id} className="py-3">
                  <p className="text-sm font-medium text-gray-900">{user.email} - ({user.role})</p>
                  <p className="text-xs text-gray-500">Joined: {new Date(user.created_at).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Create New User Form */}
        <div>
          <h3 className="text-lg font-medium mb-2">Create New User</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            handleCreateUser({
              email: formData.get('email'),
              password: formData.get('password'),
              role: formData.get('role'),
            });
            e.target.reset(); // Clear form
          }} className="space-y-4">
            <div>
              <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="userEmail"
                name="email"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="userPassword" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="userPassword"
                name="password"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="userRole" className="block text-sm font-medium text-gray-700">Role</label>
              <select
                id="userRole"
                name="role"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="pr_manager">PR Manager</option>
                <option value="social_media_analyst">Social Media Analyst</option>
                <option value="executive">Executive</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;