import { EnvironmentConfig } from '@src/config/environmentConfig';
import {
  handleWebLoginLocalStorage,
  handleWebLogoutLocalStorage,
} from '../storage/storage';

// import {  } from './storage';
const loginButtonId = 'astro-focus-kit-login-button';
const logoutButtonId = 'astro-focus-kit-logout-button';
const basePath = EnvironmentConfig.mainClientApiBasePath;

export const useLogin = () => ({
  loggedInListener: () => {
    const onWebSite = document.location.href.includes(`${basePath}/tasks`);
    if (onWebSite) {
      handleWebLoginLocalStorage();
    }
  },
  logoutClickListener: () => {
    const logoutButton = document.getElementById(logoutButtonId);
    if (logoutButton)
      logoutButton.onclick = () => {
        handleWebLogoutLocalStorage();
      };
  },
});
