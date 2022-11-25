import { EnvironmentConfig } from '@src/config/environmentConfig';
import { useBlocksApi } from '../blocks/useBlocksApi';
import { useSessionsApi } from '../sessions/useSessionsApi';
import { useTime } from '../time/useTime';

export interface ISite {
  id?: string;
  url: string;
}

const { fetchSessionStatus, changeStatusToFocusing } = useSessionsApi();
const { newBlock, fetchLatest } = useBlocksApi();
const { hasPassedXMinutesSinceDate } = useTime();

const basePath = EnvironmentConfig.mainClientApiBasePath;
const defaultTimerDuration =
  EnvironmentConfig.defaultProcratinasionMinutesDuration;

export const useSites = () => ({
  handleBlockBySites: async (sites: ISite[]): Promise<void> => {
    const status = await fetchStatus();

    if (status !== 'focusing') {
      const { blockDateTime } = await fetchLatestBlock();
      setInterval(() => siteRedirection(sites, blockDateTime), 1000);
      return;
    }

    siteRedirection(sites);
  },
});

function siteRedirection(sites: ISite[], blockDateTime = null) {
  sites.forEach(async (site) => {
    if (document.location.href.includes(site?.url)) {
      if (blockDateTime === undefined) blockAndRedirect(site);
      if (blockDateTime === null) blockAndRedirect(site);
      // TODO: let the user config how many minutes procrastination session must last
      if (hasPassedXMinutesSinceDate(blockDateTime, defaultTimerDuration)) {
        blockAndRedirect(site);
      }
    }
  });
}

const blockAndRedirect = async (site: ISite) => {
  await newBlock(site.id);
  changeStatusToFocusing();
  location.replace(`${basePath}/block/${site.id}`);
};

const fetchStatus = async () => {
  const { status } = await fetchSessionStatus();
  return status;
};

const fetchLatestBlock = async () => {
  return await fetchLatest();
};
