import faker from 'faker';

import { mockCreateTodoParams, mockTodo, mockTodos } from '@/domain/test';
import { GetStorageSpy, SetStorageSpy } from '@/data/test';
import { LocalSaveTodos } from '@/data/usecases';
import { Todo } from '@/domain/models';

type SutTypes = {
  sut: LocalSaveTodos;
  getStorageSpy: GetStorageSpy;
  setStorageSpy: SetStorageSpy;
};

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();
  getStorageSpy.value = [];

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

    test('Should save todo with correct values', async () => {
      const { sut, getStorageSpy, setStorageSpy } = makeSut();

      getStorageSpy.value = null;

      const todoParams = mockCreateTodoParams();
      const todo = await sut.create(todoParams);

      expect(todo.id).toBe(1);
      expect(todo.description).toBe(todoParams.description);
      expect(todo.completed).toBe(todoParams.completed);

      expect(setStorageSpy.value).toEqual([todo]);
    });

    test('Should generate next id and insert todo to beginning of list', async () => {
      const { sut, getStorageSpy, setStorageSpy } = makeSut();

      getStorageSpy.value = mockTodos();

      const todoA = await sut.create(mockCreateTodoParams());

      expect(todoA.id).toBe(5);
      expect(setStorageSpy.value.length).toBe(5);
      expect(setStorageSpy.value[0]).toEqual(todoA);

      getStorageSpy.value = [...mockTodos(), { ...mockTodo(), id: 999 }] as Todo[];

      const todoB = await sut.create(mockCreateTodoParams());

      expect(todoB.id).toBe(1000);
      expect(setStorageSpy.value.length).toBe(6);
      expect(setStorageSpy.value[0]).toEqual(todoB);
    });
  });

  describe('toggle', () => {
    test('Should call SetStorage and GetStorage with correct key', async () => {
      const { sut, getStorageSpy, setStorageSpy } = makeSut();

      await sut.toggle(faker.random.number());

      expect(getStorageSpy.key).toBe('todos');
      expect(setStorageSpy.key).toBe('todos');
    });
  });
});
