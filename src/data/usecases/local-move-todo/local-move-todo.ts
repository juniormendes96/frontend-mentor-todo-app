import { GetStorage, SetStorage } from '@/data/protocols/cache';
import { Todo } from '@/domain/models';
import { MoveTodo } from '@/domain/usecases';

export class LocalMoveTodo implements MoveTodo {
  constructor(private readonly getStorage: GetStorage, private readonly setStorage: SetStorage) {}

  invoke(id: number, newIndex: number): Promise<Todo[]> {
    this.getStorage.get('todos');
    this.setStorage.set('todos', []);
    return Promise.resolve([]);
  }
}
