import { Todo } from '@/domain/models';

export type CreateTodoParams = {
  description: string;
  completed: boolean;
};

export interface CreateTodo {
  invoke(params: CreateTodoParams): Promise<Todo>;
}
