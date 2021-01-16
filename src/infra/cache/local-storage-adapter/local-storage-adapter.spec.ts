import faker from 'faker';
import 'jest-localstorage-mock';
import { LocalStorageAdapter } from '@/infra/cache';

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter();

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Should call localStorage.setItem with correct values', () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = faker.random.arrayElements();

    sut.set(key, value);

    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
  });

  test('Should call localStorage.removeItem if value is null', () => {
    const sut = makeSut();
    const key = faker.database.column();

    sut.set(key, undefined);

    expect(localStorage.removeItem).toHaveBeenCalledWith(key);
  });

  test('Should call localStorage.getItem with correct value', () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = faker.random.arrayElements();

    const getItemSpy = jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(JSON.stringify(value));
    const array = sut.get(key);

    expect(array).toEqual(value);
    expect(getItemSpy).toHaveBeenCalledWith(key);
  });
});
