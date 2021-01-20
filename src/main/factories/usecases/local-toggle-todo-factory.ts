import { LocalToggleTodo } from '@/data/usecases';
import { ToggleTodo } from '@/domain/usecases';
import { makeLocalStorageAdapter } from '@/main/factories/cache';

export const makeLocalToggleTodo = (): ToggleTodo => new LocalToggleTodo(makeLocalStorageAdapter(), makeLocalStorageAdapter());
