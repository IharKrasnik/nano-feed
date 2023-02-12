import pathChangeHandler from '../../actions/pathChange';
import {
  checkTrackPostRequest,
  defaultUserData,
  getEventListenerFunction,
  spyFetch,
  mockDate,
} from '../helpers';

describe('test change path', () => {
  const userData = defaultUserData;

  it('should add event listener on click action', () => {
    const addEventListenerSpy = spyOn(window, 'addEventListener');

    pathChangeHandler(userData);

    expect(addEventListenerSpy)
      .toHaveBeenCalledWith('popstate', jasmine.any(Function));

    expect(addEventListenerSpy)
      .toHaveBeenCalledWith('hashchange', jasmine.any(Function));

    expect(addEventListenerSpy)
      .toHaveBeenCalledWith('pageshow', jasmine.any(Function));

    expect(addEventListenerSpy)
      .toHaveBeenCalledWith('locationchange', jasmine.any(Function));
  });

  it('should send data on path change', () => {
    spyFetch();
    const addEventListenerSpy = spyOn(window, 'addEventListener');
    const date = mockDate();

    const expectedData = {
      type: 'pathChange',
      timestamp: date.getTime(),
      payload: {
        value: window.location.href,
      },
    };

    pathChangeHandler(userData);

    const onLocationChange = getEventListenerFunction(addEventListenerSpy);
    onLocationChange();

    checkTrackPostRequest(expectedData, userData);
  });
});
