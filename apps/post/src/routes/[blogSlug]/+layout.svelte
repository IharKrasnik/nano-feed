<script>
	import { page } from '$app/stores';
	import { get } from 'lib/api';
	import { browser } from '$app/environment';
	import isCustomDomain from '$lib/stores/isCustomDomain';

	import Header from '$lib/components/Header.svelte';
	import PostPreview from '$lib/components/PostPreview.svelte';
	import BlogPreview from '$lib/components/BlogPreview.svelte';
	import Editor from '$lib/components/Editor.svelte';

	let currentPost;

	let prevSlug;

	let updatePost = ({ blogSlug, postSlug }) => {
		prevSlug = postSlug;

		if (browser && !postSlug) {
			currentPost = null;
		} else if ($page.params.post && $page.params.post.slug === postSlug) {
			currentPost = $page.params.post;
		} else {
			currentPost = null;

			get(`blogs/${blogSlug}/posts/${postSlug}`).then((loadedPost) => {
				currentPost = loadedPost;
			});
		}
	};

	$: if ($isCustomDomain && $page.params.blogSlug !== prevSlug) {
		updatePost({ postSlug: $page.params.blogSlug, blogSlug: $isCustomDomain });
	}

	$: if ($page.params.postSlug !== prevSlug) {
		updatePost({ blogSlug: $page.params.blogSlug, postSlug: $page.params.postSlug });
	}

	let blog = $page.data.blog;
</script>

{#if $page.params.postSlug || ($isCustomDomain && $page.params.blogSlug)}
	{#if currentPost}
		<Header class="bg-site" blog={currentPost.blog} />
		<PostPreview isEdit={false} bind:post={currentPost} />
	{/if}
{:else}
	<Header class="bg-site" blog={$page.data.blog} />
	<BlogPreview blog={$page.data.blog} posts={$page.data.blog?.posts || []} />
{/if}

{#if !$page.data.post && !$page.data.blog}
	<Editor />
{/if}

<slot />
