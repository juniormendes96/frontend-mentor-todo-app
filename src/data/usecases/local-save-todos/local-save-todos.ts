import { GetStorage, SetStorage } from '@/data/protocols/cache';
import { Todo } from '@/domain/models';
import { SaveTodos, CreateTodoParams } from '@/domain/usecases';

export class LocalSaveTodos implements SaveTodos {
  constructor(private readonly getStorage: GetStorage, private readonly setStorage: SetStorage) {}

  create(params: CreateTodoParams): Promise<Todo> {
    this.setStorage.set('todos', null);
    return null;
  }
}
