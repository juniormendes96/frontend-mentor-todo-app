import faker from 'faker';

import { CreateTodoParams, CreateTodo } from '@/domain/usecases';
import { Todo } from '@/domain/models';

export class CreateTodoSpy implements CreateTodo {
  callsCount = 0;
  params: CreateTodoParams;

  invoke(params: CreateTodoParams): Promise<Todo> {
    this.callsCount++;
    this.params = params;

    return Promise.resolve({
      id: faker.random.number(),
      description: params.description,
      completed: params.completed
    });
  }
}
