import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import { AuthContext } from '../context/AuthContext';

const tabs = [
  { key: 'account', label: 'Account' },
  { key: 'security', label: 'Security' },
  { key: 'delete', label: 'Delete Account' },
];

const Settings = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('account');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [deleteConfirmed, setDeleteConfirmed] = useState('');

  const handleAccountSave = (event) => {
    event.preventDefault();
    setMessage('Account settings updated locally.');
  };

  const handleSecuritySave = (event) => {
    event.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    if (!currentPassword) {
      setMessage('Please confirm your current password.');
      return;
    }

    setMessage('Password update saved locally.');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleDeleteAccount = () => {
    if (!user) return;
    if (deleteConfirmed !== user.email) {
      setMessage('Enter your email exactly to confirm deletion.');
      return;
    }

    if (!window.confirm('This will permanently delete your account and all data. Continue?')) {
      return;
    }

    localStorage.removeItem('token');
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen w-full bg-academia-parchment">
      <Sidebar activeTab="Settings" />

      <main className="flex-1 p-12 overflow-y-auto custom-scrollbar">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-serif font-semibold text-academia-ink mb-2">Settings</h2>
            <p className="text-academia-inkLight">Manage your account settings, security options, and permanent account deletion.</p>
          </div>

          <div className="bg-academia-paper border border-academia-leather shadow-sm">
            <div className="flex flex-wrap gap-2 p-4 border-b border-academia-leather bg-academia-parchment">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveTab(tab.key);
                    setMessage(null);
                  }}
                  className={`px-4 py-2 rounded-sm font-medium transition ${
                    activeTab === tab.key
                      ? 'bg-academia-leather text-academia-paper shadow-sm'
                      : 'bg-transparent text-academia-inkLight hover:text-academia-ink'
                  }`}>
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-8">
              {message && (
                <div className="mb-6 rounded border border-academia-leather/40 bg-academia-parchment p-4 text-sm text-academia-ink">
                  {message}
                </div>
              )}

              {activeTab === 'account' && (
                <form onSubmit={handleAccountSave} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-academia-ink mb-2">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded border border-academia-leather/70 bg-academia-paper p-3 text-academia-ink"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-academia-ink mb-2">Display Name</label>
                    <input
                      type="text"
                      value={user?.email || ''}
                      disabled
                      className="w-full rounded border border-academia-leather/70 bg-academia-paper p-3 text-academia-ink/80 cursor-not-allowed"
                    />
                    <p className="mt-2 text-xs text-academia-inkLight">Your account identifier is managed by authentication and is currently locked in for this demo.</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button type="submit" className="px-5 py-3 bg-academia-leather text-academia-paper rounded-sm">Save changes</button>
                  </div>
                </form>
              )}

              {activeTab === 'security' && (
                <form onSubmit={handleSecuritySave} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-academia-ink mb-2">Current password</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full rounded border border-academia-leather/70 bg-academia-paper p-3 text-academia-ink"
                      placeholder="Enter current password"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-academia-ink mb-2">New password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full rounded border border-academia-leather/70 bg-academia-paper p-3 text-academia-ink"
                      placeholder="Enter new password"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-academia-ink mb-2">Confirm password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full rounded border border-academia-leather/70 bg-academia-paper p-3 text-academia-ink"
                      placeholder="Confirm new password"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <button type="submit" className="px-5 py-3 bg-academia-leather text-academia-paper rounded-sm">Save password</button>
                  </div>
                </form>
              )}

              {activeTab === 'delete' && (
                <div className="space-y-6">
                  <div className="rounded border border-red-300 bg-red-50 p-5">
                    <h3 className="text-xl font-semibold text-red-700">Delete account permanently</h3>
                    <p className="mt-2 text-sm text-red-700/90">This action cannot be undone. Your account and all associated planner data will be removed from this browser session.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-academia-ink mb-2">Confirm your email to delete</label>
                    <input
                      type="email"
                      value={deleteConfirmed}
                      onChange={(e) => setDeleteConfirmed(e.target.value)}
                      className="w-full rounded border border-academia-leather/70 bg-academia-paper p-3 text-academia-ink"
                      placeholder="Enter your email to confirm"
                    />
                  </div>

                  <button
                    onClick={handleDeleteAccount}
                    className="px-5 py-3 bg-red-600 text-white rounded-sm hover:bg-red-700"
                  >
                    Delete account permanently
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
