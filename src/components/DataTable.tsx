import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import type { TableData } from '../types/table';

type DataTableProps = {
  data: TableData;
  onDataChange: (data: TableData) => void;
};

const DataTable: React.FC<DataTableProps> = ({ data, onDataChange }) => {
  const headers = [
    { key: "responsibleName", label: "Responsible Name" },
    { key: "taskDescription", label: "Task Description" },
    { key: "projectName", label: "Project Name" },
    { key: "floorCount", label: "Floor Count" },
    { key: "status", label: "Status" },
    { key: "startDate", label: "Start Date" },
    { key: "dueDate", label: "Due Date" },
    { key: "requiresManagerApproval", label: "Requires Manager Approval?" },
    { key: "taskType", label: "Task Type" },
    { key: "priority", label: "Priority" },
  ];

  const handleInputChange = (rowIndex: number, key: string, value: any) => {
    const updatedData = [...data];
    updatedData[rowIndex][key] = value;
    onDataChange(updatedData);
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-md" style={{ marginLeft: '1rem' }}>
      <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg shadow-lg">
        <thead className="bg-gray-200">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700"
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="odd:bg-white even:bg-gray-50">
              {headers.map((header, colIndex) => (
                <td
                  key={colIndex}
                  className="border border-gray-300 px-4 py-2 text-gray-600 text-center align-middle"
                  style={{ verticalAlign: 'middle', textAlign: 'center' }}
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
                      dateFormat="yyyy-MM-dd"
                      wrapperClassName="bg-inherit"
                      popperClassName="bg-inherit"
                    />
                  ) : header.key === "status" ? (
                    <select
                      value={row[header.key]}
                      onChange={(e) => handleInputChange(rowIndex, header.key, e.target.value)}
                      className="w-full rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-inherit border border-gray-300 text-gray-700"
                    >
                      <option value="Todo">Todo</option>
                      <option value="In progress">In progress</option>
                      <option value="On hold">On hold</option>
                      <option value="Canceled">Canceled</option>
                      <option value="Done">Done</option>
                    </select>
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
    </div>
  );
};

export default DataTable;