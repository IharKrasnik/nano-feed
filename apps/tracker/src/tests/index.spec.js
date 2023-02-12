import tracker from '../tracker';
import { checkPostRequest, spyFetch } from './helpers';

describe('test initialize request', () => {
  const expectedId = 'someId';
  const extectedSessionId = 'sessionId';
  const expectedProjectId = 'projectId';

  beforeAll(() => {
    expect(window.fetch).toBeDefined();
    expect(window.Fingerprint2).toBeDefined();

    spyOn(window.Fingerprint2, 'getV18').and.callFake((cb) => cb(expectedId));
  });

  beforeEach(() => {
    spyOnProperty(window, 'navigator').and.returnValue({
      connection: { type: 'type' },
      userAgent: 'userAgent',
    });
  });

  it('should send data to backend', async () => {
    spyFetch();

    const expectedData = {
      visitorId: expectedId,
      projectId: expectedProjectId,
      payload: {
        os: jasmine.any(String),
        browserName: jasmine.any(String),
        deviceType: jasmine.any(String),
        connectionType: jasmine.any(String),
        ipAddress: jasmine.any(String),
      },
    };

    await tracker.init({ projectId: expectedProjectId }, [])();

    checkPostRequest(expectedData);
  });

  it('should check userData after init', async () => {
    spyFetch({ sessionId: extectedSessionId });

    const { userData } = await tracker.init({}, [])();

    expect(userData.visitorId).toBe(expectedId);
    expect(userData.sessionId).toBe(extectedSessionId);
  });
});
