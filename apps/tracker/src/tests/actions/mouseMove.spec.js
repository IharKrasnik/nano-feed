import mouseMoveHandler from '../../actions/mouseMove';
import {
  spyFetch,
  mockDate,
  getEventListenerFunction,
  checkTrackPostRequest,
  defaultUserData,
} from '../helpers';

const ACTION_SEND_INTERVAL = 10000;

describe('test mouse move', () => {
  const userData = defaultUserData;

  const mouseEvent = new MouseEvent('mousemove');
  Object.defineProperty(mouseEvent, 'clientX', { value: 100, enumerable: true });
  Object.defineProperty(mouseEvent, 'clientY', { value: 100, enumerable: true });

  it('should add event listener on mouse movement', () => {
    const addEventListenerSpy = spyOn(window, 'addEventListener');

    mouseMoveHandler(userData);

    expect(addEventListenerSpy)
      .toHaveBeenCalledWith('mousemove', jasmine.any(Function));
  });

  it('should send data about mouse move', () => {
    const spyOnSetTimeout = spyOn(window, 'setTimeout');
    const addEventListenerSpy = spyOn(window, 'addEventListener');
    const date = mockDate();

    const expectedData = {
      type: 'mouseMove',
      payload: {
        batch: [
          {
            position: {
              x: 100,
              y: 100,
            },
            timestamp: date.getTime(),
          },
        ],
      },
    };

    mouseMoveHandler(userData);

    const onMouseMove = getEventListenerFunction(addEventListenerSpy);

    onMouseMove(mouseEvent);

    setTimeout(() => {
      const onSendData = spyOnSetTimeout.calls.mostRecent().args[0];

      onSendData();

      checkTrackPostRequest(expectedData, userData);
    }, ACTION_SEND_INTERVAL);
  });

  it('should not send data about mouse move', () => {
    const spyOnFetch = spyFetch();
    const addEventListenerSpy = spyOn(window, 'addEventListener');

    mouseMoveHandler(userData);

    const onMouseMove = getEventListenerFunction(addEventListenerSpy);

    onMouseMove(mouseEvent);

    expect(spyOnFetch).not.toHaveBeenCalled();
  });
});
