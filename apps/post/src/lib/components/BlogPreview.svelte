<script>
	import moment from 'moment';
	import SvelteMarkdown from 'svelte-markdown';
	import striptags from 'striptags';

	import { post } from 'lib/api';
	import { page as sveltePage } from '$app/stores';
	import { fly, fade, slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { darken, lighten } from 'lib/helpers/color';
	import Avatar from 'lib/components/Avatar.svelte';
	import EndSubmitForm from '$lib/components/EndSubmitForm.svelte';

	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import RenderSection from '$lib/components/render/Section.svelte';

	import Emoji from 'lib/components/Emoji.svelte';
	import Header from '$lib/components/Header.svelte';
	import PostShortPreview from '$lib/components/PostShortPreview.svelte';
	import sectionToEdit from '$lib/stores/sectionToEdit';
	import aboveTheFoldEl from '$lib/stores/aboveTheFoldEl';
	import isCustomDomain from '$lib/stores/isCustomDomain';
	import styles from '$lib/stores/styles';

	import feedLastUpdatedOn from '$lib/stores/feedLastUpdatedOn';

	import TwitterIcon from 'lib/icons/twitter.svelte';
	import LinkedInIcon from 'lib/icons/linkedin.svelte';
	import PostBadge from '$lib/components/PostBadge.svelte';

	import iframeResize from 'iframe-resizer/js/iframeResizer';

	import { STREAM_URL, POST_URL } from 'lib/env';

	let clazz = '';

	export { clazz as class };

	let isAboveTheFold;

	export let blog = {
		name: 'momentum',
		slug: 'momentum',
		title: 'Build a better product in public and grow your audience',
		subtitle:
			'Momentum instructs you how to create and distribute your content. Add subscribers early and build based on real users feedback.',
		callToAction: 'Join Waitlist',
		bgColor: '#D98324'
	};

	export let posts = [];

	export let isEmbed = false;

	export let isNoBadge = false;

	export let maxHeight;

	let grid = {
		title: '',
		description: '',
		columns: '',

		items: [
			{
				title: '',
				description: '',
				icon: '',
				imageUrl: ''
			}
		]
	};

	export let noStickyHeader = false;

	let isMounted = false;

	onMount(() => {
		isMounted = true;
	});

	let email;
	let isSubmitted = false;

	let submitEmail = async () => {
		await post(`blogs/${blog.slug}/submissions`, { email });

		isSubmitted = true;

		if (blog.actionUrl) {
			setTimeout(() => {
				window.location.href = blog.actionUrl;
			}, 2000);
		}
	};

	let inputEl;

	const onButtonClick = () => {
		inputEl.focus();
	};

	let resize = () => {
		iframeResize({ log: true }, '#iframeResize');
	};

	if ($sveltePage.params.pageSlug) {
		window.document.body.style['background-color'] = blog.theme?.backgroundColor || 'white';
	} else {
		window.document.body.style['background-color'] = null;
	}

	let editEl;

	let focusEditEl = () => {
		setTimeout(() => {
			try {
				editEl.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
			} catch (err) {
				console.error(err);
			}
		}, 0);
	};
</script>

<div
	class="hidden sm:grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 sm:grid-cols-4 sm:grid-cols-5 sm:grid-cols-3 sm:w-[392px] sm:w-[500px] sm:columns-2 sm:columns-3 sm:columns-4 sm:min-h-screen"
/>

<!-- <div style="background: url('/dark_gradient.svg');"> -->

{#key blog?._id}
	<div>
		<div class="color-site sm:mt-32 mt-16" style={$styles.css}>
			{#if isMounted}
				<div class="sticky bg-site z-20 w-full {clazz}" in:fade={{ duration: 150 }}>
					<div class="_root bg-site">
						<div
							bind:this={$aboveTheFoldEl}
							class="_content pb-16 pt-8 sm:pt-32 flex items-center`
								: ''} "
							style={maxHeight ? `max-height: ${maxHeight}` : ''}
						>
							<div class="p-4 flex h-full w-full flex-col">
								<div
									class={blog.demoUrl
										? `w-full text-center ${
												blog.theme?.hero === 'vertical'
													? 'flex flex-col items-center mb-8'
													: 'sm:text-left'
										  } sm:max-w-[500px] items-center`
										: 'flex flex-col items-start w-full sm:w-auto'}
								>
									<h1
										class="_title {!blog.demoUrl || blog.theme?.hero === 'vertical'
											? 'sm:max-w-[750px]'
											: ''}"
										style={blog.title ? '' : 'opacity: 20%;'}
									>
										{#if blog.title}
											<div>{@html blog.title}</div>
										{:else}
											{'Type Title...'}
										{/if}
									</h1>

									{#if blog.subtitle}
										<h2
											class="_subtitle whitespace-pre-wrap  {!blog.demoUrl ||
											blog.theme?.hero === 'vertical'
												? 'max-w-[600px]'
												: ''}"
										>
											{@html blog.subtitle}
										</h2>
									{/if}

									<div
										class="_input_container {blog.isCollectEmails && !isSubmitted
											? '_border '
											: ''} flex items-center {blog.isCollectEmails
											? 'w-full ' +
											  (blog.callToAction.length < 20 ? 'sm:w-[392px]' : 'sm:w-[500px]')
											: ''}"
									>
										<form
											class="{blog.isCollectEmails ? `w-full flex flex-col` : 'sm:mx-0'} "
											style={!blog.isCollectEmails && !blog.demoUrl ? 'margin: 0 auto;' : ''}
											on:submit|preventDefault={submitEmail}
										>
											{#if !isSubmitted}
												{#if blog.isCollectEmails}
													<input
														class="_input _email-input w-full"
														placeholder="Your Email"
														type="email"
														required
														bind:this={inputEl}
														bind:value={email}
														disabled={isSubmitted}
														in:fade={{ duration: 150 }}
													/>
													<button
														type="submit"
														class="_input_button justify-center {blog.isCollectEmails
															? 'sm:absolute w-full sm:w-auto mt-4 sm:mt-0'
															: ''}">{blog.callToAction}</button
													>
												{:else}
													<a href={blog.actionUrl} target="_blank" class="button _input_button">
														{blog.callToAction}
													</a>
												{/if}
											{:else}
												<div>💥 Thank you!</div>

												{#if blog.actionUrl}
													<div class="mt-8 opacity-70">Redirecting...</div>
												{/if}
											{/if}
										</form>
									</div>
								</div>

								{#if blog.demoUrl}
									<div class="w-full sm:max-w-[600px] mt-16 sm:mt-0 sm:ml-8">
										<RenderUrl
											isLazy={false}
											class="w-full flex justify-end"
											url={blog.demoUrl}
											imgClass=""
										/>
									</div>
								{/if}
							</div>

							{#if isMounted && blog.testimonials?.length}
								<div
									class="p-4 sm:p-8 w-full flex flex-col sm:flex-row justify-center mt-16 sm:mt-32"
								>
									{#each blog.testimonials as testimonial, i}
										<div
											class="p-4 rounded-2xl w-full sm:max-w-[350px] mr-4 mb-4 sm:mb-0 bg-section"
											in:fly={{ x: -50, y: -50, duration: 150, delay: 150 * (i + 1) }}
										>
											<div class="flex flex-col sm:flex-row">
												{#if testimonial.avatarUrl}
													<div class="mr-4 mb-4 sm:mb-0">
														<img
															src={testimonial.avatarUrl}
															class="max-w-[50px] aspect-square rounded-full"
														/>
													</div>
												{/if}
												<div>
													<SvelteMarkdown class="test" source={testimonial.name} />
													<div class="mt-1 opacity-80">
														<SvelteMarkdown source={testimonial.comment} />
													</div>
												</div>
											</div>
										</div>
									{/each}
								</div>
							{/if}
						</div>

						<div
							class="grid {posts?.length > 1
								? 'sm:grid-cols-2'
								: 'max-w-[600px] mx-auto'} gap-8 grid-cols-1 mb-16 p-4"
						>
							{#each posts || [] as post}
								<PostShortPreview {post} />
							{/each}
						</div>

						{#if !isAboveTheFold}
							{#if blog.sections?.length}
								<div class={blog.streamSlug ? '' : ''}>
									{#each blog.sections as section, i}
										{#if $sectionToEdit && $sectionToEdit.id === section.id}
											<div bind:this={editEl}>
												<div class="p-2 bg-green-100 text-center">🚧🚧🚧🚧🚧</div>
												<div>
													<RenderSection bind:blog bind:section={$sectionToEdit} />
												</div>
												<div class="p-2 bg-green-100 text-center text-white">🚧🚧🚧🚧🚧</div>
											</div>
											{focusEditEl() || ''}
										{:else}
											<RenderSection
												bind:blog
												bind:section
												style={false && blog.theme?.isZebra && i % 2 === 0
													? blog.theme.theme === 'dark'
														? `background-color: ${lighten($styles.obj['background-color'], 0.01)};`
														: `background-color: ${darken($styles.obj['background-color'], 0.08)};`
													: ''}
											/>
										{/if}
									{/each}
								</div>
							{/if}
						{/if}
					</div>
				</div>
			{/if}

			{#if !isAboveTheFold}
				{#if blog.streamSlug && (!blog.sections || !blog.sections.find((s) => s.type === 'momentum_feed'))}
					<div>
						<div class="sticky z-20 py-4 sm:py-16 bg-site">
							<RenderSection
								class="p-0"
								section={{
									columns: 1,
									items: [
										{
											title: 'We Build In Public',
											description: 'Follow our journey in social network and blogs.'
										}
									]
								}}
							/>

							{#if blog.links}
								<div class="flex justify-center w-full my-4">
									{#if blog.links.twitter}
										<div class="w-[35px] h-[35px] mr-2">
											<a href={blog.links.twitter} class="scale-110" target="_blank">
												<TwitterIcon />
											</a>
										</div>
									{/if}
									{#if blog.links.linkedin}
										<div class="w-[35px] h-[35px] mr-2">
											<a href={blog.links.linkedin} target="_blank">
												<LinkedInIcon />
											</a>
										</div>
									{/if}
								</div>
							{/if}
						</div>

						{#key $feedLastUpdatedOn + blog.theme?.sectionTheme}
							<iframe
								id="iframeResize"
								loading="lazy"
								on:load={resize}
								class="w-full sticky z-20 pb-[200px] bg-site"
								src="{STREAM_URL}/{blog.streamSlug}/embed?theme={blog.theme?.sectionTheme ||
									'light'}&limit=15&isViewAll=true&bgColor={$styles[
									'section-background-color'
								].replace('#', '%23')}"
							/>
						{/key}
					</div>
				{/if}

				{#if posts?.length > 2}
					<EndSubmitForm bind:blog />
				{/if}

				{#if !isNoBadge && !blog.isNoBadge}
					<PostBadge />
				{/if}
			{/if}
		</div>
	</div>
{/key}

<style src="./app-site.css">
</style>
