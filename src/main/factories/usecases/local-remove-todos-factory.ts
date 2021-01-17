import { LocalRemoveTodos } from '@/data/usecases';
import { RemoveTodos } from '@/domain/usecases';
import { makeLocalStorageAdapter } from '../cache';

export const makeLocalRemoveTodos = (): RemoveTodos => new LocalRemoveTodos(makeLocalStorageAdapter(), makeLocalStorageAdapter());
