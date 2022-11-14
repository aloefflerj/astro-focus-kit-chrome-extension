import { EnvironmentConfig } from '@src/config/environmentConfig';

const landingPage = EnvironmentConfig.mainClientApiBasePath;

function handleLocalStorage() {
  const user =
    localStorage.getItem('user') !== 'undefined'
      ? localStorage.getItem('user')
      : null;
  if (JSON.parse(user) === null) {
    chrome.storage.sync.get(['user'], function (result) {
      localStorage.setItem(
        'user',
        result.user !== undefined ? result.user : null
      );
    });
  }
}

(async () => {
  if (window.location.href.includes(landingPage)) {
    handleLocalStorage();
  }
  if (window.location.href.includes('instagram.com')) {
    location.replace(`${landingPage}/tasks`);
  }
})();
