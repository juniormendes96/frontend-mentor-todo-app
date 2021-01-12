import { GetStorageSpy } from '../test/mock-cache';
import { LocalViewTodoList } from './local-view-todo-list';

describe('LocalViewTodoList', () => {
  test('Should call GetStorage with correct key', async () => {
    const getStorageSpy = new GetStorageSpy();
    const sut = new LocalViewTodoList(getStorageSpy);

    await sut.filter();
    expect(getStorageSpy.key).toBe('todos');
  });
});
