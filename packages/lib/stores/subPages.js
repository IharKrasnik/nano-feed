import { writable } from 'svelte/store';

const subPagesStore = writable([]);

export const refreshSubPages = async ({ page }) => {
	let { results } = await get('projects', {
		hubStreamSlug: page.parentPage?.streamSlug || page.streamSlug
	});

	subPagesStore.set(results);
};

export default subPagesStore;
