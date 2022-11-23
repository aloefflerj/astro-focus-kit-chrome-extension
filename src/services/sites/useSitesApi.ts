import { api } from '@src/services/api';
import { ISite } from './useSites';

const resource = '/sites';

export const useSitesApi = () => ({
  fetchBlockedSites: async (): Promise<ISite[]> => {
    try {
      const response = await api.get(resource);
      if (response) return response.data;
    } catch (error) {
      console.error(error.msg);
    }
    return [];
  },
});
