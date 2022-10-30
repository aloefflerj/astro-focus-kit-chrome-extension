console.log('content loaded');

/**
 * @description
 * Chrome extensions don't support modules in content scripts.
 */
import('./components/Demo');
import { api } from '@src/services/api';
import axios from 'axios';
import { EnvironmentConfig } from '@src/config/environmentConfig';
const landingPage = EnvironmentConfig.mainClientApiBasePath;

switch (window.location.hostname) {
  case 'www.instagram.com':
    location.replace(`${landingPage}/tasks`);
    break;
}
