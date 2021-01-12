import { Todo } from '../models/todo';

export enum ViewTodoListResultType {
  ALL,
  ACTIVE,
  COMPLETED
}

export type ViewTodoListFilters = {
  resultType?: ViewTodoListResultType;
};

export interface ViewTodoList {
  filter(filters: ViewTodoListFilters): Promise<Todo[]>;
}
