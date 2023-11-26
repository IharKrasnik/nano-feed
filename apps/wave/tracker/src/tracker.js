import './lib/fingerprint2.min';
import './lib/lifecycle';
import clickHandler from './actions/click';
import pageResizeHandler from './actions/pageResize';
import pageScrollingHandler from './actions/pageScrolling';
import signupHandler from './actions/signup';
import mouseMoveHandler from './actions/mouseMove';
import pathChangeHandler, { handleLocationChange } from './actions/pathChange';
import onExit from './actions/onExit';

import trackerMutationObserver from './records/observer';

import {
	sendData,
	registerHandlers,
	getDeviceType,
	getBrowserName,
	getConnectionType,
	getOS,
	sendTrackEvent,
	sendPing
} from './helpers';

try {
	onExit.register();
} catch (err) {}

window.mwave = {
	sendTrackEvent,
	sendPing
};

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
	signupHandler,
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

function setCookie(c_name, value, exdays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value = escape(value) + (exdays == null ? '' : '; expires=' + exdate.toUTCString());
	document.cookie = c_name + '=' + c_value;
}

function getCookie(c_name) {
	var i,
		x,
		y,
		ARRcookies = document.cookie.split(';');
	for (i = 0; i < ARRcookies.length; i++) {
		x = ARRcookies[i].substr(0, ARRcookies[i].indexOf('='));
		y = ARRcookies[i].substr(ARRcookies[i].indexOf('=') + 1);
		x = x.replace(/^\s+|\s+$/g, '');
		if (x == c_name) {
			return unescape(y);
		}
	}
}

const init =
	(initialUserData, handlers = defaultHandlers) =>
	() => {
		const userData = { ...initialUserData };

		return calcIdentificator()
			.then((visitorId) => {
				userData.visitorId = visitorId;
				setCookie('wave_fingerprint', visitorId);
				window.WAVE_FINGERPRINT = visitorId;

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

						const session = JSON.parse(
							localStorage.getItem(`wave_session_${window.WAVE_SUBPROJECT_ID || ''}`)
						);
						const TEN_MINUTES_MS = 1 * 60 * 1000;

						if (
							session &&
							session.sessionId &&
							new Date() - new Date(session.updatedOn) < TEN_MINUTES_MS
						) {
							return {
								sessionId: session.sessionId
							};
						}

						return sendData('waveSessions/init', {
							visitorId,
							domain: window.location.hostname,
							url: window.location.href,
							payload,
							projectId: userData.projectId,

							...(window.MWAVE_CONFIG
								? {
										subProjectId: window.MWAVE_CONFIG?.subProjectId,
										pageId: window.MWAVE_CONFIG?.pageId
								  }
								: {})
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
					window.WAVE_USER_DATA = userData;
					trackerMutationObserver.init(userData);
					handleLocationChange(userData);
				} else if (process.env.BUILD === 'dev') {
					console.error('Something went wrong, sessionId not setted:', sessionId); // eslint-disable-line
				}
			})
			.then(() => {
				return {
					userData
				};
			});
	};

export default {
	init
};
