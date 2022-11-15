import { api } from '../api';

const resource = '/tasks';

export const useTasksApi = () => ({
  getTasks: async () => {
    const response = await api.get(resource);
    return response.data;
  },
});
