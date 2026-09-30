import React, { createContext, useContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Cung cấp trực tiếp backgroundColor và color theo theme
  const backgroundColor = theme === 'dark' ? '#181818' : '#ffffff';
  const color = theme === 'dark' ? '#ffffff' : '#000000';

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, backgroundColor, color }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
