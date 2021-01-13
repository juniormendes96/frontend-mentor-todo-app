import { Todo } from '@/domain/models';

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
