import React from 'react';

type ProgressBarProps = {
  startDate: string;
  dueDate: string;
  status: string;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ startDate, dueDate, status }) => {
  const calculateTimelinePercentage = (startDate: string, dueDate: string): number => {
    const start = new Date(startDate).getTime();
    const due = new Date(dueDate).getTime();
    const now = Date.now();
    if (now >= due) return 100;
    if (now <= start) return 0;
    return ((now - start) / (due - start)) * 100;
  };

  const percentage = calculateTimelinePercentage(startDate, dueDate);

  const getBarColor = (): string => {
    if (status === 'done') {
      return 'green';
    }
    if (percentage <= 50) {
      return 'green';
    } else if (percentage > 50 && percentage <= 80) {
      return 'orange';
    } else {
      return 'red';
    }
  };

  return (
    <div
      className="w-full bg-gray-300 rounded-full h-6 shadow-md"
      style={{ position: 'relative', overflow: 'hidden', minWidth: '150px'}} 
    >
      <div
        className="h-6 rounded-full"
        style={{
          width: `${percentage}%`,
          backgroundColor: getBarColor(),
          transition: 'width 0.3s ease-in-out',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;