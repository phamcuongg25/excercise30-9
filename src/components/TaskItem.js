import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);

  const handleSave = () => {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== task.title) {
      onEdit(task.id, trimmed);
    } else {
      setEditText(task.title);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(task.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 4px',
          borderBottom: isDark ? '1px solid #333' : '1px solid #ebebeb',
          gap: '10px',
        }}
      >
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          style={{
            flex: 1,
            padding: '6px 10px',
            fontSize: '15px',
            border: isDark ? '1px solid #555' : '1px solid #ccc',
            backgroundColor: isDark ? '#222' : '#fff',
            color: isDark ? '#fff' : '#000',
            outline: 'none',
          }}
        />
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={handleSave}
            type="button"
            style={{
              padding: '6px 12px',
              fontSize: '13px',
              border: isDark ? '1px solid #555' : '1px solid #ccc',
              backgroundColor: isDark ? '#333' : '#e6e6e6',
              color: isDark ? '#fff' : '#000',
              cursor: 'pointer',
            }}
          >
            Lưu
          </button>
          <button
            onClick={handleCancel}
            type="button"
            style={{
              padding: '6px 12px',
              fontSize: '13px',
              border: isDark ? '1px solid #555' : '1px solid #ccc',
              backgroundColor: isDark ? '#222' : '#fff',
              color: isDark ? '#bbb' : '#666',
              cursor: 'pointer',
            }}
          >
            Hủy
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 4px',
        borderBottom: isDark ? '1px solid #333' : '1px solid #ebebeb',
        gap: '10px',
      }}
    >
      <label
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          flex: 1,
          wordBreak: 'break-word',
        }}
      >
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          style={{ cursor: 'pointer', width: '16px', height: '16px' }}
        />
        <span
          style={{
            fontSize: '15px',
            textDecoration: task.completed ? 'line-through' : 'none',
            color: task.completed ? (isDark ? '#777' : '#888') : (isDark ? '#fff' : '#000'),
          }}
        >
          {task.title}
        </span>
      </label>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={() => {
            setEditText(task.title);
            setIsEditing(true);
          }}
          type="button"
          style={{
            padding: '6px 14px',
            fontSize: '13px',
            border: isDark ? '1px solid #555' : '1px solid #ccc',
            backgroundColor: isDark ? '#222' : '#fff',
            color: isDark ? '#fff' : '#000',
            cursor: 'pointer',
          }}
        >
          Sửa
        </button>
        <button
          onClick={() => onDelete(task.id)}
          disabled={!task.completed}
          title={!task.completed ? 'Không thể xóa công việc chưa hoàn thành' : 'Xóa công việc'}
          type="button"
          style={{
            padding: '6px 14px',
            fontSize: '13px',
            border: isDark ? '1px solid #555' : '1px solid #ccc',
            backgroundColor: isDark ? '#222' : '#fff',
            color: isDark ? '#fff' : '#000',
            cursor: !task.completed ? 'not-allowed' : 'pointer',
            opacity: !task.completed ? 0.4 : 1,
          }}
        >
          Xóa
        </button>
      </div>
    </div>
  );
}
