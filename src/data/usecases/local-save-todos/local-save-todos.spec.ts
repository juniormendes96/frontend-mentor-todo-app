import { mockCreateTodoParams } from './../../../domain/test/mock-todos';
import { GetStorageSpy, SetStorageSpy } from '@/data/test';
import { LocalSaveTodos } from '@/data/usecases';

type SutTypes = {
  sut: LocalSaveTodos;
  getStorageSpy: GetStorageSpy;
  setStorageSpy: SetStorageSpy;
};

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();
  const setStorageSpy = new SetStorageSpy();
  const sut = new LocalSaveTodos(getStorageSpy, setStorageSpy);

  return {
    sut,
    getStorageSpy,
    setStorageSpy
  };
};

describe('LocalSaveTodos', () => {
  describe('create', () => {
    test('Should call SetStorage and GetStorage with correct key', async () => {
      const { sut, getStorageSpy, setStorageSpy } = makeSut();

      await sut.create(mockCreateTodoParams());

      expect(getStorageSpy.key).toBe('todos');
      expect(setStorageSpy.key).toBe('todos');
    });
  });
});
