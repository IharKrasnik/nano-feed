import pageScrollingHandler from '../../actions/pageScrolling';
import {
  spyFetch,
  mockDate,
  getEventListenerFunction,
  checkTrackPostRequest,
  defaultUserData,
} from '../helpers';

describe('test page scrolling', () => {
  const userData = defaultUserData;

  it('should add event listener on page scrolling', () => {
    const addEventListenerSpy = spyOn(window, 'addEventListener');

    pageScrollingHandler(userData);

    expect(addEventListenerSpy)
      .toHaveBeenCalledWith('scroll', jasmine.any(Function));
  });

  it('should send data about page scroll', () => {
    spyFetch();
    const spyOnSetTimeout = spyOn(window, 'setTimeout');
    const addEventListenerSpy = spyOn(window, 'addEventListener');
    const date = mockDate();

    const expectedData = {
      type: 'pageScroll',
      timestamp: date.getTime(),
      payload: {
        offset: {
          x: 0,
          y: 100,
        },
      },
    };

    pageScrollingHandler(userData);

    const onPageScroll = getEventListenerFunction(addEventListenerSpy);

    window.pageXOffset = 0;
    window.pageYOffset = 100;

    onPageScroll();

    const onSendData = spyOnSetTimeout.calls.mostRecent().args[0];

    onSendData();

    checkTrackPostRequest(expectedData, userData);
  });
});
