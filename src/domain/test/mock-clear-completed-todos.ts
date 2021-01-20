import { ClearCompletedTodos } from '@/domain/usecases';

export class ClearCompletedTodosSpy implements ClearCompletedTodos {
  callsCount = 0;

  invoke(): Promise<void> {
    this.callsCount++;
    return Promise.resolve();
  }
}
