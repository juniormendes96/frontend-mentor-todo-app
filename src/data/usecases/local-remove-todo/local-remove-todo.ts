import { GetStorage, SetStorage } from '@/data/protocols/cache';
import { Todo } from '@/domain/models';
import { RemoveTodo } from '@/domain/usecases';

export class LocalRemoveTodo implements RemoveTodo {
  constructor(private readonly getStorage: GetStorage, private readonly setStorage: SetStorage) {}

  invoke(id: number): Promise<void> {
    const filteredTodos = this.getTodosFromStorage().filter(todo => todo.id !== id);
    this.setStorage.set('todos', filteredTodos);
    return Promise.resolve();
  }

  private getTodosFromStorage(): Todo[] {
    return this.getStorage.get('todos') || [];
  }
}
