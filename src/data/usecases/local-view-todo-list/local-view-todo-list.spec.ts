import { GetStorageSpy } from '@/data/test';
import { LocalViewTodos } from '@/data/usecases';
import { mockTodos } from '@/domain/test';
import { ViewTodosStatus } from '@/domain/usecases';

type SutTypes = {
  sut: LocalViewTodos;
  getStorageSpy: GetStorageSpy;
};

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();
  getStorageSpy.value = mockTodos();

  const sut = new LocalViewTodos(getStorageSpy);

  return {
    sut,
    getStorageSpy
  };
};

describe('LocalViewTodo', () => {
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
    const resultB = await sut.filter({ status: ViewTodosStatus.ALL });

    expect(resultA).toEqual(todos);
    expect(resultB).toEqual(todos);
  });

  test('Should return only active (non-completed) todos', async () => {
    const { sut } = makeSut();

    const result = await sut.filter({ status: ViewTodosStatus.ACTIVE });

    expect(result.filter(todo => todo.completed).length).toBe(0);
    expect(result.filter(todo => !todo.completed).length).toBeGreaterThan(0);
  });

  test('Should return only completed todos', async () => {
    const { sut } = makeSut();

    const result = await sut.filter({ status: ViewTodosStatus.COMPLETED });

    expect(result.filter(todo => !todo.completed).length).toBe(0);
    expect(result.filter(todo => todo.completed).length).toBeGreaterThan(0);
  });
});
