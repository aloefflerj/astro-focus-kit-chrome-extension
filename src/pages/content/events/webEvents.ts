import { isOnExtensionContext } from '@src/common/utils/isOnExtensionContext';
import { isOnMainWebsiteDomain } from '@src/common/utils/isOnMainWebsiteDomain';

export function refreshWebOnExtensionLogin() {
  window.addEventListener('refreshWeb', () => {
    location.reload();
  });
}

// export function refreshWebOnExtensionLogout() {
// window.addEventListener('refreshWeb', () => {});
// }
