import { CreateTodoParams, SaveTodos } from '@/domain/usecases';
import { Todo } from '../models';

export class SaveTodosSpy implements SaveTodos {
  create(params: CreateTodoParams): Promise<Todo> {
    return Promise.resolve(null);
  }
  toggle(id: number): Promise<Todo> {
    return Promise.resolve(null);
  }
}
