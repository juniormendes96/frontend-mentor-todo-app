import { GetStorage, SetStorage } from '@/data/protocols/cache';
import { Todo } from '@/domain/models';
import { SwapTodos } from '@/domain/usecases';

export class LocalSwapTodos implements SwapTodos {
  constructor(private readonly getStorage: GetStorage, private readonly setStorage: SetStorage) {}

  invoke(id: number, newIndex: number): Promise<Todo[]> {
    const todos = this.getTodosFromStorage();
    const todo = todos.find(todo => todo.id === id);
    const oldPositionTodo = todos[newIndex];
    const oldIndex = todos.indexOf(todo);

    todos[newIndex] = todo;
    todos[oldIndex] = oldPositionTodo;

    this.setStorage.set('todos', todos);
    return Promise.resolve(todos);
  }

  private getTodosFromStorage(): Todo[] {
    return this.getStorage.get('todos') || [];
  }
}
