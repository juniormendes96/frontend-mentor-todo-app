import { Todo } from '../models/todo';

enum ResultType {
  ALL,
  ACTIVE,
  COMPLETED
}

type Filters = {
  resultType?: ResultType;
};

export interface ViewTodoList {
  filter(filters: Filters): Promise<Todo[]>;
}
