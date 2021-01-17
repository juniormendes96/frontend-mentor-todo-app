import { mockTodos } from './mock-todos';
import { ViewTodos, ViewTodosFilters } from '@/domain/usecases';
import { Todo } from '../models';

export class ViewTodosSpy implements ViewTodos {
  callsCount = 0;
  filters: ViewTodosFilters;
  todos = mockTodos();

  filter(filters: ViewTodosFilters): Promise<Todo[]> {
    this.callsCount++;
    this.filters = filters;
    return Promise.resolve(this.todos);
  }
}
