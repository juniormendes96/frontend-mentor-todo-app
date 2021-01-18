import { CreateTodoParams, SaveTodos } from '@/domain/usecases';
import { Todo } from '../models';

export class SaveTodosSpy implements SaveTodos {
  callsCount = 0;
  params: CreateTodoParams;

  create(params: CreateTodoParams): Promise<Todo> {
    this.callsCount++;
    this.params = params;
    return Promise.resolve(null);
  }
  toggle(id: number): Promise<Todo> {
    return Promise.resolve(null);
  }
}
