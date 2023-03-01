import { goto } from '$app/navigation';
import { GOOGLE_LOGIN_URL } from 'lib/env';

export default () => {
	goto(GOOGLE_LOGIN_URL + `&fingerprint=${window.WAVE_FINGERPRINT}`);
};
