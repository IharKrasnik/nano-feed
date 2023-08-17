import { BRAND_URL } from 'lib/env';
import striptags from 'striptags';

const getPostMetaTags = ({ post }) => {
	if (!post || !post._id) {
		return {};
	}
	return {
		title: striptags(post.title),
		description: striptags(post.description),
		image: post.imageUrl || `${BRAND_URL}/og.png?postId=${post._id}`
	};
};

export default getPostMetaTags;
