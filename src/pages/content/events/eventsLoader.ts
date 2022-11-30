import {
  refreshWebOnExtensionLogin,
  refreshWebOnExtensionLogout,
} from './webEvents';

export function eventsLoader() {
  refreshWebOnExtensionLogin();
  refreshWebOnExtensionLogout();
}
