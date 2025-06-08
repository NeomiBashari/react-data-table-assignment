import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import type { TableData } from '../types/table';
import ProgressBar from './ProgressBar';
import StatusDropdown from './StatusDropdown';

type DataTableProps = {
  data: TableData;
  onDataChange: (data: TableData) => void;
};

const DataTable: React.FC<DataTableProps> = ({ data, onDataChange }) => {
  const headers = [
    { key: "owner", label: "Owner" },
    { key: "floorCount", label: "Floor Count" },
    { key: "timeline", label: "Timeline" },
    { key: "startDate", label: "Start Date" },
    { key: "dueDate", label: "Due Date" },
    { key: "status", label: "Status" },
    { key: "requiresManagerApproval", label: "Requires Manager Approval?" },
    { key: "taskType", label: "Task Type" },
    { key: "priority", label: "Priority" },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const tasksPerPage = 10;

  const [editingStatusIndex, setEditingStatusIndex] = useState<number | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number } | null>(null);

  const statusColors: { [key: string]: string } = {
    "Todo": "blue",
    "In progress": "pink",
    "On hold": "orange",
    "Canceled": "red",
    "Done": "green",
  };

  const statusCellRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        editingStatusIndex !== null &&
        statusCellRefs.current[editingStatusIndex] &&
        !statusCellRefs.current[editingStatusIndex]?.contains(event.target as Node)
      ) {
        setEditingStatusIndex(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editingStatusIndex]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && editingStatusIndex !== null) {
      setEditingStatusIndex(null);
    }
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * tasksPerPage < data.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedData = data.slice(
    currentPage * tasksPerPage,
    (currentPage + 1) * tasksPerPage
  );

  const handleInputChange = (rowIndex: number, key: string, value: any) => {
    const actualIndex = typeof rowIndex === 'number' ? 
      (currentPage * tasksPerPage + rowIndex) : rowIndex;
    const updatedData = [...data];
    updatedData[actualIndex][key] = value;
    onDataChange(updatedData);
  };

  const handleStatusClick = (rowIndex: number, event: React.MouseEvent) => {
    const actualIndex = currentPage * tasksPerPage + rowIndex;
    setEditingStatusIndex(actualIndex);
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setDropdownPosition({
      top: rect.top + window.scrollY - 420,
      left: rect.left + window.scrollX + 80,
    });
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-md relative" style={{ 
      marginLeft: '1rem', 
      position: 'relative', 
      top: '15rem', 
      minHeight: 'calc(100vh - 300px)', 
      backgroundColor: 'transparent', 
      borderRadius: '8px', 
      padding: '1rem' 
    }}>
      <table className="table-auto w-full border-collapse" style={{ 
        borderSpacing: '0 10px',
        backgroundColor: 'white',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <thead className="bg-gray-200" style={{ backgroundColor: 'rgba(240, 240, 240, 0.5)', borderRadius: '8px' }}>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-2 text-left font-semibold text-gray-700"
                style={{ padding: '10px', fontSize: '14px', color: '#333', borderBottom: '1px solid #ddd' }}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex} style={{ borderBottom: '1px solid #ddd' }}>
              {headers.map((header, colIndex) => (
                <td
                  key={colIndex}
                  className="px-4 py-2 text-gray-600 text-center align-middle"
                  style={{ 
                    verticalAlign: 'middle', 
                    textAlign: 'center', 
                    fontSize: '14px', 
                    color: '#555', 
                  }}
                >
                  {header.key === "requiresManagerApproval" ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                      <input
                        type="checkbox"
                        checked={row[header.key]}
                        onChange={(e) => handleInputChange(rowIndex, header.key, e.target.checked)}
                        className="w-5 h-5 cursor-pointer"
                      />
                    </div>
                  ) : header.key === "startDate" || header.key === "dueDate" ? (
                    <DatePicker
                      selected={new Date(row[header.key])}
                      onChange={(date) => handleInputChange(rowIndex, header.key, date)}
                      className="w-full rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : header.key === "status" ? (
                    <div
                      ref={(el) => { statusCellRefs.current[rowIndex] = el; }}
                      className="cursor-pointer px-2 py-1 rounded text-white"
                      style={{
                        backgroundColor: statusColors[row[header.key]],
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        borderRadius: '4px',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                      }}
                      onClick={(e) => handleStatusClick(rowIndex, e)}
                      onKeyDown={handleKeyDown}
                      tabIndex={0}
                    >
                      {row[header.key]}
                    </div>
                  ) : header.key === "priority" ? (
                    <select
                      value={row[header.key]}
                      onChange={(e) => handleInputChange(rowIndex, header.key, e.target.value)}
                      className="w-full rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-inherit border border-gray-300 text-gray-700"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  ) : header.key === "timeline" ? (
                    <ProgressBar
                      startDate={row.startDate}
                      dueDate={row.dueDate}
                      status={row.status}
                    />
                  ) : (
                    <input
                      type="text"
                      value={row[header.key]}
                      onChange={(e) => handleInputChange(rowIndex, header.key, e.target.value)}
                      className="w-full rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ backgroundColor: 'inherit', color: 'black', border: 'none', textAlign: 'center' }}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {editingStatusIndex !== null && dropdownPosition && (
        <StatusDropdown
          statusColors={statusColors}
          onSelect={(status: string) => {
            handleInputChange(editingStatusIndex, "status", status);
            setEditingStatusIndex(null);
          }}
          style={{
            position: 'absolute',
            top: dropdownPosition.top,
            left: dropdownPosition.left,
          }}
        />
      )}
      <div className="flex justify-center mt-4" style={{ position: 'relative', left: '50%', bottom: '0', marginTop: '0.5rem'}}>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          className="px-2 py-1 border rounded shadow-md bg-white"
          style={{ color: currentPage === 0 ? 'gray' : 'black', backgroundColor: 'white', padding: '0.3rem 0.5rem' }}
        >
          &lt;
        </button>
        <button
          onClick={handleNextPage}
          disabled={(currentPage + 1) * tasksPerPage >= data.length}
          className="px-2 py-1 border rounded shadow-md bg-white"
          style={{ color: (currentPage + 1) * tasksPerPage >= data.length ? 'gray' : 'black', backgroundColor: 'white', padding: '0.3rem 0.5rem' }}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default DataTable;