import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const KEY = 'USER_VARS';

const userVarsStore = writable({});

let varsLastUpdatedOnStore = writable(null);

export { varsLastUpdatedOnStore as varsLastUpdatedOn };

if (browser) {
	let userVars;

	try {
		userVars = JSON.parse(localStorage[KEY]) || {};
	} catch (err) {
		localStorage[KEY] = {};
		userVars = {};
	}

	userVarsStore.set(userVars);
	varsLastUpdatedOnStore.set(new Date());

	userVarsStore.subscribe((uv) => {
		if (uv) {
			uv.updatedOn = new Date();
		}

		setTimeout(() => {
			varsLastUpdatedOnStore.set(new Date());
		});

		localStorage[KEY] = JSON.stringify(uv);
	});
}

export default userVarsStore;
