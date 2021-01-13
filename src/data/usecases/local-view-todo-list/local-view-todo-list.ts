import { Todo } from '@/domain/models';
import { ViewTodoList, ViewTodoListFilters, ViewTodoListStatus } from '@/domain/usecases';
import { GetStorage } from '@/data/protocols/cache';

export class LocalViewTodoList implements ViewTodoList {
  constructor(private readonly getStorage: GetStorage) {}

  async filter(filters?: ViewTodoListFilters): Promise<Todo[]> {
    const todos: Todo[] = this.getStorage.get('todos');

    if (filters?.status === ViewTodoListStatus.ACTIVE) {
      return todos.filter(todo => !todo.completed);
    }
    return this.getStorage.get('todos');
  }
}
