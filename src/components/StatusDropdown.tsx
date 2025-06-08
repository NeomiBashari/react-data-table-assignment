import React from 'react';

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
      style={{
        ...style,
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '8px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        width: '180px',
        animation: 'fadeIn 0.2s ease-in-out',
      }}
    >
      {statuses.map((status) => (
        <div
          key={status}
          onClick={() => onSelect(status)}
          style={{
            padding: '10px 16px',
            margin: '4px 0',
            cursor: 'pointer',
            borderRadius: '8px',
            transition: 'all 0.2s ease-in-out',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: '500',
            color: '#4b5563',
          }}
          className="hover:bg-gray-50"
        >
          <span
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: statusColors[status],
              display: 'inline-block',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          />
          {status}
        </div>
      ))}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .status-dropdown > div:hover {
            background-color: #f8fafc;
            transform: translateX(4px);
          }
        `}
      </style>
    </div>
  );
};

export default StatusDropdown;