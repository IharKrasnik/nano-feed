import { PAGE_URL } from 'lib/env';

const getPageMetaTags = ({ page }) => {
	return {
		title: page.openGraph?.title || `${page.name} — ${page.title}`,
		description: page.openGraph?.description || `${page.subtitle || page.callToAction}`,
		image: page.openGraph?.imageUrl || page.demoUrl || `${PAGE_URL}/og.png?pageSlug=${page.slug}`
	};
};

export default getPageMetaTags;
