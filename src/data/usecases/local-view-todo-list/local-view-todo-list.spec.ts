import faker from 'faker';

import { GetStorageSpy } from '@/data/test';
import { LocalViewTodoList } from '@/data/usecases';
import { mockTodos } from '@/domain/test';
import { ViewTodoListStatus } from '@/domain/usecases';

type SutTypes = {
  sut: LocalViewTodoList;
  getStorageSpy: GetStorageSpy;
};

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();
  const sut = new LocalViewTodoList(getStorageSpy);

  return {
    sut,
    getStorageSpy
  };
};

describe('LocalViewTodoList', () => {
  test('Should call GetStorage with correct key', async () => {
    const { sut, getStorageSpy } = makeSut();

    await sut.filter();
    expect(getStorageSpy.key).toBe('todos');
  });

  test('Should return correct value from GetStorage', async () => {
    const { sut, getStorageSpy } = makeSut();
    const result = await sut.filter();
    expect(result).toEqual(getStorageSpy.value);
  });

  test('Should return all todos', async () => {
    const { sut, getStorageSpy } = makeSut();

    const todos = mockTodos();
    getStorageSpy.value = todos;

    const resultA = await sut.filter();
    const resultB = await sut.filter({ status: ViewTodoListStatus.ALL });

    expect(resultA).toEqual(todos);
    expect(resultB).toEqual(todos);
  });

  test('Should return only active (non-completed) todos', async () => {
    const { sut, getStorageSpy } = makeSut();

    getStorageSpy.value = mockTodos();

    const result = await sut.filter({ status: ViewTodoListStatus.ACTIVE });

    expect(result.filter(todo => todo.completed).length).toBe(0);
    expect(result.filter(todo => !todo.completed).length).toBeGreaterThan(0);
  });

  test('Should return only completed todos', async () => {
    const { sut, getStorageSpy } = makeSut();

    getStorageSpy.value = mockTodos();

    const result = await sut.filter({ status: ViewTodoListStatus.COMPLETED });

    expect(result.filter(todo => !todo.completed).length).toBe(0);
    expect(result.filter(todo => todo.completed).length).toBeGreaterThan(0);
  });
});
