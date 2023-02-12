import pageReziseHandler from '../../actions/pageResize';
import {
  spyFetch,
  mockDate,
  getEventListenerFunction,
  checkTrackPostRequest,
  defaultUserData,
} from '../helpers';

describe('test page resize', () => {
  const userData = defaultUserData;

  it('should add event listener on rezise', () => {
    const addEventListenerSpy = spyOn(window, 'addEventListener');

    pageReziseHandler(userData);

    expect(addEventListenerSpy)
      .toHaveBeenCalledWith('resize', jasmine.any(Function));
  });

  it('should send data about resize', () => {
    const spyOnFetch = spyFetch();
    const spyOnSetTimeout = spyOn(window, 'setTimeout');
    const addEventListenerSpy = spyOn(window, 'addEventListener');
    const date = mockDate();

    const expectedData = {
      type: 'resize',
      timestamp: date.getTime(),
      payload: {
        size: {
          width: 100,
          height: 100,
        },
      },
    };

    pageReziseHandler(userData);

    const onPageResize = getEventListenerFunction(addEventListenerSpy);

    window.innerHeight = 100;
    window.innerWidth = 100;
    onPageResize();

    expect(spyOnFetch).not.toHaveBeenCalled();

    const onSendData = spyOnSetTimeout.calls.mostRecent().args[0];

    onSendData();

    checkTrackPostRequest(expectedData, userData);
  });
});
