import { EnvironmentConfig } from '@src/config/environmentConfig';
import { syncLocalStorage } from '@src/services/syncLocalStorage';
import { useBlocksApi } from '@src/services/blocks/useBlocksApi';
import { logoutClickListener } from '../logoutClickListener/logoutClickListener';
import { handleLoginLocalStorage } from '../storage';
import { useSitesApi } from '@src/services/sites/useSitesApi';

const { fetchBlockedSites } = useSitesApi();

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
            const { newBlock } = useBlocksApi();
            newBlock(site.id);

            location.replace(`${basePath}/block/${site.id}`);
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
