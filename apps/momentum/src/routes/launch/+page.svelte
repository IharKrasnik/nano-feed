<script>
	import slug from 'slug';
	import axios from 'axios';
	import { fade, fly } from 'svelte/transition';
	import { GOOGLE_LOGIN_URL } from 'lib/env';
	import { post, put } from 'lib/api';
	import { PAGE_URL } from 'lib/env';
	import { browser } from '$app/environment';
	import getRandomProjectEmoji from 'lib/services/getRandomProjectEmoji';
	import { goto } from '$app/navigation';
	import Loader from 'lib/components/Loader.svelte';
	import PageIcon from '$lib/images/PageIcon.svelte';

	import projects from '$lib/stores/projects';
	import currentUser from 'lib/stores/currentUser';
	import Browser from '$lib/components/Browser.svelte';
	import FeedItem from '$lib/components/FeedItem.svelte';

	if (browser && !$currentUser) {
		goto(GOOGLE_LOGIN_URL);
	}

	let project = {
		icon: getRandomProjectEmoji(),
		slug: '',
		title: '',
		description: ''
	};

	let isFeedItemAdding = false;

	const onNameChange = () => {
		project.slug = slug(project.title);
	};

	let isLoading = false;

	let feedItem = null;

	const launchProject = async () => {
		isLoading = true;

		try {
			let createdProject = await post('projects', project);
			let queryString = '';

			if (currentPage === 'page') {
				const page = await post('pages', {
					name: project.title,
					title: project.description,
					streamSlug: createdProject.slug
				});

				createdProject.url = `${PAGE_URL}/${page.slug}`;

				createdProject = await put(`projects/${createdProject._id}`, {
					url: createdProject.url,
					page: { _id: page._id }
				});
			} else {
				queryString = '?embed=true';
			}

			feedItem.projects = [{ _id: createdProject._id }];
			feedItem.url = createdProject.url;

			await post('feed', feedItem);

			$projects = [createdProject, ...$projects];

			let params = '';

			goto(`/${createdProject.slug}${queryString}`);
		} catch (err) {
			isLoading = false;
		} finally {
		}
	};

	let isUrlAdding = true;
	let isTitleAdding = false;

	let currentPage = 'page';
	isTitleAdding = true;

	const setPage = (newPage) => {
		currentPage = newPage;

		if (newPage === 'page') {
			isTitleAdding = true;
		} else {
			isTitleAdding = false;
		}
	};

	let metatags;

	let submit = async (evt) => {
		evt.preventDefault();

		if (isTitleAdding && project.title && project.description) {
			return launchProject();
		} else if (isUrlAdding && (currentPage === 'page' || project.url)) {
			if (currentPage === 'url') {
				isLoading = true;

				try {
					const { data } = await axios({
						url: 'https://igor.npkn.net/fetch-meta-tags',
						params: { url: project.url }
					});

					metatags = data;

					project.title = (metatags.titleTag || metatags.title || '').split(' ')[0];
					project.description = metatags.description;
					project.bannerUrl = metatags.image;
					project.icon = metatags.favicon;

					feedItem.title = `I'm building ${project.title} in public 💥`;
					feedItem.content = project.description;
					feedItem.url = project.url;

					feedItem.attachments[0].url = project.bannerUrl || data.image;
				} finally {
					isLoading = false;
				}
			}

			isUrlAdding = false;
			isTitleAdding = true;
		} else if (project.title && project.description) {
			isUrlAdding = true;
		} else {
			return;
		}
	};

	let feed = [];

	$: if (project) {
		feedItem = {
			publishedOn: new Date(),

			title: `I'm building ${project.title} in public 💥`,
			content: `${project.description}.

Follow my updates here:`,
			url: project.url,
			creators: [$currentUser],
			attachments: [
				{
					type: 'image',
					url: `${PAGE_URL}/og.png?name=${project.title}&title=${project.description}`
				}
			]
		};

		feed = [feedItem];
	}
