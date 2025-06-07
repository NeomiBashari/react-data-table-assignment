export interface TableRow {
  responsibleName: string;
  taskDescription: string;
  projectName: string;
  floorCount: '1–20' | '21–40' | '41+';
  status: 'todo' | 'in progress' | 'on hold' | 'canceled' | 'done';
  startDate: string; 
  dueDate: string; 
  requiresManagerApproval: boolean;
  taskType: 'Execution' | 'Inspection' | 'Planning' | 'Maintenance';
  priority: 1 | 2 | 3 | 4 | 5 | 'Low' | 'Medium' | 'High';
  [key: string]: any;
}

export type TableData = TableRow[];