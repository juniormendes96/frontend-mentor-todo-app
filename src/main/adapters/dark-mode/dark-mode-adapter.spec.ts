import { LocalStorageAdapter } from '@/infra/cache';
import { setDarkModeAdapter, getDarkModeAdapter } from './dark-mode-adapter';

jest.mock('@/infra/cache/local-storage-adapter/local-storage-adapter');

describe('DarkModeAdapter', () => {
  test('Should call LocalStorageAdapter.set with correct value', () => {
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set');
    setDarkModeAdapter(false);
    expect(setSpy).toHaveBeenCalledWith('darkMode', false);
  });

  test('Should call LocalStorageAdapter.get with correct value', () => {
    const getSpy = jest.spyOn(LocalStorageAdapter.prototype, 'get').mockReturnValueOnce(true);
    const result = getDarkModeAdapter();
    expect(getSpy).toHaveBeenCalledWith('darkMode');
    expect(result).toBe(true);
  });
});
