import authServerGuard from 'lib/guards/auth.server';
import { BRAND_URL } from 'lib/env';
import { get } from 'lib/api';
import moment from 'moment';

let getDomain = (href) => {
	let res = /:\/\/([^\/]+)/.exec(href);
	return (res && res[1]) || href;
};

let getXml = ({
	sitemap,
	currentDomain
}) => `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${sitemap.rules
	.map(
		(rule) => `<url><loc>https://${currentDomain}${rule.loc}</loc>
<lastmod>${moment(rule.lastmod).format('YYYY-MM-DD')}</lastmod>
</url>`
	)
	.join('')}
</urlset>`;

export const GET = async ({ url, params, session, cookies }) => {
	let currentDomain = url.searchParams.get('pageSlug') || getDomain(url.href);

	let sitemap = await get(`sitemaps/${currentDomain}`);

	return new Response(getXml({ sitemap, currentDomain }), {
		headers: {
			'content-type': 'text/xml'
		}
	});
};
