import handleMutation, { removeDangerousTags } from '../../records/mutation';
import {
  spyFetch,
  mockDate,
  checkTrackPostRequest,
  defaultUserData,
} from '../helpers';

describe('mutation handler', () => {
  const userData = defaultUserData;

  it('should not send data', () => {
    const spyOnFetch = spyFetch();
    spyOn(document, 'getElementsByTagName').and.returnValue([]);
    handleMutation(userData);
    expect(spyOnFetch).not.toHaveBeenCalled();
  });

  it('should send data', () => {
    const html = document.createElement('html');
    html.innerHTML = '<head></head><body></body>';

    spyFetch();
    spyOn(document, 'getElementsByTagName').and.returnValue([html]);
    spyOnProperty(html, 'offsetWidth', 'get').and.returnValue(100);
    spyOnProperty(html, 'offsetHeight', 'get').and.returnValue(100);

    const date = mockDate();
    const expectedData = {
      timestamp: date.getTime(),
      payload: {
        size: {
          width: 100,
          height: 100,
        },
        screen: '<html><head></head><body></body></html>',
      },
    };

    handleMutation(userData);
    checkTrackPostRequest(expectedData, userData);
  });

  it('should remove script tags', () => {
    const html = document.createElement('html');
    html.innerHTML = `
      <head>
        <script src="test"></script>
        <script src="test1"></script>
      </head>
      <body>
        <div id='someId' class='someClass'>
          <span>Test 1</span>
          <iframe></iframe>
        </div>
      </body>`;

    const cleanHtml = removeDangerousTags(html);
    expect(cleanHtml.getElementsByTagName('script').length).toEqual(0);
    expect(cleanHtml.getElementsByTagName('iframe').length).toEqual(0);
  });
});
