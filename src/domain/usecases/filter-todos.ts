import { Todo } from '@/domain/models';

export enum FilterTodosStatus {
  ALL,
  ACTIVE,
  COMPLETED
}

export type FilterTodosFilters = {
  status?: FilterTodosStatus;
};

export interface FilterTodos {
  invoke(filters: FilterTodosFilters): Promise<Todo[]>;
}
