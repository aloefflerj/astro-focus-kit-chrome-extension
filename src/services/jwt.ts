import { api } from './api';

export const checksJWT = async () => {
  const { status } = await api.get('/ping/auth');
  if (status === 401) {
    chrome.storage.sync.set({ user: null }, () => {
      localStorage.setItem('user', null);
    });
  }
};
