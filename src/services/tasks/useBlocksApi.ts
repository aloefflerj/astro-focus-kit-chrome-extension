import moment from 'moment';
import { api } from '../api';

const resource = '/blocks';

export const useBlocksApi = () => ({
  newBlock: async (url: string) => {
    const response = await api.post(resource, {
      url,
      blockDateTime: moment().toISOString(),
    });
    return response.data;
  },
});
