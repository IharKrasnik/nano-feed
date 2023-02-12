import clickHandler from '../../actions/click';
import {
  spyFetch,
  mockDate,
  checkTrackPostRequest,
  getEventListenerFunction,
  defaultUserData,
} from '../helpers';

describe('test click on dom element', () => {
  const userData = defaultUserData;

  const targetElement = document.createElement('div');
  targetElement.id = 'someId';
  targetElement.classList.add('someClass');
  targetElement.innerText = 'someText';

  const mouseEvent = new MouseEvent('click');
  Object.defineProperty(mouseEvent, 'target', { value: targetElement, enumerable: true });

  it('should add event listener on click action', () => {
    const addEventListenerSpy = spyOn(window, 'addEventListener');

    clickHandler(userData);

    expect(addEventListenerSpy)
      .toHaveBeenCalledWith('click', jasmine.any(Function), Object({ capture: true, passive: true }));
  });

  it('should send data on click', () => {
    spyFetch();
    const addEventListenerSpy = spyOn(window, 'addEventListener');
    const date = mockDate();

    const expectedData = {
      type: 'click',
      timestamp: date.getTime(),
      payload: {
        position: {
          x: 0,
          y: 0,
        },
        selector: '',
        value: 'someText',
      },
    };

    clickHandler(userData);

    const onClick = getEventListenerFunction(addEventListenerSpy);
    onClick(mouseEvent);

    checkTrackPostRequest(expectedData, userData);
  });
});
