import { RemoveTodo } from '@/domain/usecases';

export class RemoveTodoSpy implements RemoveTodo {
  callsCount = 0;
  id: number;

  invoke(id: number): Promise<void> {
    this.id = id;
    this.callsCount++;
    return Promise.resolve();
  }
}
