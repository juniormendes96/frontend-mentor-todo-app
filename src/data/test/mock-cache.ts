import faker from 'faker';
import { GetStorage, SetStorage } from '@/data/protocols/cache';

export class GetStorageSpy implements GetStorage {
  key: string;
  value: any;

  get(key: string): any {
    this.key = key;
    return this.value;
  }
}

export class SetStorageSpy implements SetStorage {
  key: string;
  value: any = faker.random.objectElement();

  set(key: string, value: any): void {
    this.key = key;
    this.value = value;
  }
}
