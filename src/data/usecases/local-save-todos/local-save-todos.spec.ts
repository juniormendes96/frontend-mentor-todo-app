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

    test('Should save todo', async () => {
      const { sut, getStorageSpy, setStorageSpy } = makeSut();

      getStorageSpy.value = undefined;

      const todoParams = mockCreateTodoParams();
      const todo = await sut.create(todoParams);

      expect(todo.id).toBe(1);
      expect(todo.description).toBe(todoParams.description);
      expect(todo.completed).toBe(todoParams.completed);

      expect(setStorageSpy.value).toEqual([todo]);
    });
  });
});
