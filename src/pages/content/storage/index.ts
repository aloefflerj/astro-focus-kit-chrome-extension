import { checksJWT } from '@src/services/jwt';

export function handleLoginLocalStorage(user?: string): void {
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

  if (JSON.parse(user)?.email)
    chrome.storage.sync.set({ user: JSON.parse(user) });
}

export function handleLogoutLocalStorage(): void {
  chrome.storage.sync.set({ user: null }, function () {
    localStorage.setItem('user', JSON.stringify(null));
  });
}
