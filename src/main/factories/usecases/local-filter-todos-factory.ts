import { LocalFilterTodos } from '@/data/usecases';
import { FilterTodos } from '@/domain/usecases';
import { makeLocalStorageAdapter } from '@/main/factories/cache';

export const makeLocalFilterTodos = (): FilterTodos => new LocalFilterTodos(makeLocalStorageAdapter());
