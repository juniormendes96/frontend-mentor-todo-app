import { RemoveTodos } from '@/domain/usecases';
import { Todo } from '../models';

export class RemoveTodosSpy implements RemoveTodos {
  callsCount = 0;
  id: number;

  remove(id: number): void {
    this.id = id;
    this.callsCount++;
  }

  clearCompleted(): Todo[] {
    return [];
  }
}
