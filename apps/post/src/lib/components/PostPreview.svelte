<script>
	import moment from 'moment';
	import getPostMetaTags from 'lib/helpers/getPostMetaTags';

	import { BRAND_URL } from 'lib/env';
	import { get } from 'lib/api';
	import Avatar from 'lib/components/Avatar.svelte';
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import contenteditable from 'lib/use/contenteditable';
	import EndSubmitForm from '$lib/components/EndSubmitForm.svelte';
	import ContentEditable from 'lib/components/ContentEditable.svelte';
	import PublishedLabel from '$lib/components/PublishedLabel.svelte';
	import PostShortPreview from '$lib/components/PostShortPreview.svelte';

	import styles from '$lib/stores/styles';

	export let post;

	let blog = post.blog;

	export let isDraft = false;

	export let isEdit = true;
	let similarPosts = [];

	if (isDraft) {
		post.contentHtml = post.draft?.contentHtml || post.contentHtml || '';
	}

	if (!isEdit) {
		get(`blogs/${blog.slug}/posts`, { similarToPostId: post._id, perPage: 4 }).then(
			({ results }) => {
				similarPosts = results;
			}
		);
	}

	if (post?._id) {
		let defaultTags = getPostMetaTags({ post });
		post.defaultImageUrl = defaultTags.image || `${BRAND_URL}/og.png?postId=${post._id}`;
	}

	debugger;
</script>

{#if post}
	{#if post._id && isEdit}
		<PublishedLabel bind:blog bind:post />
	{/if}

	<div style={$styles.css} class="sm:mt-16 mt-8">
		<div class="sticky bg-site color-site z-20 w-full min-h-screen">
			<div class="max-w-[700px] py-16 px-2 mx-auto">
				<h1 class="mb-4">
					{post.title || ''}

					{#if !post.title && isEdit}
						<div class="opacity-40">👈 Add post title...</div>
					{/if}
				</h1>

				<div class="content my-8 opacity-70 text-lg">
					{post.description || ''}

					{#if !post.description && isEdit}
						<div class="opacity-60">👈 Add short post description...</div>
					{/if}
				</div>

				{#if post.imageUrl || post.defaultImageUrl}
					<RenderUrl
						imgClass="w-full my-4 aspect-[1200/630]"
						isLazy={false}
						url={post.imageUrl || post.defaultImageUrl}
					/>
				{/if}

				<div class="flex items-center my-4 mb-16">
					<Avatar user={post.creator} size="20px" class="mr-2" />
					<b class="mx-1">{post.creator?.fullName}</b>
					<div class="px-1 opacity-70">/</div>
					<div class="opacity-70">{moment(post.publishedOn).format('MMM DD, YYYY')}</div>
				</div>

				{#if isEdit}
					<ContentEditable
						class="content min-h-screen bg-site color-site"
						bind:value={post.contentHtml}
						isWithMenu={true}
					/>
					<!-- <div
						bind:innerHTML={post.contentHtml}
						contenteditable
						use:contenteditable={{ isWithMenu: true }}
						class="content"
					/> -->
				{:else}
					<div class="content mb-16">
						{@html post.contentHtml}
					</div>
				{/if}

				{#if similarPosts?.length}
					<h3>Related Posts</h3>
					<div class="grid sm:grid-cols-2 gap-8 grid-cols-1 mb-16 sticky bg-site static z-20">
						{#each similarPosts as post}
							<PostShortPreview {post} />
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>

	{#if !isEdit}
		<EndSubmitForm bind:post />
	{/if}
{/if}

<style src="./app-site.css">
</style>
