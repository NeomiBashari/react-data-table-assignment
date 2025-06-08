export interface TableRow {
  owner: string;
  floorCount: '' | '1–20' | '21–40' | '41+';
  status: 'Todo' | 'In progress' | 'On hold' | 'Canceled' | 'Done';
  startDate: string; 
  dueDate: string; 
  requiresManagerApproval: boolean;
  taskType: '' | 'Execution' | 'Inspection' | 'Planning' | 'Maintenance';
  priority: '' | 'Low' | 'Medium' | 'High';
  [key: string]: any;
}

export type TableData = TableRow[];