import { GetStorage, SetStorage } from '@/data/protocols/cache';

export class LocalStorageAdapter implements GetStorage, SetStorage {
  get(key: string): any {}

  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
