import { writable } from 'svelte/store';
import { get } from 'lib/api';

const feedStore = writable({});

let getCacheKey = (cacheId) => `feed-${cacheId}`;

export const fetchFeed = async ({
	sort = { publishedOn: -1, createdOn: -1 },
	page = 1,
	perPage = 20,
	source,
	streamSlug = '',
	cacheId = streamSlug,
	creatorUsername,
	isExplore,
	isWithUrlOnly = false,
	isWithImageOnly = false
} = {}) => {
	// feedStore.update((st) => {
	// 	st[cacheId] = [];
	// 	localStorage[getCacheKey(cacheId)] = '[]';
	// 	return st;
	// });

	const query = {
		sort,
		page,
		perPage
	};

	if (streamSlug) {
		query.projectSlug = streamSlug;
	}

	if (creatorUsername) {
		query.creatorUsername = creatorUsername;
	}

	if (source) {
		query.source = source;
	}

	if (isExplore) {
		query.isExplore = isExplore;
	}

	if (isWithUrlOnly) {
		query.isWithUrlOnly = true;
	}

	if (isWithImageOnly) {
		query.isWithImageOnly = true;
	}

	const { results: feed } = await get('feed', query);

	feedStore.update((st) => {
		st[cacheId] = feed;
		st.updatedOn = new Date();
		localStorage[getCacheKey(cacheId)] = JSON.stringify(feed);
		return st;
	});

	return feed;
};

export const getFeed = async ({
	cacheId,
	streamSlug,
	streamId,
	forceRefresh = false,
	isWithUrlOnly,
	isWithImageOnly,
	streamSettings = null,
	page,
	sort,
	perPage
}) => {
	if (!streamSettings && !forceRefresh) {
		let cachedFeed = JSON.parse(localStorage[getCacheKey()] || 'null');

		if (cachedFeed) {
			return cachedFeed;
		}
	}

	if (streamSettings) {
		if (streamSettings.sort) {
			sort = streamSettings.sort;
		}

		if (streamSettings.limit) {
			perPage = streamSettings.limit;
		}
	}

	return fetchFeed({
		cacheId,
		sort,
		perPage,
		streamSlug,
		isWithUrlOnly,
		isWithImageOnly,
		page
	});
};

export default feedStore;
