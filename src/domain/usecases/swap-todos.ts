import { Todo } from '@/domain/models';

export interface SwapTodos {
  invoke(id: number, newIndex: number): Promise<Todo[]>;
}
