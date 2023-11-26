import config from './../config';

const API_URL = process.env.BUILD === 'dev' ? config.API_URL_DEV : config.API_URL;

export default {
	register() {
		lifecycle.addEventListener('statechange', function (event) {
			if (event.newState === 'hidden') {
				let userData = window.WAVE_USER_DATA;

				if (userData) {
					let data = {
						projectId: userData.projectId,
						visitorId: userData.visitorId,
						sessionId: userData.sessionId
					};

					navigator.sendBeacon(`${window.WAVE_API_URL || API_URL}/waveActions/ping`, data);
				}
			}
		});
	}
};
