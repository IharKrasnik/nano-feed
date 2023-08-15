<script>
	import _ from 'lodash';
	import moment from 'moment-timezone';
	import { onMount } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';
	import { slide, fly, scale, fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { page as sveltePage } from '$app/stores';
	import striptags from 'striptags';
	import getOtpAndOpen from 'lib/helpers/getOtpAndOpen';
	import Button from 'lib/components/Button.svelte';

	import { GOOGLE_LOGIN_URL, PAGE_URL, POST_URL, STREAM_URL, BRAND_URL } from 'lib/env';
	import Emoji from 'lib/components/Emoji.svelte';

	import { get, post, put } from 'lib/api';

	import currentUser from 'lib/stores/currentUser';

	export let blog;
	export let page;
	export let isBroadcastEmailModalShown;

	let pages;
	let blogs;

	let isPageEditMode;
	let isBlogEditMode;

	let createPage = async () => {
		let page = await post('pages', {
			name: blog.name,
			title: blog.title,
			subtitle: blog.subtitle,
			blogId: blog._id
		});

		goto(PAGE_URL);
	};

	let createBlog = async () => {
		let page = await post('blogs', {
			name: blog.name,
			title: blog.title,
			subtitle: blog.subtitle,
			pageId: page._id
		});

		goto(POST_URL);
	};

	let editPage = async () => {
		let results = await get('pages/my');

		pages = results;
		isPageEditMode = true;

		if (pages.length === 0) {
			await createPage();
		} else {
			if (!blog.page) {
				blog.page = pages[0];
			}
		}
	};

	let editBlog = async () => {
		let results = await get('blogs/my');

		blogs = results;
		isBlogEditMode = true;

		if (blogs.length === 0) {
			await createBlog();
		} else {
			if (!page.blog) {
				page.blog = blogs[0];
			}
		}
	};

	let updatePage = async () => {
		if (blog.page._id === '_new') {
			await createPage();
		} else {
			blog = await put(`blogs/${blog._id}/page`, {
				pageId: blog.page._id === '_del' ? null : blog.page._id
			});
		}
		isPageEditMode = false;
		pages = [];
	};

	let updateBlog = async () => {
		if (page.blog._id === '_new') {
			await createBlog();
		} else {
			page = await put(`pages/${page._id}/blog`, {
				blogId: page.blog._id === '_del' ? null : page.blog._id
			});
		}
		isBlogEditMode = false;
		blogs = [];
	};
</script>

<div class="mb-16">
	<div class="flex justify-between mb-4">
		<div>
			<div class="text-lg font-bold mb-2">Gain your Momentum</div>
			<div>
				Momentum tools are stupid-simple yet surprisingly efficient. We target content, distribution
				and traction.
			</div>
		</div>

		<!-- <button class="_secondary _small" on:click={createNewPost}
      >✍️ Write New Post</button
    > -->
	</div>
	<hr class="my-8 border-[#8B786D] opacity-30" />

	{#if page}
		{#if isBlogEditMode}
			<select class="p-4 w-full text-lg mb-4" bind:value={page.blog._id}>
				{#if blogs?.length}
					{#each blogs as blog}
						<option value={blog._id}>
							<Emoji emoji={blog.logo} /> {blog.name} — {blog.title}</option
						>
					{/each}
				{/if}
				<option value="_new">➕ New Blog</option>

				{#if pages?.length}
					<option value="_del">🙅‍♂️ Disconnect Blog</option>
				{/if}
			</select>

			<Button class="_primary mb-4" onClick={updateBlog}>
				{page.blog._id === '_new' ? 'Create Blog' : ''}
				{page.blog._id === '_del' ? 'Disconnect Blog' : ''}
				{page.blog._id !== '_del' && page.blog._id !== '_new' ? 'Update Blog' : ''}
			</Button>
		{/if}

		{#if page.blog}
			{#if !isBlogEditMode && !pages?.length}
				<Button class="_secondary w-full mb-2" onClick={editBlog}
					>✅ Blog{page.blog.name ? ` — ${page.blog.name}` : ''}</Button
				>
			{/if}
		{:else}
			<Button class="_secondary w-full mb-2" onClick={editBlog}
				>✍️ {page.blog ? 'Edit' : 'Connect'} Blog</Button
			>
		{/if}
		Connect a blog to your landing page to publish your best content and attract more leads to your newsletter.
	{/if}

	{#if blog}
		{#if isPageEditMode}
			<select class="p-4 w-full text-lg mb-4" bind:value={blog.page._id}>
				{#if pages?.length}
					{#each pages as page}
						<option value={page._id}>
							<Emoji emoji={page.logo} /> {page.name} — {page.title}</option
						>
					{/each}
				{/if}
				<option value="_new">➕ New Page</option>

				{#if pages?.length}
					<option value="_del">🙅‍♂️ Disconnect Page</option>
				{/if}
			</select>

			<Button class="_primary mb-4" onClick={updatePage}>
				{blog.page._id === '_new' ? 'Create Page' : ''}
				{blog.page._id === '_del' ? 'Disconnect Page' : ''}
				{blog.page._id !== '_del' && blog.page._id !== '_new' ? 'Update Page' : ''}
			</Button>
		{/if}

		{#if blog.page}
			{#if !pages?.length}
				<Button class="_secondary w-full mb-2" onClick={editPage}
					>✅ Page{blog.page.name ? ` — ${blog.page.name}` : ''}</Button
				>
			{/if}
		{:else}
			<Button class="_secondary w-full mb-2" onClick={editPage}
				>📄 {blog.page ? 'Edit' : 'Connect'} Page</Button
			>
		{/if}
		Connect a landing page to your blog to collect more leads, grow with social media and sell your products
		and services.
	{/if}

	<div class="mt-8">
		<button
			class="_secondary w-full mb-2"
			on:click={() => {
				isBroadcastEmailModalShown = true;
			}}>✉️ Send Newsletter</button
		>

		Engage with your mail list regularly to grow and launch products and services.
	</div>

	<div class="mt-8">
		<Button
			class="_secondary w-full mb-2"
			onClick={() => {
				goto(BRAND_URL);
			}}>💐 Create Brand</Button
		>

		Create nice-looking images for your social media and content. <br />
		Alfa Version.
	</div>

	<div class="mt-8">
		<Button onClick={() => getOtpAndOpen(`https://nanohq.co`)} class="_secondary w-full mb-2"
			>⚫️ Join Nano Community</Button
		>

		Build your startup in public, connect with other founders, create content regularly and win
		startup prizes. Get exposure and funding.
	</div>

	<div class="mt-8">
		<a href="https://feed.mmntm.build" target="_blank">
			<button class="_secondary w-full mb-2">🌀 Open Stream</button>
		</a>

		Feature your best content links and attach live content feed to your websites. Grow with
		community.
	</div>

	<div class="mt-8">
		<a href="https://wave.mmntm.build" target="_blank">
			<button class="_secondary w-full mb-2">📈 Open Wave</button>
		</a>

		Your website and product analytics dashboard.
	</div>
</div>
