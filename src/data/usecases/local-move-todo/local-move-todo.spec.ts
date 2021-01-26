import faker from 'faker';

import { GetStorageSpy, SetStorageSpy } from '@/data/test';
import { LocalMoveTodo } from '@/data/usecases';

type SutTypes = {
  sut: LocalMoveTodo;
  setStorageSpy: SetStorageSpy;
  getStorageSpy: GetStorageSpy;
};

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();
  const setStorageSpy = new SetStorageSpy();
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
});
