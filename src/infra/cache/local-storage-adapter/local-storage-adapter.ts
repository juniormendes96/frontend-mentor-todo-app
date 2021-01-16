import { GetStorage, SetStorage } from '@/data/protocols/cache';

export class LocalStorageAdapter implements GetStorage, SetStorage {
  get(key: string): any {}

  set(key: string, value: any): void {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
  }
}
