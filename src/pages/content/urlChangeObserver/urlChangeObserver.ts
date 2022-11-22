import { EnvironmentConfig } from '@src/config/environmentConfig';
import { syncLocalStorage } from '@src/services/syncLocalStorage';
import { useBlocksApi } from '@src/services/tasks/useBlocksApi';
import { logoutClickListener } from '../logoutClickListener/logoutClickListener';
import { fetchBlockedSites } from '../services/blockedSites';
import { handleLoginLocalStorage } from '../storage';

export function urlChangeObserver(): void {
  const basePath = EnvironmentConfig.mainClientApiBasePath;

  window.onload = function (): void {
    syncLocalStorage();

    const bodyList = document.querySelector('body');

    const observer = new MutationObserver(async function () {
      logoutClickListener();
      if (document.location.href.includes(basePath)) {
        const user =
          localStorage.getItem('user') !== 'undefined'
            ? localStorage.getItem('user')
            : null;

        await handleLoginLocalStorage(user);
        return;
      }

      fetchBlockedSites().then((sites) => {
        sites.forEach((site) => {
          if (document.location.href.includes(site?.url)) {
            let domain = document.location.hostname;
            domain = domain.replace('www.', '');
            domain = domain.split('.')[0];

            const { newBlock } = useBlocksApi();
            newBlock(document.location.href);

            location.replace(`${basePath}/block/${domain}`);
            return;
          }
        });
      });
    });

    const config = {
      childList: true,
      subtree: true,
    };

    observer.observe(bodyList, config);
  };
}
