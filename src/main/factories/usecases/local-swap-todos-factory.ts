import { LocalSwapTodos } from '@/data/usecases';
import { SwapTodos } from '@/domain/usecases';
import { makeLocalStorageAdapter } from '@/main/factories/cache';

export const makeLocalSwapTodos = (): SwapTodos => new LocalSwapTodos(makeLocalStorageAdapter(), makeLocalStorageAdapter());
