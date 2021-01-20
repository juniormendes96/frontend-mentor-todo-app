import { GetStorage, SetStorage } from '@/data/protocols/cache';
import { Todo } from '@/domain/models';
import { ToggleTodo } from '@/domain/usecases';

export class LocalToggleTodo implements ToggleTodo {
  constructor(private readonly getStorage: GetStorage, private readonly setStorage: SetStorage) {}

  invoke(id: number): Promise<boolean> {
    const todos = this.getTodosFromStorage();
    const todo = todos.find(todo => todo.id === id);
    todo.completed = !todo.completed;

    this.setStorage.set('todos', todos);
    return Promise.resolve(todo.completed);
  }

  private getTodosFromStorage(): Todo[] {
    return this.getStorage.get('todos') || [];
  }
}
