import { EnvironmentConfig } from '@src/config/environmentConfig';

const basePath = EnvironmentConfig.mainClientApiBasePath;

export function isOnMainWebsiteDomain(): boolean {
  return document.location.href.includes(basePath);
}
