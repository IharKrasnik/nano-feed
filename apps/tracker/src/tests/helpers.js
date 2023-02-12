export const spyFetch = (data) => spyOn(window, 'fetch').and.returnValue(Promise.resolve({ json: () => data || {}, text: () => data || '' }));

export const defaultUserData = {
  visitorId: 'visitorId',
  projectId: 'projectId',
  sessionId: 'sessionId',
};

export const checkPostRequest = (expectedBody) => {
  const fetchSpy = window.fetch;

  expect(fetchSpy).toHaveBeenCalled();
  const options = fetchSpy.calls.mostRecent().args[1];
  expect(options.method).toBe('POST');
  expect(JSON.parse(options.body)).toEqual(expectedBody);
};

export const checkTrackPostRequest = (
  expectedBody,
  userData = defaultUserData,
) => checkPostRequest({
  ...expectedBody,
  projectId: userData.projectId,
  visitorId: userData.visitorId,
  sessionId: userData.sessionId,
});

export const getEventListenerFunction = (spy) => spy.calls.mostRecent().args[1];

export const mockDate = () => {
  const date = new Date(2021, 0, 1);
  jasmine.clock().mockDate(date);
  return date;
};
