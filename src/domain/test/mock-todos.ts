import faker from 'faker';
import { Todo } from '@/domain/models';

export const mockTodos = (): Todo[] => [
  {
    description: faker.random.words(),
    completed: true
  },
  {
    description: faker.random.words(),
    completed: false
  },
  {
    description: faker.random.words(),
    completed: true
  },
  {
    description: faker.random.words(),
    completed: false
  }
];
