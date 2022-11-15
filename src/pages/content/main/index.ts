import { EnvironmentConfig } from '@src/config/environmentConfig';
import { urlChangeObserver } from '../urlChangeObserver/urlChangeObserver';

const basePath = EnvironmentConfig.mainClientApiBasePath;

(async () => {
  urlChangeObserver();
  if (window.location.href.includes('instagram.com')) {
    location.replace(`${basePath}/tasks`);
  }
})();
