import { LocalRemoveTodo } from '@/data/usecases';
import { RemoveTodo } from '@/domain/usecases';
import { makeLocalStorageAdapter } from '@/main/factories/cache';

export const makeLocalRemoveTodo = (): RemoveTodo => new LocalRemoveTodo(makeLocalStorageAdapter(), makeLocalStorageAdapter());
