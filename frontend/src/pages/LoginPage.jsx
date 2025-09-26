import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ChartBarIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated, loading } = useAuth();

  // Redirect if already authenticated
  if (!loading && isAuthenticated) {
    navigate('/dashboard');
    return null; // Don't render the login form if already authenticated
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  const demoCredentials = [
    { email: 'pr_manager@example.com', role: 'PR Manager', icon: '👔' },
    { email: 'social_analyst@example.com', role: 'Social Media Analyst', icon: '📱' },
    { email: 'executive@example.com', role: 'Executive', icon: '👨‍💼' },
    { email: 'admin@example.com', role: 'Admin', icon: '⚙️' },
  ];

  const handleDemoLogin = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('password');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section: Visual Appeal */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary-500 to-accent-500 items-center justify-center relative">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/bgimage.png"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/20 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/20 rounded-full blur-2xl"></div>
        </div>
        <div className="relative z-10 text-center text-white">
          <img src="/logo.png" alt="Logo" className="mx-auto mb-4 w-80 h-80 object-contain" />
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">Reputation & Sentiment Radar</h1>
          <p className="text-lg drop-shadow-md">Your brand's reputation, monitored and managed.</p>
        </div>
      </div>

      {/* Right Section: Login Form */}
      <div className="flex-1 flex items-center justify-center bg-dark-900 py-12 px-6 lg:px-16">
        <div className="max-w-md w-full space-y-8">
          

          {/* Login Form */}
          <div className="glass-card space-y-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="relative">
                  <label htmlFor="email-address" className="block text-sm font-medium text-white mb-2">
                    Email Address
                  </label>
                  <div
                  className="absolute top-0 right-0 flex items-center justify-center w-6 h-6 group"
                  style={{ backgroundColor: '#d2aa2f', color: 'white', borderRadius: '50%', cursor: 'pointer' }}
                  onClick={() => setShowDemoAccounts(true)}
                >
                  !
                  <span className="absolute top-full right-0 mt-1 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    Click for Demo Accounts
                  </span>
                </div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="input-field w-full"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      className="input-field w-full pr-12"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-dark-400 hover:text-white transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-danger-500/20 border border-danger-500/30 rounded-lg animate-slide-up">
                  <p className="text-danger-400 text-sm text-center font-medium">{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="btn-primary w-full py-3 text-lg font-semibold group"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <span>Sign In</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </div>
                )}
              </button>
            </form>
          </div>

          {/* Demo Accounts Pop-up */}
          {showDemoAccounts && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className="bg-dark-800 p-6 rounded-lg shadow-lg space-y-4 relative">
                    <button
                      onClick={() => setShowDemoAccounts(false)}
                      className="absolute top-2 right-2 text-white hover:text-gray-400"
                    >
                      ✕
                    </button>
                    <h3 className="text-lg font-semibold text-white">Demo Accounts</h3>
                    <div className="space-y-3">
                      {demoCredentials.map((cred, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setEmail(cred.email);
                            setPassword('password');
                            setShowDemoAccounts(false);
                          }}
                          className="w-full p-3 bg-dark-700 hover:bg-dark-600 border border-dark-600 rounded-lg transition-all duration-200"
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl text-primary-400">{cred.icon}</span>
                            <div className="flex-1 text-left">
                              <p className="text-white font-medium">{cred.role}</p>
                              <p className="text-dark-400 text-sm">{cred.email}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

          {/* Footer */}
          <div className="text-center">
            <p className="text-dark-500 text-sm">
              © 2025 Reputation Radar. Monitoring Excellence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;