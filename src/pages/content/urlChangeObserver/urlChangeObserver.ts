import { EnvironmentConfig } from '@src/config/environmentConfig';
import { syncLocalStorage } from '@src/services/syncLocalStorage';
import { logoutClickListener } from '../logoutClickListener/logoutClickListener';
import { handleLoginLocalStorage } from '../storage';
import { useSitesApi } from '@src/services/sites/useSitesApi';
import { useSites } from '@src/services/sites/useSites';

const { fetchBlockedSites } = useSitesApi();
const { handleBlockBySites } = useSites();

export function urlChangeObserver(): void {
  const basePath = EnvironmentConfig.mainClientApiBasePath;

  window.onload = function (): void {
    syncLocalStorage();

    const bodyList = document.querySelector('body');

    const observer = new MutationObserver(async function () {
      //login/logout
      logoutClickListener();
      if (document.location.href.includes(basePath)) {
        const user =
          localStorage.getItem('user') !== 'undefined'
            ? localStorage.getItem('user')
            : null;

        await handleLoginLocalStorage(user);
        return;
      }

      //blocks
      fetchBlockedSites().then((sites) => {
        handleBlockBySites(sites);
      });
    });

    const config = {
      childList: true,
      subtree: true,
    };

    observer.observe(bodyList, config);
  };
}
