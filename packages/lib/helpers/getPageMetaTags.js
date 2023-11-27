import { BRAND_URL } from 'lib/env';
import striptags from 'striptags';

const getPageMetaTags = ({ page }) => {
	let pageTitle = page.openGraph?.title;

	if (!pageTitle) {
		pageTitle =
			(page.heros && page.heros[0] && page.heros[0].title) ||
			(page.sections && page.sections[0] && page.sections[0].title) ||
			page.title;

		pageTitle = `${page.name}${pageTitle ? ` — ${pageTitle}` : ''}`;
	}

	let pageSubtitle =
		page.openGraph?.description ||
		(page.heros && page.heros[0] && page.heros[0].subtitle) ||
		(page.sections && page.sections[0] && page.sections[0].description) ||
		page.subtitle ||
		page.callToAction ||
		'';

	return {
		title: striptags(pageTitle),
		description: striptags(pageSubtitle),
		image: page.openGraph?.imageUrl || `${BRAND_URL}/og.png?pageId=${page._id}`
	};
};

export default getPageMetaTags;
