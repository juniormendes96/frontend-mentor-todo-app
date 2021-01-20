import { Todo } from '@/domain/models';
import { FilterTodos, FilterTodosFilters, FilterTodosStatus } from '@/domain/usecases';
import { GetStorage } from '@/data/protocols/cache';

export class LocalFilterTodos implements FilterTodos {
  constructor(private readonly getStorage: GetStorage) {}

  async invoke(filters?: FilterTodosFilters): Promise<Todo[]> {
    const todos: Todo[] = this.getStorage.get('todos') || [];

    if (filters?.status === FilterTodosStatus.ACTIVE) {
      return todos.filter(todo => !todo.completed);
    }
    if (filters?.status === FilterTodosStatus.COMPLETED) {
      return todos.filter(todo => todo.completed);
    }
    return todos;
  }
}
