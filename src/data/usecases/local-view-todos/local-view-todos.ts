import { Todo } from '@/domain/models';
import { ViewTodos, ViewTodosFilters, ViewTodosStatus } from '@/domain/usecases';
import { GetStorage } from '@/data/protocols/cache';

export class LocalViewTodos implements ViewTodos {
  constructor(private readonly getStorage: GetStorage) {}

  async filter(filters?: ViewTodosFilters): Promise<Todo[]> {
    const todos: Todo[] = this.getStorage.get('todos') || [];

    if (filters?.status === ViewTodosStatus.ACTIVE) {
      return todos.filter(todo => !todo.completed);
    }
    if (filters?.status === ViewTodosStatus.COMPLETED) {
      return todos.filter(todo => todo.completed);
    }
    return todos;
  }
}
