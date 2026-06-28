import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

// Import Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import Marketplace from './pages/Marketplace';
import Settings from './pages/Settings';
import Planners from './pages/Planners';

/**
 * A wrapper component that blocks unauthenticated users 
 * from accessing private sections of the app.
 */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-academia-parchment text-academia-ink font-serif italic text-xl">
        Consulting the archives...
      </div>
    );
  }
  
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    // Base wrapper keeping the theme active across all routes
    <div className="min-h-screen bg-academia-parchment text-academia-ink font-body transition-colors duration-300">
      <Routes>
        
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route 
          path="/" 
          element={<ProtectedRoute><Navigate to="/dashboard" replace /></ProtectedRoute>} 
        />
        <Route 
          path="/dashboard" 
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
        />
        <Route 
          path="/marketplace" 
          element={<ProtectedRoute><Marketplace /></ProtectedRoute>} 
        />
        <Route 
          path="/planners" 
          element={<ProtectedRoute><Planners /></ProtectedRoute>} 
        />
        <Route 
          path="/settings" 
          element={<ProtectedRoute><Settings /></ProtectedRoute>} 
        />
        
        {/* Editor Routes (Supports creating new or editing existing) */}
        <Route 
          path="/editor" 
          element={<ProtectedRoute><Editor /></ProtectedRoute>} 
        />
        <Route 
          path="/editor/:id" 
          element={<ProtectedRoute><Editor /></ProtectedRoute>} 
        />

        {/* 404 Catch-All */}
        <Route path="*" element={<Navigate to="/" replace />} />
        
      </Routes>
    </div>
  );
}

export default App;