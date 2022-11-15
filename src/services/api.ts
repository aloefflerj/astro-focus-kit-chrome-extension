import axios from 'axios';
import {
  getUserLocalStorage,
  unsetUserLocalStorage,
} from '../contexts/AuthProvider/utils';
import { EnvironmentConfig } from '../config/environmentConfig';

export const api = axios.create({
  baseURL: EnvironmentConfig.mainServerApiBasePath,
});

api.interceptors.request.use(
  (config) => {
    const user = getUserLocalStorage();

    if (config.headers === undefined) return;

    config.headers['x-access-token'] = user?.token;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error.response.status === 401) {
      unsetUserLocalStorage();
      return;
    }
  }
);

//TODO: refresh x-access-token jwt token
