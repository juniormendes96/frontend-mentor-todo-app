import { Todo } from '@/domain/models';

export interface MoveTodo {
  invoke(id: number, newIndex: number): Promise<Todo[]>;
}
