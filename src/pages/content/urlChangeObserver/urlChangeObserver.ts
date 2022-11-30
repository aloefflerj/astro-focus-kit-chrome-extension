import { useLogin } from '@src/services/login/useLogin';
import { isOnMainWebsiteDomain } from '@src/common/utils/isOnMainWebsiteDomain';
import { syncLocalStorage } from '@src/services/storage/storage';
import { useSitesApi } from '@src/services/sites/useSitesApi';
import { useSites } from '@src/services/sites/useSites';

const { fetchBlockedSites } = useSitesApi();
const { handleBlockBySites } = useSites();
const { loggedInListener, logoutClickListener } = useLogin();

export function urlChangeObserver(): void {
  window.onload = function (): void {
    const bodyList = document.querySelector('body');

    const observer = new MutationObserver(async function () {
      if (isOnMainWebsiteDomain()) {
        syncLocalStorage();
      }
      //login/logout
      loggedInListener();
      logoutClickListener();

      // blocks
      if (!isOnMainWebsiteDomain()) {
        fetchBlockedSites().then((sites) => {
          handleBlockBySites(sites);
        });
      }
    });

    const config = {
      childList: true,
      subtree: true,
    };

    observer.observe(bodyList, config);
  };
}
