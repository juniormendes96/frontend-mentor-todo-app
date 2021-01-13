import { Todo } from '@/domain/models';
import { ViewTodoList, ViewTodoListFilters } from '@/domain/usecases';
import { GetStorage } from '@/data/protocols/cache';

export class LocalViewTodoList implements ViewTodoList {
  constructor(private readonly getStorage: GetStorage) {}

  async filter(filters?: ViewTodoListFilters): Promise<Todo[]> {
    return this.getStorage.get('todos');
  }
}
