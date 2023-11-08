<script>
	import _ from 'lodash';
	import moment from 'moment-timezone';
	import { slide, fly, scale, fade } from 'svelte/transition';
	import { get, post, put } from 'lib/api';

	import currentUser from 'lib/stores/currentUser';

	import Button from 'lib/components/Button.svelte';
	import Loader from 'lib/components/Loader.svelte';

	export let page;
	export let setPageAndDraft;

	let isBlogPostsLoading = true;

	let articles = [];

	let createNewArticle = async () => {
		await post('pages', {
			name: 'new blog post',
			isDraft: true,
			renderType: 'article',
			parentPage: { _id: page.parentPage?._id || page._id }
		});
	};

	let getBlogPosts = async () => {
		isBlogPostsLoading = true;

		let data = await get(`pages/${page.parent?._id || page?._id}/subpages`, {
			renderType: 'article'
		});

		articles = data.results;
		isBlogPostsLoading = false;
	};

	getBlogPosts();
</script>

<div class="px-8 py-16 mt-8">
	{#if !isBlogPostsLoading && !articles.length}
		<h2 class="text-lg font-medium mb-4">
			It looks like you have no articles yet... Let's fix that!
		</h2>
		<div>
			<Button class="mb-2 _primary" onClick={createNewArticle}>Write my first article</Button>
		</div>

		<div class="mt-8">
			Blogs are still cool! Cooler than ever <br />

			<div class="mt-2">
				Publish articles to: <br />

				• Get views from the search engines and increase your brand reputation over time<br />
				• Convert users to paid offers by sharing your valuable knowledge<br />
				• Repurpose articles into newsletters, tweets, medium/reddit posts and more <br />
				• Retain users by posting useful knowledge regularly <br />
			</div>
		</div>
	{:else if isBlogPostsLoading}
		<Loader />
	{:else if articles?.length}
		{#each articles as article (article._id)}
			<a
				on:click={() => {
					setPageAndDraft(article, true);
				}}
			>
				{article.name}
			</a>
		{/each}
	{/if}
</div>
