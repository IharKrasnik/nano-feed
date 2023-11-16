<script>
	import _ from 'lodash';
	import moment from 'moment-timezone';
	import { slide, fly, scale, fade } from 'svelte/transition';
	import { get, post, put, del } from 'lib/api';
	import pageDraft from '$lib/stores/pageDraft';
	import allPages from '$lib/stores/allPages';
	import currentUser from 'lib/stores/currentUser';

	import Button from 'lib/components/Button.svelte';
	import Loader from 'lib/components/Loader.svelte';

	export let page;
	export let setPageAndDraft;

	let isBlogPostsLoading = true;

	let articles = [];

	let newArticleTitle = '';

	let newArticleTitlePlaceholder = _.shuffle([
		'Top 10 easy tools to get to some outcome',
		'How to solve some specific issue in 10 minutes'
	])[0];

	let createNewArticle = async () => {
		if (!newArticleTitle) {
			return;
		}

		let blogPost = await post('pages', {
			name: newArticleTitle,
			title: newArticleTitle,
			isDraft: true,
			renderType: 'article',
			parentPage: { _id: page.parentPage?._id || page._id }
		});

		setPageAndDraft(blogPost, { force: true });
	};

	let getBlogPosts = async () => {
		isBlogPostsLoading = true;

		let data = await get(`pages/${page.parentPage?._id || page?._id}/subpages`, {
			renderType: 'article'
		});

		articles = data.results;
		isBlogPostsLoading = false;
	};

	let deleteArticle = async (article) => {
		if (
			confirm(`The article ${article.title || article.name} will be deleted forever. Continue?`)
		) {
			await del(`pages/${article._id}`);
		}

		articles = articles.filter((a) => a._id !== article._id);

		delete $pageDraft[article._id];
		delete $pageDraft[article.slug];

		$pageDraft = {
			...$pageDraft
		};

		if (page._id === article._id) {
			setPageAndDraft({ ...$allPages[0] });
		}
	};

	getBlogPosts();
</script>

<div class="px-8 py-16 mt-8">
	{#if !isBlogPostsLoading && !articles.length}
		<h2 class="text-lg font-medium mb-4">
			It looks like you have no articles yet... Let's fix that!
		</h2>

		<div>
			<input
				class="mb-4 w-[420px]"
				type="text"
				placeholder={newArticleTitlePlaceholder}
				bind:value={newArticleTitle}
			/>
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
		<div>
			<input
				class="mb-4 w-[420px]"
				type="text"
				placeholder={newArticleTitlePlaceholder}
				bind:value={newArticleTitle}
			/>

			<Button class="mb-2 _primary" onClick={createNewArticle}>Write a new article</Button>
			<div>Share your knowledge and grow!</div>
		</div>

		<hr class="my-8" />
		<div class="text-xl mt-8 mb-4 font-bold opacity-40">All Articles</div>

		{#each articles as article (article._id)}
			<div class="mb-2">
				<a
					class="relative text-lg font-bold"
					on:click={() => {
						if ($pageDraft[article._id]) {
							setPageAndDraft({ ...$pageDraft[article._id] }, true);
						} else {
							setPageAndDraft(article, true);
						}
					}}
				>
					{article.name}

					{#if $pageDraft[article._id]?.isDirty}
						<div class="absolute left-0 top-0 w-[10px] h-full flex items-center ml-[-8px]">
							<div
								class=" w-[10px] h-[10px] bg-orange-300 rounded-full"
								style="transform: translateX(-100%);"
							/>
						</div>
					{/if}
				</a>

				<button class="ml-4" on:click={() => deleteArticle(article)}>🗑</button>
			</div>
		{/each}
	{/if}
</div>
