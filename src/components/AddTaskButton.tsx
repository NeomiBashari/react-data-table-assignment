import React from 'react';
import type { TableRow } from '../types/table';

interface AddTaskButtonProps {
  onAddTask: (newTask: TableRow) => void;
}

const AddTaskButton: React.FC<AddTaskButtonProps> = ({ onAddTask }) => {
  const handleAddTask = () => {
    const newTask: TableRow = {
      owner: '',
      floorCount: '',
      status: 'Todo',
      startDate: '',
      dueDate: '',
      requiresManagerApproval: false,
      taskType: '',
      priority: '',
    };
    
    onAddTask(newTask);
  };

  return (
    <button
      onClick={handleAddTask}
      style={{
        position: 'absolute',
        top: '0.1rem',
        left: '-8rem',
        backgroundColor: '#0073ea',
        color: 'white',
        padding: '6px 20px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 6px rgba(0, 115, 234, 0.2)',
        height: '35px',
        width: '120px',
        justifyContent: 'center',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#0065d1';
        e.currentTarget.style.transform = 'translateY(-1px)';
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 115, 234, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#0073ea';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 115, 234, 0.2)';
      }}
    >
      <svg 
        width="12" 
        height="12" 
        viewBox="0 0 12 12" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M6 2V10M2 6H10" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round"
        />
      </svg>
      Add Task
    </button>
  );
};

export default AddTaskButton;