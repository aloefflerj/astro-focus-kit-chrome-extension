import { eventsLoader } from '../events/eventsLoader';
import { urlChangeObserver } from '../urlChangeObserver/urlChangeObserver';

(async () => {
  eventsLoader();
  urlChangeObserver();
})();
