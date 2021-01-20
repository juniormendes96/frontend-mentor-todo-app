import { Todo } from '../../../domain/models/todo';
import { GetStorageSpy, SetStorageSpy } from '@/data/test';
import { LocalClearCompletedTodos } from '@/data/usecases';
import { mockTodos } from '@/domain/test';

type SutTypes = {
  sut: LocalClearCompletedTodos;
  setStorageSpy: SetStorageSpy;
  getStorageSpy: GetStorageSpy;
};

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();
  const setStorageSpy = new SetStorageSpy();
  const sut = new LocalClearCompletedTodos(getStorageSpy, setStorageSpy);

  return {
    sut,
    getStorageSpy,
    setStorageSpy
  };
};

describe('LocalClearCompletedTodos', () => {
  test('Should call GetStorage and SetStorage with correct key', async () => {
    const { sut, getStorageSpy, setStorageSpy } = makeSut();

    await sut.invoke();

    expect(getStorageSpy.key).toBe('todos');
    expect(setStorageSpy.key).toBe('todos');
  });

  test('Should clear all completed todos', async () => {
    const { sut, getStorageSpy, setStorageSpy } = makeSut();

    getStorageSpy.value = mockTodos();

    await sut.invoke();

    expect((setStorageSpy.value as Todo[]).length).toBe(2);
    expect((setStorageSpy.value as Todo[]).filter(todo => todo.completed).length).toBe(0);
  });
});
