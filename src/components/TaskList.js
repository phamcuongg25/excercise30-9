import React from 'react';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px 0', color: '#888', fontStyle: 'italic' }}>
        Không có công việc nào.
      </div>
    );
  }

  return (
    <div style={{ marginTop: '10px' }}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
