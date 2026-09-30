import React, { useReducer, useState, useMemo, useCallback, useEffect } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { useLocalStorage } from './hooks/useLocalStorage';
import { initialTasks } from './data/tasks';

// Reducer quản lý các hành động thêm, chuyển đổi trạng thái và xóa task
function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return [
        {
          id: Date.now(),
          title: action.payload,
          completed: false,
        },
        ...state,
      ];
    case 'TOGGLE_TASK':
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
    case 'DELETE_TASK':
      return state.filter((task) => !(task.id === action.payload && task.completed));
    case 'EDIT_TASK':
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, title: action.payload.title }
          : task
      );
    case 'SET_TASKS':
      return action.payload;
    default:
      return state;
  }
}

function MainApp() {
  // Lấy trực tiếp backgroundColor và color từ ThemeContext
  const { theme, backgroundColor, color } = useTheme();

  // Custom hook useLocalStorage đọc dữ liệu ban đầu từ tasks.js và đồng bộ localStorage
  const [storedTasks, setStoredTasks] = useLocalStorage('tasks', initialTasks);

  // useReducer quản lý Todo list
  const [tasks, dispatch] = useReducer(taskReducer, storedTasks);

  // useEffect tự động cập nhật vào localStorage khi tasks thay đổi
  useEffect(() => {
    setStoredTasks(tasks);
  }, [tasks, setStoredTasks]);

  // Đổi màu nền và chữ của toàn bộ trang web theo ThemeContext
  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor;
    document.body.style.color = color;
    document.body.style.margin = '0';
    document.body.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  }, [backgroundColor, color]);

  // useState quản lý bộ lọc và từ khóa tìm kiếm
  const [filter, setFilter] = useState('all'); // 'all' | 'incomplete' | 'completed'
  const [searchTerm, setSearchTerm] = useState('');

  // useMemo đếm số lượng công việc: tổng, chưa làm, hoàn thành
  const { total, incomplete, completed } = useMemo(() => {
    const totalCount = tasks.length;
    const incompleteCount = tasks.filter((t) => !t.completed).length;
    const completedCount = tasks.filter((t) => t.completed).length;
    return { total: totalCount, incomplete: incompleteCount, completed: completedCount };
  }, [tasks]);

  // useMemo tối ưu hóa lọc danh sách công việc
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchFilter =
        filter === 'all'
          ? true
          : filter === 'incomplete'
          ? !task.completed
          : task.completed;
      const matchSearch = task.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase().trim());
      return matchFilter && matchSearch;
    });
  }, [tasks, filter, searchTerm]);

  // useCallback tối ưu hóa các hàm thêm, toggle, xóa
  const handleAddTask = useCallback((title) => {
    dispatch({ type: 'ADD_TASK', payload: title });
  }, []);

  const handleToggleTask = useCallback((id) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  }, []);

  const handleDeleteTask = useCallback((id) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  }, []);

  const handleEditTask = useCallback((id, title) => {
    dispatch({ type: 'EDIT_TASK', payload: { id, title } });
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor,
        color,
      }}
    >
      <div
        style={{
          maxWidth: '520px',
          margin: '0 auto',
          padding: '40px 20px',
        }}
      >
        {/* Header với nút Dark / Light ở góc phải */}
        <Header />

        {/* Form thêm công việc */}
        <TaskForm onAddTask={handleAddTask} />

        {/* Bộ lọc và Tìm kiếm */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '20px',
          }}
        >
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              padding: '8px 10px',
              fontSize: '14px',
              border: `1px solid ${theme === 'dark' ? '#555' : '#ccc'}`,
              backgroundColor: theme === 'dark' ? '#222' : '#fff',
              color,
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="all">Tất cả</option>
            <option value="incomplete">Chưa làm</option>
            <option value="completed">Hoàn thành</option>
          </select>
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              padding: '8px 12px',
              fontSize: '14px',
              border: `1px solid ${theme === 'dark' ? '#555' : '#ccc'}`,
              backgroundColor: theme === 'dark' ? '#222' : '#fff',
              color,
              outline: 'none',
            }}
          />
        </div>

        {/* Thống kê */}
        <div
          style={{
            textAlign: 'center',
            fontSize: '17px',
            fontWeight: 'bold',
            margin: '20px 0 10px 0',
          }}
        >
          Tổng: {total} &nbsp;|&nbsp; Chưa làm: {incomplete} &nbsp;|&nbsp; Hoàn thành: {completed}
        </div>

        {/* Danh sách công việc */}
        <TaskList
          tasks={filteredTasks}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
