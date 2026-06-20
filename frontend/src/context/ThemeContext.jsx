import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage, or default to 'light' (Light Academia)
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('plancraft-theme');
    // If no saved theme, check user's system preference
    if (!savedTheme) {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return savedTheme;
  });

  // Apply the theme to the HTML root element so Tailwind can pick it up
  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
      // Optional: Update meta theme color for mobile browsers
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#2a241f'); 
    } else {
      root.classList.remove('dark');
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#fdfbf7'); // academia-parchment
    }

    // Persist the choice in local storage
    localStorage.setItem('plancraft-theme', theme);
  }, [theme]);

  // Function to switch between Light Academia and Dark Academia
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};