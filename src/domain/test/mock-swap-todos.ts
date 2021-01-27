import { Todo } from '@/domain/models';
import { SwapTodos } from '@/domain/usecases';

export class SwapTodosSpy implements SwapTodos {
  callsCount = 0;
  id: number;
  newPosition: number;

  invoke(id: number, newPosition: number): Promise<Todo[]> {
    this.id = id;
    this.newPosition = newPosition;
    this.callsCount++;
    return Promise.resolve([]);
  }
}
