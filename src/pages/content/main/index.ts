import { EnvironmentConfig } from '@src/config/environmentConfig';
import { handleLocalStorage } from '../storage/index';

const landingPage = EnvironmentConfig.mainClientApiBasePath;

(async () => {
  if (window.location.href.includes(landingPage)) {
    handleLocalStorage();
  }
  if (window.location.href.includes('instagram.com')) {
    location.replace(`${landingPage}/tasks`);
  }
})();
