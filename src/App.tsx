import { useState } from 'react';
import { generateFakeTableData } from './utils/generateFakeTableData';
import type { TableData, TableRow } from './types/table';
import DataTable from './components/DataTable';
import AddTaskButton from './components/AddTaskButton';

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

  const handleAddTask = (newTask: TableRow) => {
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
        <AddTaskButton onAddTask={handleAddTask} />
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