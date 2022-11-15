import { api } from './api';

export const checksJWT = async () => {
  const { status } = await api.get('/ping/auth');
  if (status === 401) {
    localStorage.setItem('user', null);
    chrome.storage.sync.set({ user: null });
  }
};
