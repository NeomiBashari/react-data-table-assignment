import React from 'react';
import DatePicker from 'react-datepicker';
import ProgressBar from '../progressBar/ProgressBar';
import type { TableRow as TableRowType } from '../../types/table.types';
import './TableRow.scss';

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
  const renderPriorityCell = (value: string) => (
    <div className="priority-select-wrapper">
      <select
        value={value}
        onChange={(e) => onInputChange(rowIndex, 'priority', e.target.value)}
        className="priority-select"
      >
        <option value="">Select priority</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </div>
  );

  const renderStatusCell = (value: string) => (
    <div
      ref={statusCellRef}
      className="status-cell"
      style={{ backgroundColor: statusColors[value] }}
      onClick={(e) => onStatusClick(rowIndex, e)}
      tabIndex={0}
    >
      {value}
    </div>
  );

  return (
    <tr
      className={`task-row ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      {headers.map((header, colIndex) => (
        header.key === 'status' ? (
          <td key={colIndex} className="cell no-padding">
            {renderStatusCell(row[header.key])}
          </td>
        ) : header.key === 'priority' ? (
          <td key={colIndex} className="cell priority-cell">
            {renderPriorityCell(row[header.key])}
          </td>
        ) : header.key === 'requiresManagerApproval' ? (
          <td key={colIndex} className="cell center">
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                checked={row[header.key]}
                onChange={(e) => onInputChange(rowIndex, header.key, e.target.checked)}
                className="checkbox"
              />
            </div>
          </td>
        ) : header.key === 'startDate' || header.key === 'dueDate' ? (
          <td key={colIndex} className="cell center">
            <DatePicker
              selected={row[header.key] ? new Date(row[header.key]) : null}
              onChange={(date: Date | null) => {
                if (date) {
                  onInputChange(rowIndex, header.key, date.toISOString().split('T')[0]);
                }
              }}
              className="datepicker"
              placeholderText="Select date"
              isClearable={false}
            />
          </td>
        ) : header.key === 'timeline' ? (
          <td key={colIndex} className="cell center">
            <ProgressBar
              startDate={row.startDate}
              dueDate={row.dueDate}
              status={row.status}
            />
          </td>
        ) : header.key === 'floorCount' || header.key === 'taskType' ? (
          <td key={colIndex} className="cell center">
            <select
              value={row[header.key]}
              onChange={(e) => onInputChange(rowIndex, header.key, e.target.value)}
              className="dropdown"
            >
              <option value="">{`Select ${header.label.toLowerCase()}`}</option>
              {header.key === 'floorCount' ? (
                <>
                  <option value="1–20">1–20</option>
                  <option value="21–40">21–40</option>
                  <option value="41+">41+</option>
                </>
              ) : (
                <>
                  <option value="Execution">Execution</option>
                  <option value="Inspection">Inspection</option>
                  <option value="Planning">Planning</option>
                  <option value="Maintenance">Maintenance</option>
                </>
              )}
            </select>
          </td>
        ) : (
          <td key={colIndex} className="cell center">
            <input
              type="text"
              value={row[header.key]}
              onChange={(e) => onInputChange(rowIndex, header.key, e.target.value)}
              className="text-input"
            />
          </td>
        )
      ))}
    </tr>
  );
};

export default TaskTableRow;
