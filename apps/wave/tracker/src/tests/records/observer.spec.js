import observer from '../../records/observer';

import {
  spyFetch,
  defaultUserData,
} from '../helpers';

describe('mutation observer', () => {
  const userData = defaultUserData;

  it('handleMutation should be called', () => {
    const fetchSpy = spyFetch();
    const div = document.createElement('div');

    observer.init(userData);
    expect(fetchSpy).toHaveBeenCalled();

    document.body.appendChild(div);

    expect(fetchSpy).toHaveBeenCalled();
  });
});
