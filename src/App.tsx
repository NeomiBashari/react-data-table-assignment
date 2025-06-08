import { useState } from 'react';
import { generateFakeTableData } from './utils/generateFakeTableData';
import type { TableData, TableRow } from './types/table';
import DataTable from './components/DataTable';

const App = () => {
  const [tableData, setTableData] = useState<TableData>(generateFakeTableData());
  const [title, setTitle] = useState('Project Task Manager');
  const [isEditing, setIsEditing] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditing(false);
  };

  const handleAddTask = () => {
    const newTask: TableRow = {
      owner: '',
      floorCount: '' as TableRow['floorCount'],
      status: 'Todo',
      startDate: '',
      dueDate: '',
      requiresManagerApproval: false,
      taskType: '' as TableRow['taskType'],
      priority: '' as TableRow['priority']
    };
    
    setTableData([newTask, ...tableData]);
  };

  return (
    <div className="app-container" style={{ position: 'relative' }}>
      {/* Title Container*/}
      <div style={{ 
        position: 'absolute',
        marginTop: '7rem',
        left: '2rem',
        zIndex: 10
      }}>
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            className="text-3xl font-bold border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ fontSize: '2.8rem', fontWeight: '700', width: 'auto', textAlign: 'left', backgroundColor: 'inherit', color: 'inherit', height: '3.5rem', lineHeight: '3.5rem' }}
            autoFocus
          />
        ) : (
          <h1
            className="text-3xl font-bold cursor-pointer"
            style={{ fontSize: '2.8rem', fontWeight: '700', height: '3.5rem', lineHeight: '3.5rem' }}
            onClick={() => setIsEditing(true)}
          >
            {title}
          </h1>
        )}
      </div>

      {/* Add Task Button Container */}
      <div style={{
        position: 'absolute',
        top: '13rem',
        right: '1rem',
        zIndex: 10
      }}>
        <button
          onClick={handleAddTask}
          style={{
            backgroundColor: '#0073ea',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '10px 24px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease-in-out',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 6px 8px -1px rgba(0, 0, 0, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.06)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 1V15M1 8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Add Task
        </button>
      </div>

      {/* Table Container */}
      <div style={{
        marginTop: '2rem',
        width: '100%'
      }}>
        <DataTable data={tableData} onDataChange={setTableData} />
      </div>
    </div>
  );
};

export default App;