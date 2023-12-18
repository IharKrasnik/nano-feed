<script>
	import _ from 'lodash';
	import moment from 'moment-timezone';
	import { slide, fly, scale, fade } from 'svelte/transition';
	import { get, post, put, del } from 'lib/api';
	import pageDraft from 'lib-render/stores/pageDraft';
	import allPages from 'lib-render/stores/allPages';
	import currentUser from 'lib/stores/currentUser';
	import subPages from 'lib/stores/subPages';
	import Button from 'lib/components/Button.svelte';
	import Loader from 'lib/components/Loader.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import childStreams, { refreshChildStreams } from 'lib/stores/childStreams';

	import { v4 as uuidv4 } from 'uuid';

	export let page;
	export let setPageAndDraft;

	let parentPage = page.parentPage ? $allPages.find((p) => p._id === page.parentPage._id) : page;

	let isBlogPostsLoading = true;

	let articles = [];

	let titleEl;

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
			heros: [
				{
					id: uuidv4(),
					title: newArticleTitle,
					subtitle: ''
				}
			],
			isDraft: true,
			renderType: 'article',
			dirName: 'blog',
			parentPage: { _id: parentPage._id },
			theme: {}
		});

		setPageAndDraft(blogPost, { force: true });
	};

	let getBlogPosts = async () => {
		isBlogPostsLoading = true;

		let data = await get(`pages/${parentPage._id}/subpages`, {
			renderType: 'article'
		});

		articles = data.results;
		isBlogPostsLoading = false;
	};

	let enableBlog = async () => {
		if (!parentPage.streams?.blog) {
			const { stream } = await put(`pages/${parentPage._id}/embed-stream`, {
				title: 'Blog',
				isBlogStream: true
			});

			$childStreams = [...$childStreams, stream];

			parentPage.streams = parentPage.streams || {};
			parentPage.streams.blog = stream;
		}

		let blogPage = await post('pages', {
			theme: {},
			name: 'Blog',
			heros: [
				{
					id: uuidv4(),
					title: 'Blog',
					subtitle: '',
					interactiveRenderType: 'email',
					callToActionText: 'Subscribe',
					ctaExplainer: 'Get articles to your inbox',
					theme: { isTitleLeft: true }
				}
			],
			sections: [
				{
					id: uuidv4(),
					streamSlug: parentPage.streams.blog.slug,
					title: 'Latest articles',
					subtitle: '',
					theme: {},
					columns: 1,
					items: []
				}
			],
			renderType: 'blog',
			parentPage: parentPage
		});

		$subPages = [...$subPages, blogPage];
	};

	getBlogPosts();
</script>

<div>
	<div class="font-bold opacity-80 mb-2 text-lg">Blog</div>

	{#if !$subPages.find((s) => s.slug === 'blog')}
		<div class="_section">
			<Button class="_primary _small mt-2" onClick={enableBlog}>Enable Blog</Button>
			<div class="mt-2 text-sm opacity-80">Will create /blog subpage</div>
		</div>

		<div class="mt-4 _section _info">
			<div class="font-semibold">Blogs are still cool! Cooler than ever</div>
			<div class="mt-2">
				Publish articles to: <br />

				• Get views from the search engines and increase your brand reputation over time<br />
				• Convert users to paid offers by sharing your valuable knowledge<br />
				• Repurpose articles into newsletters, tweets, medium/reddit posts and more <br />
				• Retain users by posting useful knowledge regularly <br />
			</div>
		</div>
	{:else}
		<div
			class="_section cursor-pointer"
			on:click={() => setPageAndDraft($subPages.find((s) => s.slug === 'blog'))}
		>
			<div class="font-bold">
				{$subPages.find((s) => s.slug === 'blog').heros[0].title ||
					$subPages.find((s) => s.slug === 'blog').heros[0].subtitle}
			</div>
		</div>
	{/if}
</div>

<div class="mt-8">
	{#if $subPages.find((s) => s.slug === 'blog') || articles?.length}
		<div class="font-bold opacity-80 mb-2">Articles</div>

		<div class="_section">
			<input
				class="mb-4 w-full"
				type="text"
				bind:this={titleEl}
				placeholder={newArticleTitlePlaceholder}
				bind:value={newArticleTitle}
			/>

			<Button
				class="mb-2 _primary _small"
				onClick={() => {
					if (newArticleTitle) {
						createNewArticle();
					} else {
						titleEl.focus();
					}
				}}>Create article</Button
			>
			<div class="text-sm mt-2">Share your knowledge and grow!</div>
		</div>

		<hr class="my-8" />

		{#each articles as article (article._id)}
			<div
				class="_section cursor-pointer"
				on:click={() => {
					if ($pageDraft[article._id]) {
						setPageAndDraft({ ...$pageDraft[article._id] }, true);
					} else {
						setPageAndDraft(article, true);
					}
				}}
			>
				<div class="flex justify-between items-center">
					<div>
						<div class="flex justify-between items-center">
							<div class="relative">
								<div class=" font-bold">
									{article.heros[0]?.title || ''}
								</div>

								<div class="truncate">
									{article.heros[0]?.subtitle || ''}
								</div>

								<!-- {#if $pageDraft[article._id]?.isDirty}
									<div class="flex items-center font-semibold text-sm">
										Edited
										<div class="w-[10px] h-full flex items-center ml-2">
											<div class=" w-[10px] h-[10px] bg-orange-300 rounded-full" />
										</div>
									</div>
								{/if} -->
							</div>
						</div>
						<div class="opacity-80 text-sm mt-2">
							{moment(article.createdOn).format('DD MMM')}
						</div>
					</div>
					<div class="flex items-center">
						<FeatherIcon class="mr-2" size="15" name="eye" color="#333333" />
						{article.totalViewsCount || 0}
					</div>
				</div>
			</div>
		{/each}
	{/if}
</div>
