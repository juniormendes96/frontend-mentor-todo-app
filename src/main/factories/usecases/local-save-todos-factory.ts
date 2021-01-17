import { LocalSaveTodos } from '@/data/usecases';
import { SaveTodos } from '@/domain/usecases';
import { makeLocalStorageAdapter } from '@/main/factories/cache';

export const makeLocalSaveTodos = (): SaveTodos => new LocalSaveTodos(makeLocalStorageAdapter(), makeLocalStorageAdapter());
