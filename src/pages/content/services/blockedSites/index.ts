import { api } from '@src/services/api';

export interface ISite {
  id?: string;
  url: string;
}

export const fetchBlockedSites = async (): Promise<ISite[]> => {
  try {
    const response = await api.get('/sites');
    if (response) return response.data;
  } catch (error) {
    console.error(error.msg);
  }
  return [];
};
