import { GetStorage, SetStorage } from '@/data/protocols/cache';
import { Todo } from '@/domain/models';
import { RemoveTodos } from '@/domain/usecases';

export class LocalRemoveTodos implements RemoveTodos {
  constructor(private readonly getStorage: GetStorage, private readonly setStorage: SetStorage) {}

  remove(id: number): void {
    const todos: Todo[] = this.getStorage.get('todos') || [];
    const filteredTodos = todos.filter(todo => todo.id !== id);
    this.setStorage.set('todos', filteredTodos);
  }

  clearCompleted(): Todo[] {
    return [];
  }
}
