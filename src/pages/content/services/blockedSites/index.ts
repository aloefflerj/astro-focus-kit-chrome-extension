import { api } from '@src/services/api';

export interface IBlock {
  _id?: string;
  url: string;
}

export const fetchBlockedSites = async (): Promise<IBlock[]> => {
  try {
    const response = await api.get('/blocks');
    if (response) return response.data;
  } catch (error) {
    console.error(error.msg);
  }
  return [];
};
