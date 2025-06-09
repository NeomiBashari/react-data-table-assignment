import { faker } from '@faker-js/faker';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const statuses = ['Todo', 'In progress', 'On hold', 'Canceled', 'Done'];
const priorities = ['High', 'Medium', 'Low'];
const taskTypes = ['Execution', 'Inspection', 'Planning', 'Maintenance'];
const floorCounts = ['1–20', '21–40', '41+'];

function generateRow() {
  const startDate = faker.date.between({ from: '2025-05-06', to: '2025-08-08' });
  const dueDate = faker.date.soon({ days: 60, refDate: startDate });
  return {
    owner: faker.person.fullName(),
    floorCount: faker.helpers.arrayElement(floorCounts),
    timeline: '',
    startDate: startDate.toISOString().split('T')[0],
    dueDate: dueDate.toISOString().split('T')[0],
    status: faker.helpers.arrayElement(statuses),
    requiresManagerApproval: faker.datatype.boolean(),
    taskType: faker.helpers.arrayElement(taskTypes),
    priority: faker.helpers.arrayElement(priorities),
  };
}

const data = Array.from({ length: 25 }, generateRow);

writeFileSync(
  resolve(__dirname, '../assets/mockData.json'),
  JSON.stringify(data, null, 2),
  'utf-8'
);

console.log('Mock data generated!');
