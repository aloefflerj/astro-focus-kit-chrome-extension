import { EnvironmentConfig } from '@src/config/environmentConfig';
import moment from 'moment';
import { useBlocksApi } from '../blocks/useBlocksApi';
import { useSessionsApi } from '../sessions/useSessionsApi';
import { useTime } from '../time/useTime';

export interface ISite {
  id?: string;
  url: string;
}

const { fetchSessionStatus } = useSessionsApi();
const { newBlock, fetchLatest } = useBlocksApi();
const { hasPassedXMinutesSinceDate } = useTime();

const basePath = EnvironmentConfig.mainClientApiBasePath;

export const useSites = () => ({
  handleBlockBySites: async (sites: ISite[]): Promise<void> => {
    const status = await fetchStatus();

    if (status !== 'focusing') {
      setInterval(() => siteRedirection(sites), 1000);
      return;
    }

    siteRedirection(sites);
  },
});

function siteRedirection(sites: ISite[]) {
  sites.forEach(async (site) => {
    if (document.location.href.includes(site?.url)) {
      const { blockDateTime } = await fetchLatestBlock();
      if (hasPassedXMinutesSinceDate(blockDateTime, 1)) {
        newBlock(site.id);
        location.replace(`${basePath}/block/${site.id}`);
      }
    }
  });
}

const fetchStatus = async () => {
  const { status } = await fetchSessionStatus();
  return status;
};

const fetchLatestBlock = async () => {
  return await fetchLatest();
};
