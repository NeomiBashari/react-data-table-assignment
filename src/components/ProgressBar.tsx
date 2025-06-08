import React from 'react';

type ProgressBarProps = {
  startDate: string;
  dueDate: string;
  status: string;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ startDate, dueDate, status }) => {
  // אם אין תאריכים, נציג פס ריק
  if (!startDate || !dueDate) {
    return (
      <div
        style={{ 
          position: 'relative',
          minWidth: '70px',
          height: '13px',
          backgroundColor: '#e5e7eb',
          borderRadius: '5px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            color: '#6b7280',
            fontSize: '11px',
            fontWeight: '500'
          }}
        >
          Set dates
        </div>
      </div>
    );
  }

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
    if (status === 'Done') {
      return '#22c55e'; // Green
    }
    if (percentage <= 50) {
      return '#3b82f6'; // Blue
    } else if (percentage > 50 && percentage <= 80) {
      return '#f97316'; // Orange
    } else {
      return '#ef4444'; // Red
    }
  };

  return (
    <div
      style={{ 
        position: 'relative',
        minWidth: '70px',
        height: '13px',
        backgroundColor: '#e5e7eb',
        borderRadius: '5px',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          width: `${percentage}%`,
          backgroundColor: getBarColor(),
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          transition: 'width 0.5s ease-in-out',
          borderRadius: '4px'
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#000000',
          fontSize: '11px',
          fontWeight: '500',
          zIndex: 1
        }}
      >
        {Math.round(percentage)}%
      </div>
    </div>
  );
};

export default ProgressBar;