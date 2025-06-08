import React from 'react';
import DatePicker from 'react-datepicker';
import ProgressBar from './ProgressBar';
import type { TableRow as TableRowType } from '../types/table';

interface TaskTableRowProps {
  row: TableRowType;
  rowIndex: number;
  headers: { key: string; label: string }[];
  isSelected: boolean;
  statusColors: { [key: string]: string };
  onSelect: () => void;
  onStatusClick: (rowIndex: number, event: React.MouseEvent) => void;
  onInputChange: (rowIndex: number, key: string, value: any) => void;
  statusCellRef: (el: HTMLDivElement | null) => void;
}

const TaskTableRow: React.FC<TaskTableRowProps> = ({
  row,
  rowIndex,
  headers,
  isSelected,
  statusColors,
  onSelect,
  onStatusClick,
  onInputChange,
  statusCellRef,
}) => {
  // PriorityCell logic
  const renderPriorityCell = (value: string) => (
    <div className="priority-select-wrapper">
      <select
        value={value}
        onChange={(e) => onInputChange(rowIndex, 'priority', e.target.value)}
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

  // StatusCell logic
  const renderStatusCell = (value: string) => (
    <div
      ref={statusCellRef}
      className="cursor-pointer text-white w-full h-full"
      style={{
        backgroundColor: statusColors[value],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px 24px',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        userSelect: 'none',
      }}
      onClick={(e) => onStatusClick(rowIndex, e)}
      tabIndex={0}
    >
      {value}
    </div>
  );

  return (
    <tr
      style={{
        borderBottom: '1px solid #ddd',
        backgroundColor: isSelected ? '#e0e0e0' : 'white',
        color: isSelected ? 'black' : 'black',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
      }}
      onClick={onSelect}
    >
      {headers.map((header, colIndex) => (
        header.key === 'status' ? (
          <td key={colIndex} style={{ padding: 0, overflow: 'hidden' }}>
            {renderStatusCell(row[header.key])}
          </td>
        ) : header.key === 'priority' ? (
          <td key={colIndex} style={{ padding: '4px 12px', position: 'relative' }}>
            {renderPriorityCell(row[header.key])}
          </td>
        ) : header.key === 'requiresManagerApproval' ? (
          <td key={colIndex} style={{ verticalAlign: 'middle', textAlign: 'center', fontSize: '14px', color: '#555', minHeight: '48px', padding: '8px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <input
                type="checkbox"
                checked={row[header.key]}
                onChange={(e) => onInputChange(rowIndex, header.key, e.target.checked)}
                className="w-5 h-5 cursor-pointer"
              />
            </div>
          </td>
        ) : header.key === 'startDate' || header.key === 'dueDate' ? (
          <td key={colIndex} style={{ verticalAlign: 'middle', textAlign: 'center', fontSize: '14px', color: '#555', minHeight: '48px', padding: '8px 16px' }}>
            <DatePicker
              selected={row[header.key] ? new Date(row[header.key]) : null}
              onChange={(date: Date | null) => {
                if (date) {
                  onInputChange(rowIndex, header.key, date.toISOString().split('T')[0]);
                }
              }}
              className="w-full rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholderText="Select date"
              isClearable={false}
            />
          </td>
        ) : header.key === 'timeline' ? (
          <td key={colIndex} style={{ verticalAlign: 'middle', textAlign: 'center', fontSize: '14px', color: '#555', minHeight: '48px', padding: '8px 16px' }}>
            <ProgressBar
              startDate={row.startDate}
              dueDate={row.dueDate}
              status={row.status}
            />
          </td>
        ) : header.key === 'floorCount' ? (
          <td key={colIndex} style={{ verticalAlign: 'middle', textAlign: 'center', fontSize: '14px', color: '#555', minHeight: '48px', padding: '8px 16px' }}>
            <select
              value={row[header.key]}
              onChange={(e) => onInputChange(rowIndex, header.key, e.target.value)}
              style={{ backgroundColor: 'inherit', color: '#94A3B8', border: 'none', textAlign: 'center', width: '100%', appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none', cursor: 'pointer' }}
            >
              <option value="">Select floor count</option>
              <option value="1–20">1–20</option>
              <option value="21–40">21–40</option>
              <option value="41+">41+</option>
            </select>
          </td>
        ) : header.key === 'taskType' ? (
          <td key={colIndex} style={{ verticalAlign: 'middle', textAlign: 'center', fontSize: '14px', color: '#555', minHeight: '48px', padding: '8px 16px' }}>
            <select
              value={row[header.key]}
              onChange={(e) => onInputChange(rowIndex, header.key, e.target.value)}
              style={{ backgroundColor: 'inherit', color: '#94A3B8', border: 'none', textAlign: 'center', width: '100%', appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none', cursor: 'pointer' }}
            >
              <option value="">Select task type</option>
              <option value="Execution">Execution</option>
              <option value="Inspection">Inspection</option>
              <option value="Planning">Planning</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </td>
        ) : (
          <td key={colIndex} style={{ verticalAlign: 'middle', textAlign: 'center', fontSize: '14px', color: '#555', minHeight: '48px', padding: '8px 16px' }}>
            <input
              type="text"
              value={row[header.key]}
              onChange={(e) => onInputChange(rowIndex, header.key, e.target.value)}
              className="w-full rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ backgroundColor: 'inherit', color: 'black', border: 'none', textAlign: 'center' }}
            />
          </td>
        )
      ))}
    </tr>
  );
};

export default TaskTableRow;
