import { AxiosResponse } from 'axios';
import { api } from '../api';

const resource = '/sessions';

export const useSessionsApi = () => ({
  fetchSessionStatus: async () => {
    const response = await api.get(resource);
    return response.data;
  },
  changeStatusToFocusing: async (): Promise<AxiosResponse> => {
    const response = await api.patch(resource, { status: 'focusing' });
    return response;
  },
});
