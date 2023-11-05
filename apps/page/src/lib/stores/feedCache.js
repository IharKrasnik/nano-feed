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
	isExplore
} = {}) => {
	feedStore.update((st) => {
		st[cacheId] = [];
		localStorage[getCacheKey(cacheId)] = '[]';
		return st;
	});

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

	const { results: feed } = await get('feed', query);

	feedStore.update((st) => {
		st[cacheId] = feed;
		localStorage[getCacheKey(cacheId)] = JSON.stringify(feed);
		return st;
	});

	return feed;
};

export const getFeed = async ({ cacheId, streamSlug, forceRefresh = false }) => {
	if (!forceRefresh) {
		let cachedFeed = JSON.parse(localStorage[getCacheKey()] || 'null');

		if (cachedFeed) {
			return cachedFeed;
		}
	}

	return fetchFeed({ cacheId, streamSlug });
};

export default feedStore;
