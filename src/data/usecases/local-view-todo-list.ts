import { Todo } from '../../domain/models/todo';
import { ViewTodoList, ViewTodoListFilters } from '../../domain/usecases/view-todo-list';
import { GetStorage } from '../protocols/cache/get-storage';

export class LocalViewTodoList implements ViewTodoList {
  constructor(private readonly getStorage: GetStorage) {}

  async filter(filters?: ViewTodoListFilters): Promise<Todo[]> {
    return this.getStorage.get('todos');
  }
}
