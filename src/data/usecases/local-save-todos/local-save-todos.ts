import { GetStorage, SetStorage } from '@/data/protocols/cache';
import { Todo } from '@/domain/models';
import { SaveTodos, CreateTodoParams } from '@/domain/usecases';

export class LocalSaveTodos implements SaveTodos {
  constructor(private readonly getStorage: GetStorage, private readonly setStorage: SetStorage) {}

  toggle(id: number): Promise<Todo> {
    const todos = this.getTodosFromStorage();
    const todo = todos.find(todo => todo.id === id);
    todo.completed = !todo.completed;

    this.setStorage.set('todos', todos);
    return Promise.resolve(todo);
  }

  create(params: CreateTodoParams): Promise<Todo> {
    const todos: Todo[] = this.getTodosFromStorage();

    const todo: Todo = {
      id: this.getNextId(todos),
      description: params.description,
      completed: params.completed
    };

    this.setStorage.set('todos', [todo, ...todos]);
    return Promise.resolve(todo);
  }

  private getNextId(todos: Todo[]): number {
    if (!todos.length) {
      return 1;
    }

    return Math.max(...todos.map(todo => todo.id)) + 1;
  }

  private getTodosFromStorage(): Todo[] {
    return this.getStorage.get('todos') || [];
  }
}
