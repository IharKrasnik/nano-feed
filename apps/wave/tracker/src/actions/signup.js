import { sendTrackData } from '../helpers';

export default (userData) => {
	if (window.WAVE_TRACK_FORMS) {
		document.querySelectorAll('form').forEach((form) => {
			let emailEl = form.querySelectorAll('input[type=email]')[0];

			if (emailEl) {
				form.addEventListener('submit', () => {
					const actionData = {
						type: 'signup',
						timestamp: Date.now(),
						payload: {}
					};

					sendTrackData(userData, 'waveActions', actionData);
				});
			}
		});
	}
};
