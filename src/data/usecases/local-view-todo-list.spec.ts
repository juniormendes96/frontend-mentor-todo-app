import { GetStorageSpy } from '../test/mock-cache';
import { LocalViewTodoList } from './local-view-todo-list';

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
});
