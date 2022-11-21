export const syncLocalStorage = async () => {
  return new Promise(() => {
    chrome.storage.onChanged.addListener(function (changes) {
      localStorage.setItem('user', JSON.stringify(changes.user.newValue));
    });
  });
};

export const readFromChromeStorage = async (key: string) => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(['user'], function (result) {
      if (result[key] === undefined) reject();
      else resolve(result[key]);
    });
  });
};
