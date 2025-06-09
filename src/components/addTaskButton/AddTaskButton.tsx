import React from 'react';
import type { TableRow } from '../../types/table.types';
import './AddTaskButton.scss';

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
      className="add-task-button"
      onClick={handleAddTask}
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