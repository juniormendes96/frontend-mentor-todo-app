import faker from 'faker';

import { CreateTodoParams } from '@/domain/usecases';
import { Todo } from '@/domain/models';

export const mockCreateTodoParams = (): CreateTodoParams => ({
  description: faker.random.words(),
  completed: faker.random.boolean()
});

export const mockTodo = (): Todo => ({
  id: faker.random.number(),
  description: faker.random.words(),
  completed: faker.random.boolean()
});

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

export const mockActiveTodos = (): Todo[] => [
  {
    id: 1,
    description: faker.random.words(),
    completed: false
  },
  {
    id: 2,
    description: faker.random.words(),
    completed: false
  }
];
