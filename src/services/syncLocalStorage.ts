export function syncLocalStorage(reload = false) {
  chrome.storage.onChanged.addListener(function (changes) {
    localStorage.setItem('user', JSON.stringify(changes.user.newValue));
    reload = true;
  });

  if (reload) location.reload();
}
