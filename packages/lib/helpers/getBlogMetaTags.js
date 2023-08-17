import { BRAND_URL } from 'lib/env';
import striptags from 'striptags';

const getBlogMetaTags = ({ blog }) => {
	return {
		title: striptags(blog.openGraph?.title || `${blog.name} — ${blog.title}`),
		description: striptags(blog.openGraph?.description || `${blog.subtitle || blog.callToAction}`),
		image: blog.openGraph?.imageUrl || `${BRAND_URL}/og.png?blogId=${blog._id}`
	};
};

export default getBlogMetaTags;
