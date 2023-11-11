import moment from 'moment';
import getDomain from 'lib/helpers/getDomain';

let getSitemap = ({
	currentDomain
}) => `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
<url>
<loc>https://${currentDomain}/</loc>
<lastmod>${moment().format('YYYY-MM-DD')}</lastmod>
</url>
</urlset>`;

export const GET = ({ url }) => {
	return new Response(getSitemap({ currentDomain: getDomain(url.href) }), {
		headers: {
			'content-type': 'text/xml'
		}
	});
};
