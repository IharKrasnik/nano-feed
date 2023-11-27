import { writable } from 'svelte/store';
import { get } from 'lib/api';

const childStreamsStore = writable([]);

export const refreshChildStreams = async ({ page }) => {
	let { results } = await get('projects', {
		hubStreamSlug: page.parentPage?.streamSlug || page.streamSlug
	});

	childStreamsStore.set(results);
	return results;
};

export default childStreamsStore;
