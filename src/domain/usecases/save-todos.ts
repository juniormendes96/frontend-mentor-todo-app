import { Todo } from '../models';

type CreateTodoParams = {
  description: string;
  completed: boolean;
};

export interface SaveTodos {
  create(params: CreateTodoParams): Todo;
}
