import React, { useState, useRef } from 'react';
import { calculateProgressPercentage } from '../..//utils/calculateProgress';
import 'react-datepicker/dist/react-datepicker.css';
import './DataTable.scss';
import type { TableData } from '../../types/table.types';
import StatusDropdown from '../statusDropdown/StatusDropdown';
import DeleteButton from '../deleteButton/DeleteButton';
import TaskTableRow from '../tableRow/TableRow';
import ColumnFilter from '../columnFilter/ColumnFilter';

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

  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(new Set(headers.map((header) => header.key)));

  const statusColors: { [key: string]: string } = {
    "Todo": "#7da6ff",      
    "In progress": "#ff8fb2",
    "On hold": "#ffd580",    
    "Canceled": "#ff7a7a",    
    "Done": "#7be87b",       
  };

  const statusCellRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return paginatedData;

    const sorted = [...paginatedData].sort((a, b) => {
      const aValue = sortConfig.key === 'timeline' ? calculateProgressPercentage(a.startDate, a.dueDate, a.status) : a[sortConfig.key];
      const bValue = sortConfig.key === 'timeline' ? calculateProgressPercentage(b.startDate, b.dueDate, b.status) : b[sortConfig.key];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      } else if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
        return sortConfig.direction === 'asc'
          ? (aValue === bValue ? 0 : aValue ? -1 : 1)
          : (aValue === bValue ? 0 : aValue ? 1 : -1);
      } else {
        return 0;
      }
    });

    return sorted;
  }, [paginatedData, sortConfig]);

  const handleInputChange = (rowIndex: number, key: string, value: any) => {


    console.log(`Updating row ${rowIndex}, key: ${key}, value: ${value}`);
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

  const handleSort = (key: string) => {
    setSortConfig((prevConfig) => {
      if (prevConfig?.key === key) {
        return {
          key,
          direction: prevConfig.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      return { key, direction: 'asc' };
    });
  };

  const handleToggleColumn = (key: string) => {
    setVisibleColumns((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  return (
    <div className="datatable-container overflow-x-auto rounded-lg shadow-md relative">
      <div className="datatable-controls">
        <ColumnFilter
          headers={headers}
          visibleColumns={visibleColumns}
          onToggleColumn={handleToggleColumn}
        />
        <DeleteButton
          isDisabled={selectedRowIndex === null}
          onDelete={handleConfirmDelete}
          isActive={selectedRowIndex !== null}
        />
      </div>
      <table className="datatable-table table-auto w-full border-collapse">
        <thead className="datatable-thead bg-gray-200">
          <tr>
            {headers.map((header, index) => (
              visibleColumns.has(header.key) && (
                <th
                  key={index}
                  className="datatable-th px-4 py-2 text-left font-semibold text-gray-700 cursor-pointer"
                  onClick={() => handleSort(header.key)}
                >
                  {header.label}
                </th>
              )
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIndex) => (
            <TaskTableRow
              key={rowIndex}
              row={row}
              rowIndex={rowIndex}
              headers={headers.filter((header) => visibleColumns.has(header.key))}
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
      <div className="datatable-page-indicator">
        page {currentPage + 1} of {totalPages}
      </div>
      <div className="datatable-pagination">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          className="datatable-pagination-btn px-2 py-1 border rounded shadow-md bg-white"
        >
          &lt;
        </button>
        <button
          onClick={handleNextPage}
          disabled={(currentPage + 1) * tasksPerPage >= data.length}
          className="datatable-pagination-btn px-2 py-1 border rounded shadow-md bg-white"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default DataTable;