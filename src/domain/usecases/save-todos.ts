import { Todo } from '../models';

export type CreateTodoParams = {
  description: string;
  completed: boolean;
};

export interface SaveTodos {
  create(params: CreateTodoParams): Promise<Todo>;
  toggle(id: number): Promise<boolean>;
}
