import { browser } from '$app/environment';

export default (message) => {
	if (browser) {
		alert(message);
	}
};