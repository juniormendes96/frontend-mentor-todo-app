import { GetStorage, SetStorage } from '@/data/protocols/cache';
import { Todo } from '@/domain/models';
import { SaveTodos, CreateTodoParams } from '@/domain/usecases';

export class LocalSaveTodos implements SaveTodos {
  constructor(private readonly getStorage: GetStorage, private readonly setStorage: SetStorage) {}

  create(params: CreateTodoParams): Promise<Todo> {
    const todo: Todo = {
      id: 1,
      description: params.description,
      completed: params.completed
    };

    this.getStorage.get('todos');
    this.setStorage.set('todos', [todo]);

    return Promise.resolve(todo);
  }
}
