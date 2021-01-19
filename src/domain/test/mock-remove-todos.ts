import { RemoveTodos } from '@/domain/usecases';
import { Todo } from '../models';
import { mockActiveTodos } from './mock-todos';

export class RemoveTodosSpy implements RemoveTodos {
  removeCallsCount = 0;
  clearCompletedCallsCount = 0;
  id: number;

  remove(id: number): void {
    this.id = id;
    this.removeCallsCount++;
  }

  clearCompleted(): Todo[] {
    this.clearCompletedCallsCount++;
    return mockActiveTodos();
  }
}
