import { GetStorageSpy, SetStorageSpy } from '@/data/test';
import { LocalRemoveTodos } from '@/data/usecases';

type SutTypes = {
  sut: LocalRemoveTodos;
  setStorageSpy: SetStorageSpy;
  getStorageSpy: GetStorageSpy;
};

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();
  const setStorageSpy = new SetStorageSpy();
  const sut = new LocalRemoveTodos(getStorageSpy, setStorageSpy);

  return {
    sut,
    getStorageSpy,
    setStorageSpy
  };
};

describe('LocalRemoveTodos', () => {
  describe('remove', () => {
    test('Should call GetStorage and SetStorage with correct key', async () => {
      const { sut, getStorageSpy, setStorageSpy } = makeSut();

      await sut.remove(1);

      expect(getStorageSpy.key).toBe('todos');
      expect(setStorageSpy.key).toBe('todos');
    });
  });
});
