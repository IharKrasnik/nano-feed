import _ from 'lodash';
import { PAGE_URL } from 'lib/env';

export default ({ page }) => {
	if ((page.parentPage?.domains || page.domains || []).filter((d) => d.isConfigured).length) {
		return `https://${
			_.last((page.parentPage?.domains || page.domains || []).filter((d) => d.isConfigured)).url
		}${page.parentPage ? `/${page.slug}` : ''}`;
	} else {
		if (PAGE_URL.includes('localhost')) {
			return `${PAGE_URL}${page.parentPage ? `/${page.slug}` : ''}?pageSlug=${
				page.parentPage?.slug || page.slug
			}`;
		}

		return `https://${page.parentPage?.slug || page.slug}.${PAGE_URL.replace('https://', '')}${
			page.parentPage ? `/${page.slug}` : ''
		}`;
	}
};
