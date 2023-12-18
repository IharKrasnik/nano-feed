import getDomain from 'lib/helpers/getDomain';

let getRobots = ({ currentDomain }) =>
	`User-agent: *
Allow: /
Sitemap: https://${currentDomain}/sitemap.xml`;

export const GET = async ({ url }) => {
	let currentDomain = url.searchParams.get('pageSlug') || getDomain(url.href);

	return new Response(getRobots({ currentDomain }), {
		headers: {
			'content-type': 'text/plain'
		}
	});
};
