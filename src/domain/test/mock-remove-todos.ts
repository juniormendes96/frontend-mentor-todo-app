import { RemoveTodos } from '@/domain/usecases';
import { Todo } from '../models';

export class RemoveTodosSpy implements RemoveTodos {
  remove(id: number): void {}
  clearCompleted(): Todo[] {
    return [];
  }
}
