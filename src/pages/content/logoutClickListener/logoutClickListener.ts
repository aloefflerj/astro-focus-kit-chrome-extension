import { handleLogoutLocalStorage } from '../storage';

export function logoutClickListener() {
  const logoutButton = document.getElementById('astro-focus-kit-logout-button');
  if (logoutButton)
    logoutButton.onclick = () => {
      handleLogoutLocalStorage();
    };
}
