import tracker from './tracker';

export default (() => {
	const { wave } = window;
	const { params } = wave;
	if (process.env.BUILD === 'dev') {
		console.log('Wave script params:', params); // eslint-disable-line
	}

	// don't change object's link.
	const userData = {
		visitorId: null,
		sessionId: null,
		projectId: params && params.pid
	};

	if (window.requestIdleCallback) {
		requestIdleCallback(tracker.init(userData));
	} else {
		setTimeout(tracker.init(userData), 500);
	}
})();
