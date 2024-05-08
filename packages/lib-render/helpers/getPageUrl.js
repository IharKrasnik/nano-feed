import _ from 'lodash';
import { PAGE_URL } from 'lib/env';

let getSlug = (page) => {
	if (!page.dirName) {
		return page.slug;
	} else if (page.dirName === 'blog') {
		return `blog/post/${page.slug}`
	} else {
		return `${page.dirName}/${page.slug}`
	}
}

export default ({ page }) => {
	if ((page.parentPage?.domains || page.domains || []).filter((d) => d.isConfigured).length) {
		return `https://${_.last((page.parentPage?.domains || page.domains || []).filter((d) => d.isConfigured)).url
			}${page.parentPage ? `/${getSlug(page)}` : ''}`;
	} else {
		// if (PAGE_URL.includes('localhost')) {
		// 	return `${PAGE_URL}${page.parentPage ? `/${page.slug}` : ''}?pageSlug=${
		// 		page.parentPage?.slug || page.slug
		// 	}`;
		// }

		return `https://${getSlug(page.parentPage || page)}.${PAGE_URL.replace('https://', '')}${page.parentPage ? `/${page.slug}` : ''
			}`;
	}
};
