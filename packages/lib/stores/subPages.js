import { writable } from 'svelte/store';
import { get } from 'lib/api';

const subPagesStore = writable([]);

export const refreshSubPages = async ({ page }) => {
	let { results } = await get(`pages/${page.parentPage?._id || page._id}/subpages`, {});

	subPagesStore.set(results);
};

export default subPagesStore;
