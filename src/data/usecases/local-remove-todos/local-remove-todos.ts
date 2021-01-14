import { GetStorage, SetStorage } from '@/data/protocols/cache';
import { Todo } from '@/domain/models';
import { RemoveTodos } from '@/domain/usecases';

export class LocalRemoveTodos implements RemoveTodos {
  constructor(private readonly getStorage: GetStorage, private readonly setStorage: SetStorage) {}

  remove(id: number): void {
    const filteredTodos = this.getTodosFromStorage().filter(todo => todo.id !== id);
    this.setStorage.set('todos', filteredTodos);
  }

  clearCompleted(): Todo[] {
    const filteredTodos = this.getTodosFromStorage().filter(todo => !todo.completed);
    this.setStorage.set('todos', filteredTodos);
    return filteredTodos;
  }

  private getTodosFromStorage(): Todo[] {
    return this.getStorage.get('todos') || [];
  }
}
