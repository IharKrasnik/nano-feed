import { goto } from '$app/navigation';
import { getGoogleLoginUrl } from 'lib/env';

export default () => {
	goto(getGoogleLoginUrl() + `&fingerprint=${window.WAVE_FINGERPRINT}`);
};
