import { POST_URL } from 'lib/env';
import striptags from 'striptags';

const getPostMetaTags = ({ post }) => {
	return {
		title: striptags(post.title),
		description: striptags(post.description),
		image: post.imageUrl || `${POST_URL}/og.png?blogSlug=${post.blog.slug}`
	};
};

export default getPostMetaTags;
