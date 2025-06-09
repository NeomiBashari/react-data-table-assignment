import React from 'react';
import './StatusDropdown.scss';

interface StatusDropdownProps {
  statusColors: { [key: string]: string };
  onSelect: (status: string) => void;
  style?: React.CSSProperties;
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({ statusColors, onSelect, style }) => {
  const statuses = Object.keys(statusColors);

  return (
    <div 
      className="status-dropdown"
      style={style}
    >
      {statuses.map((status) => (
        <div
          key={status}
          onClick={() => onSelect(status)}
          className="status-dropdown-option"
        >
          <span
            className="status-dropdown-dot"
            style={{ backgroundColor: statusColors[status] }}
          />
          {status}
        </div>
      ))}
    </div>
  );
};

export default StatusDropdown;