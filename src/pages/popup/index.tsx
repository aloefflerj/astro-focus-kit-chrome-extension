import { createRoot } from 'react-dom/client';
import Popup from '@pages/popup/Popup';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import { eventsLoader } from './eventLoader/eventsLoader';

refreshOnUpdate('pages/popup');
eventsLoader();

function init(): void {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find AppContainer');
  }
  const root = createRoot(appContainer);
  root.render(<Popup />);
}

init();
