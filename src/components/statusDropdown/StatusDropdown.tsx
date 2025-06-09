import React from 'react';
import './StatusDropdown.scss';

interface StatusDropdownProps {
  statusColors: { [key: string]: string };
  onSelect: (status: string) => void;
  style?: React.CSSProperties;
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({ statusColors, onSelect, style }) => {
  const statuses = Object.keys(statusColors);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onSelect(event.currentTarget.textContent as string);
  };


  return (
    <div 
      className="status-dropdown"
      style={style}
    >
      {statuses.map((status) => (
        <div
          key={status}
          onClick={handleClick}
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