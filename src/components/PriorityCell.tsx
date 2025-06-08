import React from 'react';
import type { TableRow } from '../types/table';

type Priority = TableRow['priority'];

interface PriorityCellProps {
  value: Priority;
  onChange: (value: Priority) => void;
}

const PriorityCell: React.FC<PriorityCellProps> = ({ value, onChange }) => {
  return (
    <div className="priority-select-wrapper">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as Priority)}
        style={{
          appearance: 'none',
          backgroundColor: 'inherit',
          color: '#374151',
          border: 'none',
          padding: '8px',
          fontSize: '14px',
          textAlign: 'center',
        }}
      >
        <option value="">Select priority</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </div>
  );
};

export default PriorityCell;