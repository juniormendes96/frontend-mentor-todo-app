import { Todo } from '../../../domain/models/todo';
import { GetStorageSpy, SetStorageSpy } from '@/data/test';
import { LocalRemoveTodo } from '@/data/usecases';
import { mockTodos } from '@/domain/test';

type SutTypes = {
  sut: LocalRemoveTodo;
  setStorageSpy: SetStorageSpy;
  getStorageSpy: GetStorageSpy;
};

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();
  const setStorageSpy = new SetStorageSpy();
  const sut = new LocalRemoveTodo(getStorageSpy, setStorageSpy);

  return {
    sut,
    getStorageSpy,
    setStorageSpy
  };
};

describe('LocalRemoveTodo', () => {
  test('Should call GetStorage and SetStorage with correct key', async () => {
    const { sut, getStorageSpy, setStorageSpy } = makeSut();

    await sut.invoke(1);

    expect(getStorageSpy.key).toBe('todos');
    expect(setStorageSpy.key).toBe('todos');
  });

  test('Should remove todo', async () => {
    const { sut, getStorageSpy, setStorageSpy } = makeSut();

    getStorageSpy.value = mockTodos();

    await sut.invoke(1);

    expect((setStorageSpy.value as Todo[]).length).toBe(3);
    expect((setStorageSpy.value as Todo[]).filter(todo => todo.id === 1).length).toBe(0);
  });
});
