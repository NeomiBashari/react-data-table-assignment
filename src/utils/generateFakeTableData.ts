import type { TableData } from '../types/table';

export const generateFakeTableData = (): TableData => {
  return [
    {
      responsibleName: 'Yossi Cohen',
      taskDescription: 'Foundation inspection',
      projectName: 'Luxury Towers',
      floorCount: '21–40',
      status: 'in progress',
      startDate: '2023-10-01',
      dueDate: '2023-10-15',
      requiresManagerApproval: true,
      taskType: 'Inspection',
      priority: 'High',
    },
    {
      responsibleName: 'Dana Levi',
      taskDescription: 'Electrical planning',
      projectName: 'Office Building',
      floorCount: '1–20',
      status: 'todo',
      startDate: '2023-10-05',
      dueDate: '2023-10-20',
      requiresManagerApproval: false,
      taskType: 'Planning',
      priority: 'Medium',
    },
    {
      responsibleName: 'Avi Israeli',
      taskDescription: 'Elevator maintenance',
      projectName: 'Central Mall',
      floorCount: '41+',
      status: 'on hold',
      startDate: '2023-09-15',
      dueDate: '2023-10-10',
      requiresManagerApproval: true,
      taskType: 'Maintenance',
      priority: 3,
    },
  ];
};