import { mockTodos } from './mock-todos';
import { FilterTodos, FilterTodosFilters } from '@/domain/usecases';
import { Todo } from '../models';

export class FilterTodosSpy implements FilterTodos {
  callsCount = 0;
  filters: FilterTodosFilters;
  todos = mockTodos();

  invoke(filters: FilterTodosFilters): Promise<Todo[]> {
    this.callsCount++;
    this.filters = filters;
    return Promise.resolve(this.todos);
  }
}
