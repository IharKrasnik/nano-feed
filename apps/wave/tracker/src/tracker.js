import './lib/fingerprint2.min';
import clickHandler from './actions/click';
import pageResizeHandler from './actions/pageResize';
import pageScrollingHandler from './actions/pageScrolling';
import mouseMoveHandler from './actions/mouseMove';
import pathChangeHandler, { handleLocationChange } from './actions/pathChange';
import trackerMutationObserver from './records/observer';

import {
	sendData,
	registerHandlers,
	getDeviceType,
	getBrowserName,
	getConnectionType,
	getOS
} from './helpers';

if (process.env.BUILD === 'dev') {
	if (Fingerprint2 && Fingerprint2.getV18) {
		console.log('Fingerprint2.getV18:', typeof Fingerprint2.getV18); // eslint-disable-line
	} else {
		console.error('Fingerprint2 not loaded correctly!', Fingerprint2); // eslint-disable-line
	}
}

const defaultHandlers = [
	clickHandler,
	pageResizeHandler,
	pageScrollingHandler,
	mouseMoveHandler,
	pathChangeHandler
];

const calcIdentificator = () =>
	new Promise((res, rej) => {
		Fingerprint2.getV18((result) => {
			if (!result) {
				rej(new Error('Identificator not created!'));
			}

			res(result);
		});
	});

const init =
	(initialUserData, handlers = defaultHandlers) =>
	() => {
		const userData = { ...initialUserData };

		return calcIdentificator()
			.then((visitorId) => {
				userData.visitorId = visitorId;

				return fetch('https://api.ipify.org')
					.then((res) => res.text())
					.then((data) => {
						const payload = {
							os: getOS(),
							browserName: getBrowserName(),
							deviceType: getDeviceType(),
							connectionType: getConnectionType(),
							ipAddress: data,

							referrerUrl: document.referrer
						};

						const session = JSON.parse(localStorage.getItem('wave_session'));
						const ONE_MINUTE_MS = 1 * 60 * 1000;

						if (
							session &&
							session.sessionId &&
							new Date() - new Date(session.updatedOn) < ONE_MINUTE_MS
						) {
							return {
								sessionId: session.sessionId
							};
						}

						return sendData('waveSessions/init', {
							visitorId,
							domain: window.location.hostname,
							payload,
							projectId: userData.projectId
						});
					});
			})
			.then(({ sessionId }) => {
				if (sessionId) {
					const setSession = () => {
						localStorage.setItem(
							'wave_session',
							JSON.stringify({
								sessionId,
								updatedOn: new Date()
							})
						);
					};

					setSession();
					window.WAVE_SESSION_ID = sessionId;
					setInterval(setSession, 10 * 1000);

					userData.sessionId = sessionId;
					registerHandlers(userData, handlers);
					trackerMutationObserver.init(userData);
					handleLocationChange(userData);
				} else if (process.env.BUILD === 'dev') {
					console.error('Something went wrong, sessionId not setted:', sessionId); // eslint-disable-line
				}
			})
			.then(() => ({
				userData
			}));
	};

export default {
	init
};
