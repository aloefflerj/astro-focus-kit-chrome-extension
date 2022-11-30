import { api } from '../api';

const resource = '/timers';

export const useTimersApi = () => ({
  fetchTimerDuration: async () => {
    const response = await api.get(resource);
    return response.data;
  },
});
