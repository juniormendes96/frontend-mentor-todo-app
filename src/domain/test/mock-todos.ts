import faker from 'faker';
import { Todo } from '@/domain/models';

export const mockTodos = (): Todo[] => [
  {
    id: 1,
    description: faker.random.words(),
    completed: true
  },
  {
    id: 2,
    description: faker.random.words(),
    completed: false
  },
  {
    id: 3,
    description: faker.random.words(),
    completed: true
  },
  {
    id: 4,
    description: faker.random.words(),
    completed: false
  }
];
