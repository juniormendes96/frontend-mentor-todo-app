import faker from 'faker';

import { CreateTodoParams, SaveTodos } from '@/domain/usecases';
import { Todo } from '../models';

export class SaveTodosSpy implements SaveTodos {
  callsCount = 0;
  params: CreateTodoParams;

  create(params: CreateTodoParams): Promise<Todo> {
    this.callsCount++;
    this.params = params;

    return Promise.resolve({
      id: faker.random.number(),
      description: params.description,
      completed: params.completed
    });
  }
  toggle(id: number): Promise<Todo> {
    return Promise.resolve(null);
  }
}
