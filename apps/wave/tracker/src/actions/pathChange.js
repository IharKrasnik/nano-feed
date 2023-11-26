import { sendTrackData } from '../helpers';

export const handleLocationChange = (userData) => {
	const { href } = window.location;

	const actionData = {
		type: 'pathChange',
		timestamp: Date.now(),
		payload: {
			value: href
		}
	};

	sendTrackData(userData, 'waveActions', actionData);
};

export default (userData) => {
	window.history.pushState = ((f) =>
		function pushState(...arg) {
			const ret = f.apply(this, arg);

			window.dispatchEvent(new Event('locationchange'));

			return ret;
		})(window.history.pushState);

	window.history.replaceState = ((f) =>
		function replaceState(...arg) {
			const ret = f.apply(this, arg);

			window.dispatchEvent(new Event('locationchange'));

			return ret;
		})(window.history.replaceState);

	window.addEventListener('popstate', () => {
		window.dispatchEvent(new Event('locationchange'));
	});

	window.addEventListener('hashchange', () => {
		window.dispatchEvent(new Event('locationchange'));
	});

	window.addEventListener('pageshow', () => {
		window.dispatchEvent(new Event('locationchange'));
	});

	return window.addEventListener('locationchange', () => {
		let isSkipLocationChange = window.MWAVE_CONFIG?.isSkipLocationChange;

		if (!isSkipLocationChange) {
			handleLocationChange(userData);
		}
	});
};
