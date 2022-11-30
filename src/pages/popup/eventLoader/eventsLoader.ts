import { refreshExtensionOnWebLogin } from '@src/services/events/extensionEvents';

export function eventsLoader() {
  refreshExtensionOnWebLogin();
}
