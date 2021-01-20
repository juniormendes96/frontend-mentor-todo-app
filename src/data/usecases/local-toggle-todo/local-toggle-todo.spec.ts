import { mockTodo, mockTodos } from '@/domain/test';
import { GetStorageSpy, SetStorageSpy } from '@/data/test';
import { LocalToggleTodo } from '@/data/usecases';

type SutTypes = {
  sut: LocalToggleTodo;
  getStorageSpy: GetStorageSpy;
  setStorageSpy: SetStorageSpy;
};

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();
  const setStorageSpy = new SetStorageSpy();
  const sut = new LocalToggleTodo(getStorageSpy, setStorageSpy);

  return {
    sut,
    getStorageSpy,
    setStorageSpy
  };
};

describe('LocalToggleTodo', () => {
  test('Should call SetStorage and GetStorage with correct key', async () => {
    const { sut, getStorageSpy, setStorageSpy } = makeSut();

    const todo = mockTodo();
    getStorageSpy.value = [todo];

    await sut.invoke(todo.id);

    expect(getStorageSpy.key).toBe('todos');
    expect(setStorageSpy.key).toBe('todos');
  });

  test('Should mark todo as completed', async () => {
    const { sut, getStorageSpy, setStorageSpy } = makeSut();

    const todos = mockTodos();
    const todo = { ...mockTodo(), completed: false };

    getStorageSpy.value = [...todos, todo];

    const completed = await sut.invoke(todo.id);

    expect(completed).toBe(true);
    expect(setStorageSpy.value).toEqual([...todos, { ...todo, completed: true }]);
  });

  test('Should mark todo as uncompleted', async () => {
    const { sut, getStorageSpy, setStorageSpy } = makeSut();

    const todos = mockTodos();
    const todo = { ...mockTodo(), completed: true };

    getStorageSpy.value = [...todos, todo];

    const completed = await sut.invoke(todo.id);

    expect(completed).toBe(false);
    expect(setStorageSpy.value).toEqual([...todos, { ...todo, completed: false }]);
  });
});
