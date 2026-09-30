import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px',
      }}
    >
      <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>
        Mini Task Manager
      </h2>
      <button
        onClick={toggleTheme}
        type="button"
        style={{
          cursor: 'pointer',
          padding: '6px 14px',
        }}
      >
        {isDark ? '☀️ Light' : '🌙 Dark'}
      </button>
    </div>
  );
}
