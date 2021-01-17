import { LocalViewTodos } from '@/data/usecases';
import { ViewTodos } from '@/domain/usecases';
import { makeLocalStorageAdapter } from '../cache';

export const makeLocalViewTodos = (): ViewTodos => new LocalViewTodos(makeLocalStorageAdapter());
