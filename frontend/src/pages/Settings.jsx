import React from 'react';
import Sidebar from '../components/common/Sidebar';

const Settings = () => {
  return (
    <div className="flex h-screen w-full bg-academia-parchment">
      <Sidebar activeTab="Settings" />
      <main className="flex-1 p-12">
        <h2 className="text-3xl font-serif font-semibold text-academia-ink mb-4">Settings</h2>
        <p className="text-academia-inkLight">Manage your account, preferences, and application settings here.</p>
      </main>
    </div>
  );
};

export default Settings;
