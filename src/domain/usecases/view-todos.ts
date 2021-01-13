import { Todo } from '@/domain/models';

export enum ViewTodosStatus {
  ALL,
  ACTIVE,
  COMPLETED
}

export type ViewTodosFilters = {
  status?: ViewTodosStatus;
};

export interface ViewTodos {
  filter(filters: ViewTodosFilters): Promise<Todo[]>;
}
