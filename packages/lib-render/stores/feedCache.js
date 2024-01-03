import _ from 'lodash';
import { writable } from 'svelte/store';
import { get, post } from 'lib/api';

const feedStore = writable({});

let getCacheKey = (cacheId) => `feed-${cacheId}`;

let getTags = (feed) => {
	let tags = [];
	let tagsStrs = feed.filter((f) => f.tagsStr).map((f) => f.tagsStr);

	tagsStrs.forEach((tagsStr) => {
		let itemTags = tagsStr.split(',').map((t) => _.trim(t));
		itemTags.forEach((itemTag) => tags.push(itemTag));
	});

	return _.uniq(tags);
};

export const fetchFeed = async ({
	sort = { publishedOn: -1, createdOn: -1 },
	page = 1,
	perPage = 20,
	source,
	streamSlug = '',
	tag = null,
	cacheId = streamSlug,
	creatorUsername,
	isExplore,
	isWithUrlOnly = false,
	isWithImageOnly = false,
	attachedToPageId
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

	if (tag) {
		query.tag = tag;
	}

	if (attachedToPageId) {
		query.attachedToPageId = attachedToPageId;
	}

	let { results: feed, count } = await get('feed', query);

	feedStore.update((st) => {
		st[cacheId] = {
			updatedOn: new Date(),
			feed: feed.map((f) => ({ ...f, id: f.id || f._id })),
			tags: getTags(feed),
			totalCount: count
		};
		st.updatedOn = new Date();
		localStorage[getCacheKey(cacheId)] = JSON.stringify(st[cacheId]);
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
	attachedToPageId = null,
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

	let tag = '';

	if (streamSettings) {
		if (streamSettings.sortBy) {
			sort = streamSettings.sortBy;
		}

		if (streamSettings.limit) {
			perPage = streamSettings.limit;
		}

		if (streamSettings.filterTags) {
			tag = streamSettings.filterTags;
		}

		if (streamSettings.attachedToPageId) {
			attachedToPageId = streamSettings.attachedToPageId;
		}
	}

	return fetchFeed({
		cacheId,
		sort,
		perPage,
		streamSlug,
		attachedToPageId,
		tag,
		isWithUrlOnly: streamSettings?.isWithUrlOnly,
		isWithImageOnly: streamSettings?.isWithImageOnly,
		page
	});
};

export let updateFeedSortOrder = async ({ sortedItems, streamId, streamSlug }) => {
	feedStore.update((s) => {
		s[streamSlug] = {
			...s[streamSlug],
			feed: sortedItems
		};

		return s;
	});

	await post(`streamSortOrders`, {
		streamId,
		streamSlug,
		sortOrder: sortedItems.map((i) => i._id)
	});
};

export default feedStore;
