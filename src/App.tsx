import { useState } from 'react';
import { generateFakeTableData } from './utils/generateFakeTableData';
import type { TableData } from './types/table';
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

  return (
    <div className="app-container">
      <div style={{ width: '100%', textAlign: 'left', height: '3.5rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '1rem', marginBottom: '1rem' }}>
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            className="text-3xl font-bold border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ fontSize: '2.8rem', fontWeight: '700', width: 'auto', textAlign: 'left', backgroundColor: 'inherit', color: 'inherit', height: '3.5rem', lineHeight: '3.5rem', marginBottom: '0' }}
            autoFocus
          />
        ) : (
          <h1
            className="text-3xl font-bold cursor-pointer"
            style={{ fontSize: '2.8rem', fontWeight: '700', height: '3.5rem', lineHeight: '3.5rem', marginBottom: '0' }}
            onClick={() => setIsEditing(true)}
          >
            {title}
          </h1>
        )}
      </div>
      <DataTable data={tableData} onDataChange={setTableData} />
    </div>
  );
};

export default App;