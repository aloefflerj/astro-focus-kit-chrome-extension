import { checksJWT } from '@src/services/jwt';

export function handleLocalStorage(): void {
  const user =
    localStorage.getItem('user') !== 'undefined'
      ? localStorage.getItem('user')
      : null;

  if (JSON.parse(user) === null) {
    chrome.storage.sync.get(['user'], function (result) {
      localStorage.setItem(
        'user',
        result.user !== undefined ? JSON.stringify(result.user) : null
      );
      checksJWT();
    });
    return;
  }

  chrome.storage.sync.set({ user: JSON.parse(user) });
}
