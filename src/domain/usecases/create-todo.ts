import { Todo } from './../models/todo';

export type CreateTodoParams = {
  description: string;
  completed: boolean;
};

export interface CreateTodo {
  invoke(params: CreateTodoParams): Promise<Todo>;
}
