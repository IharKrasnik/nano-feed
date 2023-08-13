import { POST_URL } from 'lib/env';
import striptags from 'striptags';

const getBlogMetaTags = ({ blog }) => {
	return {
		title: striptags(blog.openGraph?.title || `${blog.name} — ${blog.title}`),
		description: striptags(blog.openGraph?.description || `${blog.subtitle || blog.callToAction}`),
		image: blog.openGraph?.imageUrl || `${POST_URL}/og.png?blogSlug=${blog.slug}`
	};
};

export default getBlogMetaTags;
