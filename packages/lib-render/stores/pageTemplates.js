import { writable } from 'svelte/store';
import { get } from 'lib/api';
import { get as getStoreValue } from 'svelte/store';
import getDomain from 'lib/helpers/getDomain';
import isInsertPopupShown from 'lib-render/stores/isInsertPopupShown';
import selectedTemplatePage from 'lib-render/stores/selectedTemplatePage';

const pagesStore = writable([]);
const feedStore = writable([]);

export { feedStore as feed };
export { pagesStore as pages };

export let selectTemplatePage = async (feedItem, { page } = {}) => {
	if (!feedItem._id) {
		feedItem = await get('feed/bySlug', {
			projectSlug: 'momentum-page-templates',
			slug: feedItem.slug
		});
	}

	let foundPage = getStoreValue(pagesStore).find((p) => p.url === feedItem.url);

	if (foundPage) {
		return foundPage;
	} else {
		let domain = getDomain(feedItem.url);
		let subPageSlug = feedItem.url
			.replace(domain + '/', '')
			.replace('https://', '')
			.replace('.mmntm.page', '');

		let templatePage = await get(
			`pages/${encodeURIComponent(subPageSlug || domain.replace('.mmntm.page', ''))}`,
			{
				...(subPageSlug ? { parentPageSlug: domain.replace('.mmntm.page', '') } : {})
			}
		);

		templatePage.subPages = [];

		let parentPage = page?.parentPage || page;

		if (parentPage) {
			// templatePage.theme.backgroundColor =
			// 	parentPage.theme?.backgroundColor || templatePage.theme.backgroundColor;
			// templatePage.theme.accentColor =
			// 	parentPage.theme?.accentColor || templatePage.theme.accentColor;
			// templatePage.theme.theme = parentPage.theme?.theme || templatePage.theme.theme;
			// templatePage.theme.buttonColor =
			// 	parentPage.theme?.buttonColor || templatePage.theme.buttonColor;
		}

		templatePage.url = feedItem.url;

		pagesStore.update((p) => {
			return [...p, templatePage];
		});

		selectedTemplatePage.update(() => templatePage);
		isInsertPopupShown.update(() => true);

		return templatePage;
	}
};