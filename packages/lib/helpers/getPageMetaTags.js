import { BRAND_URL } from 'lib/env';
import striptags from 'striptags';

const getPageMetaTags = ({ page }) => {
	return {
		title: striptags(page.openGraph?.title || `${page.name} — ${page.title}`),
		description: striptags(page.openGraph?.description || `${page.subtitle || page.callToAction}`),
		image: page.openGraph?.imageUrl || page.demoUrl || `${BRAND_URL}/og.png?pageSlug=${page.slug}`
	};
};

export default getPageMetaTags;
