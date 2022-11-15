import { api } from './api';

export const checksJWT = async () => {
  const response = await api.get('/ping/auth');
  if (response === undefined || response?.status === 401) {
    chrome.storage.sync.set({ user: null }, () => {
      localStorage.setItem('user', null);
    });
  }
};
