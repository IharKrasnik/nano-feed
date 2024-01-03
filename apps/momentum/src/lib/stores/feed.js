import { writable } from 'svelte/store';
import { get } from 'lib/api';

const feedStore = writable([]);

export const fetch = async ({
	sort = { publishedOn: -1, createdOn: -1 },
	page = 1,
	perPage = 20,
	source,
	project,
	creatorUsername,
	isExplore,
	attachedToPageId,
	isWithUrlOnly = false
} = {}) => {
	feedStore.set([]);

	const query = {
		sort,
		page,
		perPage
	};

	if (project) {
		query.projectSlug = project;
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

	if (attachedToPageId) {
		query.attachedToPageId = attachedToPageId;
	}

	const { results: feed } = await get('feed', query);

	return feed;
};

export const update = async ({ sort = '-createdOn', source, project, creatorUsername } = {}) => {
	feedStore.set([]);

	const feed = await get({ sort, source, project, creatorUsername });

	feedStore.set(feed);
};

export default feedStore;
