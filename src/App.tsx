import { useState } from 'react';
import mockData from './assets/mockData.json';
import type { TableData, TableRow } from './types/table.types';
import DataTable from './components/dataTable/DataTable';
import AddTaskButton from './components/addTaskButton/AddTaskButton';
import './App.scss';
import backgroundIcon from './assets/background-icon.png';

const App = () => {
  const [tableData, setTableData] = useState<TableData>(mockData as TableData);
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
    <div className="app-container">
      <img src={backgroundIcon} alt="Logo" className="top-right-image" />
      <div className="title-container">
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            className="title-input"
            autoFocus
          />
        ) : (
          <h1
            className="title-heading"
            onClick={() => setIsEditing(true)}
          >
            {title}
          </h1>
        )}
      </div>

      <div className="add-task-container">
        <AddTaskButton onAddTask={handleAddTask} />
      </div>

      <div>
        <DataTable data={tableData} onDataChange={setTableData} />
      </div>
    </div>
  );
};

export default App;