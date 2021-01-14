import { Todo } from './../models/todo';

export interface RemoveTodos {
  remove(id: number): void;
  clearCompleted(): Todo[];
}
