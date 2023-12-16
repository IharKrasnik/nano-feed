import { writable } from 'svelte/store';
import { get } from 'lib/api';
import { get as getStoreValue } from 'svelte/store';
import getDomain from 'lib/helpers/getDomain';

const pagesStore = writable([]);
const feedStore = writable([]);

export { feedStore as feed };
export { pagesStore as pages };

export let selectTemplatePage = async (feedItem, { page }) => {
	let foundPage = getStoreValue(pagesStore).find((p) => p.url === feedItem.url);

	if (foundPage) {
		return foundPage;
	} else {
		let domain = getDomain(feedItem.url);
		let subPageSlug = feedItem.url.replace(domain + '/', '').replace('https://', '');

		let templatePage = await get(
			`pages/${encodeURIComponent(subPageSlug || domain.replace('.mmntm.page', ''))}`,
			{
				...(subPageSlug ? { parentPageSlug: domain } : {})
			}
		);

		templatePage.subPages = [];

		let parentPage = page.parentPage || page;

		templatePage.theme.backgroundColor = parentPage.theme?.backgroundColor;
		templatePage.theme.accentColor = parentPage.theme?.accentColor;
		templatePage.theme.theme = parentPage.theme?.theme;
		templatePage.theme.buttonColor = parentPage.theme.buttonColor;

		templatePage.url = feedItem.url;

		pagesStore.update((p) => {
			return [...p, templatePage];
		});

		return templatePage;
	}
};
