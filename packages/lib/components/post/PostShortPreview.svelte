<script>
	import moment from 'moment';
	import SvelteMarkdown from 'svelte-markdown';
	import striptags from 'striptags';

	import { BRAND_URL } from 'lib/env';

	import Avatar from 'lib/components/Avatar.svelte';

	import isCustomDomain from 'lib/stores/isCustomDomain';

	export let post;
	export let linkTarget = '';
</script>

<a
	class="mb-8"
	target={linkTarget}
	href={$isCustomDomain ? `/${post.slug}` : `/${post.blog.slug}/${post.slug}`}
>
	<img
		class="object-cover w-full mb-2 rounded-xl aspect-[1200/630]"
		src={post.imageUrl || `${BRAND_URL}/og.png?postId=${post._id}`}
	/>

	<h3 class="text-xl font-bold mb-2">{@html striptags(post.title)}</h3>
	<div class="text-lg">{@html striptags(post.description)}</div>
	<div class="flex items-center my-4">
		<Avatar user={post?.creator} size="20px" class="mr-2" />
		<b class="mx-1">{post?.creator?.fullName}</b>
		<div class="px-1 opacity-70">/</div>
		<div class="opacity-70">{moment(post.publishedOn).format('MMM DD, YYYY')}</div>
	</div>
</a>
