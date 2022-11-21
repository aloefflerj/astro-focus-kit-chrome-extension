import { checksJWT } from '@src/services/jwt';

export async function handleLoginLocalStorage(user?: string): Promise<void> {
  if (JSON.parse(user) === null) {
    const userFromCromeStorage = await readFromChromeStorage('user');

    localStorage.setItem(
      'user',
      userFromCromeStorage !== undefined
        ? JSON.stringify(userFromCromeStorage)
        : null
    );

    checksJWT();
  }

  if (JSON.parse(user)?.email)
    chrome.storage.sync.set({ user: JSON.parse(user) });
}

export function handleLogoutLocalStorage(): void {
  chrome.storage.sync.set({ user: null }, function () {
    localStorage.setItem('user', JSON.stringify(null));
  });
}

export const readFromChromeStorage = async (key: string) => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(['user'], function (result) {
      if (result[key] === undefined) reject();
      else resolve(result[key]);
    });
  });
};
