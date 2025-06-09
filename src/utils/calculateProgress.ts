export const calculateProgressPercentage = (startDate: string, dueDate: string, status: string): number => {
  if (status === 'Done') return 100;
  if (status === 'Canceled') return 0;

  const start = new Date(startDate).getTime();
  const due = new Date(dueDate).getTime();
  const now = Date.now();

  if (now <= start) return 0;
  if (now >= due) return 100;

  const progress = ((now - start) / (due - start)) * 100;
  return Math.min(Math.max(progress, 0), 100); 
};