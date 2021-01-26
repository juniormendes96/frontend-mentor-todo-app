import faker from 'faker';

import { GetStorageSpy, SetStorageSpy } from '@/data/test';
import { LocalMoveTodo } from '@/data/usecases';
import { mockTodos } from '@/domain/test';

type SutTypes = {
  sut: LocalMoveTodo;
  setStorageSpy: SetStorageSpy;
  getStorageSpy: GetStorageSpy;
};

const makeSut = (): SutTypes => {
  const setStorageSpy = new SetStorageSpy();
  const getStorageSpy = new GetStorageSpy();
  getStorageSpy.value = mockTodos();

  const sut = new LocalMoveTodo(getStorageSpy, setStorageSpy);

  return {
    sut,
    getStorageSpy,
    setStorageSpy
  };
};

describe('LocalMoveTodo', () => {
  test('Should call GetStorage and SetStorage with correct key', async () => {
    const { sut, getStorageSpy, setStorageSpy } = makeSut();

    await sut.invoke(faker.random.number(), faker.random.number());

    expect(getStorageSpy.key).toBe('todos');
    expect(setStorageSpy.key).toBe('todos');
  });

  test('Should move todo to the new position', async () => {
    const { sut, setStorageSpy } = makeSut();

    const reorderedTodos = await sut.invoke(1, 1);

    expect(reorderedTodos[0].id).toBe(2);
    expect(reorderedTodos[1].id).toBe(1);
    expect(setStorageSpy.value).toEqual(reorderedTodos);
  });
});
