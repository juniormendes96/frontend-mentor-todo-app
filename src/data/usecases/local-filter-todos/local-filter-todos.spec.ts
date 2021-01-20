import { GetStorageSpy } from '@/data/test';
import { LocalFilterTodos } from '@/data/usecases';
import { mockTodos } from '@/domain/test';
import { FilterTodosStatus } from '@/domain/usecases';

type SutTypes = {
  sut: LocalFilterTodos;
  getStorageSpy: GetStorageSpy;
};

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();
  getStorageSpy.value = mockTodos();

  const sut = new LocalFilterTodos(getStorageSpy);

  return {
    sut,
    getStorageSpy
  };
};

describe('LocalFilterTodos', () => {
  test('Should call GetStorage with correct key', async () => {
    const { sut, getStorageSpy } = makeSut();
    await sut.invoke();

    expect(getStorageSpy.key).toBe('todos');
  });

  test('Should return correct value from GetStorage', async () => {
    const { sut, getStorageSpy } = makeSut();
    const result = await sut.invoke();

    expect(result).toEqual(getStorageSpy.value);
  });

  test('Should return all todos', async () => {
    const { sut, getStorageSpy } = makeSut();

    const todos = mockTodos();
    getStorageSpy.value = todos;

    const resultA = await sut.invoke();
    const resultB = await sut.invoke({ status: FilterTodosStatus.ALL });

    expect(resultA).toEqual(todos);
    expect(resultB).toEqual(todos);
  });

  test('Should return only active (non-completed) todos', async () => {
    const { sut } = makeSut();

    const result = await sut.invoke({ status: FilterTodosStatus.ACTIVE });

    expect(result.filter(todo => todo.completed).length).toBe(0);
    expect(result.filter(todo => !todo.completed).length).toBeGreaterThan(0);
  });

  test('Should return only completed todos', async () => {
    const { sut } = makeSut();

    const result = await sut.invoke({ status: FilterTodosStatus.COMPLETED });

    expect(result.filter(todo => !todo.completed).length).toBe(0);
    expect(result.filter(todo => todo.completed).length).toBeGreaterThan(0);
  });

  test('Should return empty array if GetStorage value is not defined', async () => {
    const { sut, getStorageSpy } = makeSut();
    getStorageSpy.value = null;

    const result = await sut.invoke();

    expect(result).toEqual([]);
  });
});
