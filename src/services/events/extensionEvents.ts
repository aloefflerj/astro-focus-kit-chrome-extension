import { isOnExtensionContext } from '@src/common/utils/isOnExtensionContext';

export function refreshExtensionOnWebLogin() {
  window.addEventListener('refreshExtension', () => {
    if (isOnExtensionContext()) {
      location.reload();
    }
  });
}

export function refreshExtensionOnWebLogout() {
  window.addEventListener('refreshExtension', () => {
    if (isOnExtensionContext()) {
      location.reload();
    }
  });
}
