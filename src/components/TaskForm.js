import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function TaskForm({ onAddTask }) {
  const [taskTitle, setTaskTitle] = useState('');
  const inputRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = taskTitle.trim();
    if (!trimmed) {
      alert('Vui lòng nhập tên công việc!');
      inputRef.current?.focus();
      return;
    }

    onAddTask(trimmed);
    setTaskTitle('');
    inputRef.current?.focus();
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '16px',
      }}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Nhập tên công việc..."
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        style={{
          flex: 1,
          padding: '8px 12px',
          fontSize: '14px',
          border: isDark ? '1px solid #555' : '1px solid #ccc',
          outline: 'none',
        }}
      />
      <button
        type="submit"
        style={{
          padding: '8px 20px',
          fontSize: '14px',
          border: isDark ? '1px solid #555' : '1px solid #ccc',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}
      >
        Thêm
      </button>
    </form>
  );
}
