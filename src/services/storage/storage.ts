import { isOnExtensionContext } from '@src/common/utils/isOnExtensionContext';
import { isOnMainWebsiteDomain } from '@src/common/utils/isOnMainWebsiteDomain';
import { EnvironmentConfig } from '@src/config/environmentConfig';
import { checksJWT } from '@src/services/jwt';

const basePath = EnvironmentConfig.mainClientApiBasePath;

export const handleWebLoginLocalStorage = (): void => {
  if (isOnMainWebsiteDomain()) {
    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    if (user) {
      chrome.storage.sync.set({ user });
    }
  }
};

export function handleWebLogoutLocalStorage(): void {
  if (isOnMainWebsiteDomain()) {
    chrome.storage.sync.set({ user: null }, function () {
      localStorage.setItem('user', JSON.stringify(null));
    });
  }
}

export function handleExtensionLoginLocalStorage(
  keyName: string,
  newValue: any
): void {
  window.localStorage.setItem(keyName, JSON.stringify(newValue));
  chrome.storage.sync.set({ user: newValue });

  chrome.tabs.query({ url: `${basePath}/*` }, function (tabs) {
    tabs.forEach((tab) => {
      chrome.tabs.reload(tab.id);
    });
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

export const syncLocalStorage = () => {
  let currentLocalStorage = localStorage.getItem('user');
  currentLocalStorage = JSON.parse(currentLocalStorage);

  chrome.storage.sync.get(['user'], function (result) {
    const user = result.user !== undefined ? result.user : null;
    if (
      (user === null && currentLocalStorage !== null) ||
      (user !== null && currentLocalStorage === null)
    ) {
      localStorage.setItem('user', JSON.stringify(user));
      if (isOnMainWebsiteDomain()) {
        window.dispatchEvent(new Event('refreshWeb'));
      }

      if (isOnExtensionContext()) {
        checksJWT();
        window.dispatchEvent(new Event('refreshExtension'));
      }
    }
  });
};
