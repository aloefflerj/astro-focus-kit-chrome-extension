import moment from 'moment';
import { api } from '../api';

const resource = '/blocks';

export const useBlocksApi = () => ({
  newBlock: async (id: string) => {
    const response = await api.post(resource, {
      site: id,
      blockDateTime: moment().toISOString(),
    });
    return response.data;
  },
});
