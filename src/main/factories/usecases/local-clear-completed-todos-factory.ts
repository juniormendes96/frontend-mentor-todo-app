import { LocalClearCompletedTodos } from '@/data/usecases';
import { ClearCompletedTodos } from '@/domain/usecases';
import { makeLocalStorageAdapter } from '../cache';

export const makeLocalClearCompletedTodos = (): ClearCompletedTodos =>
  new LocalClearCompletedTodos(makeLocalStorageAdapter(), makeLocalStorageAdapter());
