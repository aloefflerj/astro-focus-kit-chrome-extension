import { EnvironmentConfig } from '@src/config/environmentConfig';
import { syncLocalStorage } from '@src/services/syncLocalStorage';
import { logoutClickListener } from '../logoutClickListener/logoutClickListener';
import { handleLoginLocalStorage } from '../storage';

export function urlChangeObserver(): void {
  const basePath = EnvironmentConfig.mainClientApiBasePath;

  window.onload = function (): void {
    syncLocalStorage();

    const bodyList = document.querySelector('body');

    const observer = new MutationObserver(function () {
      logoutClickListener();
      if (document.location.href.includes(basePath)) {
        const user =
          localStorage.getItem('user') !== 'undefined'
            ? localStorage.getItem('user')
            : null;

        handleLoginLocalStorage(user);
        return;
      }
    });

    const config = {
      childList: true,
      subtree: true,
    };

    observer.observe(bodyList, config);
  };
}
