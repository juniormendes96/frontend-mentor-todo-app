import faker from 'faker';

import { mockTodo } from '@/domain/test';
import { CreateTodoParams, SaveTodos } from '@/domain/usecases';
import { Todo } from '@/domain/models';

export class SaveTodosSpy implements SaveTodos {
  id: number;
  createCallsCount = 0;
  toggleCallsCount = 0;
  params: CreateTodoParams;
  completed = faker.random.boolean();

  create(params: CreateTodoParams): Promise<Todo> {
    this.createCallsCount++;
    this.params = params;

    return Promise.resolve({
      id: faker.random.number(),
      description: params.description,
      completed: params.completed
    });
  }

  toggle(id: number): Promise<boolean> {
    this.id = id;
    this.toggleCallsCount++;
    return Promise.resolve(this.completed);
  }
}