</script>

<h2 class="mb-2">Launch a new stream</h2>

<h3 class="mb-8">
	Promote the work that you do daily. <br />
	Stream is a public page for your updates, releases and links.
</h3>

{#if !$currentUser}
	<Loader />
{:else}
	<form on:submit={submit}>
		<div class="mb-8">
			<label>Your Website</label>
			<div class="_hint mb-4">Website to embed Momentum Feed into.</div>

			<div class="mb-8">
				<button
					class="tab mb-4 text-left"
					type="button"
					class:selected={currentPage === 'page'}
					on:click={() => setPage('page')}>Launch new page</button
				>
				<button
					type="button"
					class="tab mb-4"
					class:selected={currentPage === 'url'}
					on:click={() => setPage('url')}>Embed to existing website</button
				>
			</div>
		</div>

		{#if isTitleAdding}
			<div class="mb-8" in:fade>
				<label>Name </label>
				<div class="_hint mb-4">The name should be short and catchy. It's your brand name.</div>

				<input
					type="text"
					bind:value={project.title}
					on:input={onNameChange}
					placeholder="eg. Momentum, Paralect, MyCatchyBrand etc."
				/>
			</div>

			{#if project.title}
				<div class="mb-8" in:fade={{ duration: 100 }}>
					<label>Tagline</label>
					<div class="_hint mb-4">
						One-liner about your brand. Explain what you do with {project.title}. Make a random
						reader want to follow your journey.
					</div>

					<input
						type="text"
						bind:value={project.description}
						placeholder="eg. 'Grow your audience early'"
					/>
				</div>
			{/if}
		{:else if isUrlAdding}
			<div class="mb-8" in:fade>
				{#if currentPage === 'url'}
					<input
						type="url"
						bind:value={project.url}
						placeholder="https://{project.slug || 'mybrand'}.com"
					/>
				{:else}{/if}
			</div>
		{:else if isFeedItemAdding}
			<FeedItem {feedItem} />
		{/if}

		{#if isLoading}
			<Loader />
		{:else}
			{#if isUrlAdding && !isTitleAdding}
				<div class="mt-12" class:opacity-40={!project.url}>
					<button disabled={!project.url}> Continue → </button>
				</div>
			{/if}

			{#if isTitleAdding}
				<div class="mt-12">
					<button type="submit" disabled={!project.title || !project.description}>
						🚀 Launch #{project.title}
					</button>
				</div>
			{/if}
		{/if}
	</form>

	{#if isTitleAdding && project.title}
		<div in:fly={{ y: 50, delay: 200 }} class="mt-8">
			<Browser
				bind:project
				bind:feed
				onClose={() => {
					isTitleAdding = false;
					isUrlAdding = true;
				}}
			/>
		</div>
		<!-- <div class="p-4 md:p-8 bg-zinc-900 mb-8 rounded-xl mt-16">
		<div class="flex">
			<div>
				<div class="font-bold mt-4">
					Launch a new website with
					<a href="https://page.mmntm.build" target="_blank" rel="noreferrer"> Momentum IDE </a>
				</div>
			</div>
		</div>
		<div class="mt-2 mb-4">
			<span class="opacity-70">Here's how you page will look like</span> 👇
		</div>

		<div>
			<iframe
				style="width: 100%; min-height: 300px; aspect-ratio: 3/2;"
				src={'https://www.loom.com/embed/a5f72ee492c0442688b4d34268542601'}
			/>
		</div>

		<div class="flex items-center text-sm mt-4">
			<div class="mr-4">
				<PageIcon />
			</div>

			<div class="opacity-70">
				<a target="_blank" href="https://mmntm.me/context">See Context Page</a>
			</div>

			<div class="opacity-70 ml-4">
				<a target="_blank" href="https://feed.mmntm.build/context">See Context Stream</a>
			</div>
		</div>
	</div> -->
	{/if}
{/if}
