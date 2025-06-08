import React, { useState, useEffect, useRef } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import type { TableData } from '../types/table';
import StatusDropdown from './StatusDropdown';
import DeleteButton from './DeleteButton';
import TaskTableRow from './TableRow';

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
  const totalPages = Math.ceil(data.length / tasksPerPage);

  const [editingStatusIndex, setEditingStatusIndex] = useState<number | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number } | null>(null);

  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  const statusColors: { [key: string]: string } = {
    "Todo": "#7da6ff",         // darker pastel blue
    "In progress": "#ff8fb2", // darker pastel pink
    "On hold": "#ffd580",     // darker pastel orange
    "Canceled": "#ff7a7a",    // darker pastel red
    "Done": "#7be87b",        // darker pastel green
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
    if (editingStatusIndex === actualIndex) {
      setEditingStatusIndex(null);
      return;
    }
    setEditingStatusIndex(actualIndex);
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setDropdownPosition({
      top: rect.top + window.scrollY - 420,
      left: rect.left + window.scrollX + 80,
    });
  };

  const handleRowClick = (rowIndex: number) => {
    setSelectedRowIndex(prevIndex => prevIndex === rowIndex ? null : rowIndex);
  };

  const handleConfirmDelete = () => {
    if (selectedRowIndex !== null) {
      const actualIndex = currentPage * tasksPerPage + selectedRowIndex;
      const updatedData = [...data];
      updatedData.splice(actualIndex, 1);
      onDataChange(updatedData);
      setSelectedRowIndex(null);
    }
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
      {/* Delete Button */}
      <div style={{ 
        position: 'absolute',
        top: '-1.9rem',
        right: '10rem',
        zIndex: 10
      }}>
        <DeleteButton
          isDisabled={selectedRowIndex === null}
          onDelete={handleConfirmDelete}
          isActive={selectedRowIndex !== null}
        />
      </div>

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
            <TaskTableRow
              key={rowIndex}
              row={row}
              rowIndex={rowIndex}
              headers={headers}
              isSelected={rowIndex === selectedRowIndex}
              statusColors={statusColors}
              onSelect={() => handleRowClick(rowIndex)}
              onStatusClick={handleStatusClick}
              onInputChange={handleInputChange}
              statusCellRef={(el) => { statusCellRefs.current[rowIndex] = el; }}
            />
          ))}
        </tbody>
      </table>

      {editingStatusIndex !== null && dropdownPosition && (
        <StatusDropdown
          statusColors={statusColors}
          onSelect={(status: string) => {
            const pageRowIndex = editingStatusIndex - currentPage * tasksPerPage;
            handleInputChange(pageRowIndex, "status", status);
            setEditingStatusIndex(null);
          }}
          style={{
            position: 'absolute',
            top: dropdownPosition.top,
            left: dropdownPosition.left,
          }}
        />
      )}
      <div style={{
        color: '#888',
        textAlign: 'center',
        fontSize: '14px',
        marginTop: '0.5rem',
        position: 'relative',
        left: '52%',
        transform: 'translateX(-50%)',
      }}>
        page {currentPage + 1} of {totalPages}
      </div>
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