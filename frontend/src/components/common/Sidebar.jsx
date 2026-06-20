import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = ({ activeTab = 'Dashboard', onTabChange }) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  
  const navItems = [
    { name: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'My Planners', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { name: 'Marketplace', icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9' },
    { name: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
  ];

  const handleNavClick = (itemName) => {
    onTabChange && onTabChange(itemName);
    const routeMap = {
      'Dashboard': '/dashboard',
      'My Planners': '/dashboard',
      'Marketplace': '/marketplace',
      'Settings': '/dashboard'
    };
    navigate(routeMap[itemName] || '/dashboard');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 h-screen border-r border-academia-leather bg-academia-paper flex flex-col shrink-0">
      
      {/* Logo Header */}
      <div className="p-6 border-b border-academia-leather flex items-center justify-center">
        <h1 className="text-3xl font-serif font-bold italic tracking-wide text-academia-ink">PlanCraft</h1>
      </div>
      
      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <p className="text-xs uppercase tracking-widest text-academia-inkLight mb-4 mt-2 px-4 font-serif">Index</p>
        
        {navItems.map((item) => (
          <button 
            key={item.name}
            onClick={() => handleNavClick(item.name)}
            className={`w-full flex items-center px-4 py-3 text-sm rounded-sm transition-all duration-200 font-body group ${
              activeTab === item.name 
                ? 'bg-academia-leather/40 text-academia-ink font-semibold border-l-4 border-academia-gold shadow-sm' 
                : 'text-academia-inkLight hover:text-academia-ink hover:bg-academia-leather/20 border-l-4 border-transparent'
            }`}
          >
            <svg 
              className={`w-5 h-5 mr-3 transition-colors ${activeTab === item.name ? 'text-academia-gold' : 'text-academia-inkLight group-hover:text-academia-ink'}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
            </svg>
            {item.name}
          </button>
        ))}
      </nav>

      {/* User Profile Footer */}
      <div className="p-4 border-t border-academia-leather">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 text-academia-inkLight hover:text-academia-ink hover:bg-academia-leather/20 p-2 rounded-sm transition-colors">
          <div className="w-8 h-8 rounded-full bg-academia-leather flex items-center justify-center text-academia-ink font-serif border border-academia-gold/50 shadow-sm">
            S
          </div>
          <div className="text-left flex-1 overflow-hidden">
            <p className="text-sm font-medium text-academia-ink truncate">Scholar</p>
            <p className="text-xs text-academia-inkLight truncate">user@academy.edu</p>
          </div>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;