import { Todo } from './../../../domain/models/todo';
import { GetStorageSpy, SetStorageSpy } from '@/data/test';
import { LocalRemoveTodos } from '@/data/usecases';
import { mockTodos } from '@/domain/test';

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

    test('Should remove todo', async () => {
      const { sut, getStorageSpy, setStorageSpy } = makeSut();

      getStorageSpy.value = mockTodos();

      await sut.remove(1);

      expect((setStorageSpy.value as Todo[]).length).toBe(3);
      expect((setStorageSpy.value as Todo[]).filter(todo => todo.id === 1).length).toBe(0);
    });
  });

  describe('clearCompleted', () => {
    test('Should call GetStorage and SetStorage with correct key', async () => {
      const { sut, getStorageSpy, setStorageSpy } = makeSut();

      await sut.clearCompleted();

      expect(getStorageSpy.key).toBe('todos');
      expect(setStorageSpy.key).toBe('todos');
    });
  });
});
