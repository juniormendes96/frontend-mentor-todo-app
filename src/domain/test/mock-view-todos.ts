import { mockTodos } from './mock-todos';
import { ViewTodos, ViewTodosFilters } from '@/domain/usecases';
import { Todo } from '../models';

export class ViewTodosSpy implements ViewTodos {
  callsCount = 0;
  todos = mockTodos();

  filter(filters: ViewTodosFilters): Promise<Todo[]> {
    this.callsCount++;
    return Promise.resolve(this.todos);
  }
}
