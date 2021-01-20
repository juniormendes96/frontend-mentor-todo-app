import { makeLocalStorageAdapter } from '@/main/factories/cache';
import { LocalCreateTodo } from '@/data/usecases';
import { CreateTodo } from '@/domain/usecases';

export const makeLocalCreateTodo = (): CreateTodo => new LocalCreateTodo(makeLocalStorageAdapter(), makeLocalStorageAdapter());
