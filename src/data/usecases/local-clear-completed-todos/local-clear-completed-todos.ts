import { GetStorage, SetStorage } from '@/data/protocols/cache';
import { Todo } from '@/domain/models';
import { ClearCompletedTodos } from '@/domain/usecases';

export class LocalClearCompletedTodos implements ClearCompletedTodos {
  constructor(private readonly getStorage: GetStorage, private readonly setStorage: SetStorage) {}

  invoke(): Promise<void> {
    const filteredTodos = this.getTodosFromStorage().filter(todo => !todo.completed);
    this.setStorage.set('todos', filteredTodos);
    return Promise.resolve();
  }

  private getTodosFromStorage(): Todo[] {
    return this.getStorage.get('todos') || [];
  }
}
