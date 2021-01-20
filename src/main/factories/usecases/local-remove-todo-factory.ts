import { LocalRemoveTodo } from '@/data/usecases';
import { RemoveTodo } from '@/domain/usecases';
import { makeLocalStorageAdapter } from '../cache';

export const makeLocalRemoveTodo = (): RemoveTodo => new LocalRemoveTodo(makeLocalStorageAdapter(), makeLocalStorageAdapter());
