import { mockCreateTodoParams } from './../../../domain/test/mock-todos';
import { GetStorageSpy, SetStorageSpy } from '@/data/test';
import { LocalSaveTodos } from '@/data/usecases';

type SutTypes = {
  sut: LocalSaveTodos;
  setStorageSpy: SetStorageSpy;
};

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();
  const setStorageSpy = new SetStorageSpy();
  const sut = new LocalSaveTodos(getStorageSpy, setStorageSpy);

  return {
    sut,
    setStorageSpy
  };
};

describe('LocalSaveTodos', () => {
  describe('create', () => {
    test('Should call SetStorage with correct key', async () => {
      const { sut, setStorageSpy } = makeSut();

      await sut.create(mockCreateTodoParams());

      expect(setStorageSpy.key).toBe('todos');
    });
  });
});
