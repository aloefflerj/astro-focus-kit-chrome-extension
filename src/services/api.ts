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
  async (config) => {
    let user = null;

    user = await readUserForApi('user');

    if (!user) user = getUserLocalStorage();

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

const readUserForApi = async (key: string) => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(['user'], function (result) {
      if (result[key] === undefined) reject();
      else resolve(result[key]);
    });
  });
};

//TODO: refresh x-access-token jwt token
