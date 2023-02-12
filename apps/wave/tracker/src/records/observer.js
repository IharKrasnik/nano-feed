import { debounce, DEFAULT_DEBOUNCE_TIME } from '../helpers';

import handleMutation from './mutation';

const init = (userData) => {
  const MutationObserver = window.MutationObserver
  || window.WebKitMutationObserver
  || window.MozMutationObserver;

  const observer = new MutationObserver(
    debounce(() => handleMutation(userData), DEFAULT_DEBOUNCE_TIME),
  );
  observer.observe(document, { subtree: true, childList: true, attributes: true });
  handleMutation(userData);
};

export default {
  init,
};
