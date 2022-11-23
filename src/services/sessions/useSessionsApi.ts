import { api } from '../api';

const resource = '/sessions';

export const useSessionsApi = () => ({
  fetchSessionStatus: async () => {
    const response = await api.get(resource);
    return response.data;
  },
});
