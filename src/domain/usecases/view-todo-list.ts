import { Todo } from '@/domain/models';

export enum ViewTodoListStatus {
  ALL,
  ACTIVE,
  COMPLETED
}

export type ViewTodoListFilters = {
  status?: ViewTodoListStatus;
};

export interface ViewTodoList {
  filter(filters: ViewTodoListFilters): Promise<Todo[]>;
}
