import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import getDomain from 'lib/helpers/getDomain';

const isCustomDomainStore = writable(false);

if (browser) {
	let currentDomain = getDomain(document.URL);

	if (
		currentDomain !== 'post.mmntm.build' &&
		currentDomain !== 'mmntm.blog' &&
		!currentDomain.includes('localhost') &&
		!currentDomain.includes('192.168')
	) {
		isCustomDomainStore.set(currentDomain);
	}
}

export default isCustomDomainStore;
