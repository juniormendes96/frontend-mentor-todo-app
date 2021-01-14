import { GetStorage, SetStorage } from '@/data/protocols/cache';
import { RemoveTodos } from '@/domain/usecases';

export class LocalRemoveTodos implements RemoveTodos {
  constructor(private readonly getStorage: GetStorage, private readonly setStorage: SetStorage) {}

  remove(id: number): void {
    this.getStorage.get('todos');
    this.setStorage.set('todos', null);
  }
}
