import axios from 'axios';
import {
  getUserLocalStorage,
  unsetUserLocalStorage,
} from '../contexts/AuthProvider/utils';
import { EnvironmentConfig } from '../config/environmentConfig';
import { readFromChromeStorage } from './storage/storage';

export const api = axios.create({
  baseURL: EnvironmentConfig.mainServerApiBasePath,
});

api.interceptors.request.use(
  async (config) => {
    let user = null;

    // user = await readFromChromeStorage('user');

    if (!user) user = getUserLocalStorage();
    console.log(user);

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
    if (error === undefined) {
      return;
    }

    if (error.response === undefined) {
      unsetUserLocalStorage();
      return;
    }

    if (error.response.status === 401) {
      unsetUserLocalStorage();
      return;
    }
  }
);

//TODO: refresh x-access-token jwt token
