<script>
	import _ from 'lodash';
	import moment from 'moment-timezone';
	import { browser } from '$app/environment';
	import { ConfettiExplosion } from 'svelte-confetti-explosion';
	import { onMount } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';
	import { slide, fly, scale, fade } from 'svelte/transition';
	import autofocus from 'lib/use/autofocus';
	import { goto } from '$app/navigation';
	import { page as sveltePage } from '$app/stores';
	import EditInteractiveOptions from '$lib/components/edit/InteractiveOptions.svelte';

	import { GOOGLE_LOGIN_URL, PAGE_URL, STREAM_URL } from 'lib/env';

	import { get, post, put } from 'lib/api';

	import loginWithGoogle from 'lib/helpers/loginWithGoogle';
	import striptags from 'striptags';

	import EditSection from '$lib/components/edit/Section.svelte';
	import EditFAQ from '$lib/components/edit/FAQ.svelte';
	import EditPricing from '$lib/components/edit/Pricing.svelte';
	import EditTestimonials from '$lib/components/edit/Testimonials.svelte';
	import SelectBackgroundImage from '$lib/components/SelectImageBackground.svelte';
	import Modal from 'lib/components/Modal.svelte';
	import BackArrowSvg from '$lib/icons/BackArrow.svelte';
	import DateTimeInput from 'lib/components/DateTimeInput.svelte';

	import Button from 'lib/components/Button.svelte';
	import Loader from 'lib/components/Loader.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import WaveSingleStat from 'lib/components/wave/SingleStat.svelte';
	import WaveDashboard from 'lib/components/wave/Dashboard.svelte';
	import FileInput from 'lib/components/FileInput.svelte';
	import MomentumHub from 'lib/components/MomentumHub.svelte';
	import SupportTwitter from 'lib/components/SupportTwitter.svelte';

	import SitePreview from 'lib-render/components/SitePreview.svelte';
	import SignupForm from '$lib/components/signup-form.svelte';

	import Settings from '$lib/components/Settings.svelte';

	import { showSuccessMessage, showErrorMessage } from 'lib/services/toast';

	import tooltip from 'lib/use/tooltip';
	import clickOutside from 'lib/use/clickOutside';
	import contenteditable from 'lib/use/contenteditable';

	import currentUser from 'lib/stores/currentUser';
	import allPages from 'lib-render/stores/allPages';
	import pageDraft from 'lib-render/stores/pageDraft';
	import sectionToEdit from 'lib-render/stores/sectionToEdit';
	import aboveTheFoldEl from 'lib-render/stores/aboveTheFoldEl';
	import ToggleGroup from '$lib/components/ToggleGroup.svelte';

	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';

	let clazz = '';
	export { clazz as class };
	export let isShowTips = true;

	export let page;
	export let hero;

	if (!hero.theme) {
		hero.theme = {};
	}

	hero.theme.titleSize = hero.theme.titleSize || (hero.theme.isHugeTitle ? 'huge' : 'normal');

	export let focuses = {};

	export let isCollapsedDefault =
		page.renderType === 'article'
			? false
			: !!(page.activeHero ? page.activeHero.title : page.title);
	let isCollapsed = isCollapsedDefault;
	console.log('isCollapsedDefault', isCollapsedDefault);
	let isSelectBackgroundModalShown = false;

	let isSettingsShown = false;

	let showSettings = () => {
		isSettingsShown = true;
	};

	let deleteHero = () => {
		if (confirm('This Hero section will be deleted')) {
			page.heros = page.heros.filter((h) => h.id !== hero.id);
			page.activeHero = page.heros[0];
		}
	};

	let bgPatterns = [
		{
			key: 'squares',
			label: 'Squares'
		},
		{
			key: 'dots',
			label: 'Dots'
		},
		{
			key: 'cross',
			label: 'Crosses'
		},
		{
			key: 'wavy',
			label: 'Wavy'
		},
		{
			key: 'stars',
			label: 'Stars 🔥'
		},
		{
			key: 'cursors',
			label: 'Cursors 🤩'
		},
		{
			key: 'canvas',
			label: 'JavaScript Canvas 🤓'
		},

		{
			key: null,
			label: 'None'
		}
	];

	let bgGradients = [
		{
			key: 'ship',
			label: 'Subtle'
		},
		{
			key: 'cobalt',
			label: 'From Up'
		},
		{
			key: 'ray',
			label: 'Light Ray'
		},
		{
			key: 'turborepo',
			label: 'Bright'
		},
		{
			key: 'radial',
			label: 'Radial'
		},
		{
			key: null,
			label: 'None'
		}
	];

	let isShowKeyFeatures = !!hero.keyFeaturesStr;
	let isFileSearching = false;

	page.publishedOn = page.publishedOn || page.lastPublishedOn;
</script>

{#if isSelectBackgroundModalShown}
	<Modal
		isShown={isSelectBackgroundModalShown}
		onClosed={() => {
			isSelectBackgroundModalShown = false;
		}}
	>
		<SelectBackgroundImage
			bind:imageUrl={hero.demoUrl}
			bind:imageBackgroundUrl={hero.demoBackgroundUrl}
			onSelected={() => {
				isSelectBackgroundModalShown = false;
			}}
		/>
	</Modal>
{/if}

<div class="relative">
	<div class="w-full flex items-center my-4 mt-8 py-4 ">
		<div class="text-lg font-bold mr-4 _editor-title">Hero Section</div>
		<div
			class="w-[37px] h-[37px] bg-[#fafafa] rounded-full flex items-center justify-center cursor-pointer opacity-80 hover:opacity-100"
			on:click={showSettings}
		>
			<FeatherIcon size="15" name="settings" color="#333" />
		</div>
	</div>

	{#if isSettingsShown}
		<div
			class="absolute top-0 mt-8 p-4 z-40 bg-white w-full border border-[#e0dede] rounded-xl shadow-lg shadow-black/30"
			in:fly={{ y: 50, duration: 150 }}
			use:clickOutside
			on:clickOutside={() => {
				if (!isFileSearching) {
					isSettingsShown = false;
				}
			}}
		>
			<div class="w-full">
				<div class="">
					<div class="_title flex justify-between w-full pb-4 text-lg">
						Hero Settings

						<!-- <div class="flex font-normal items-center">
								Hide Hero <input bind:checked={hero.isHidden} class="ml-2" type="checkbox" />
							</div> -->
					</div>

					<!-- <a
							href="https://www.producthunt.com/posts/momentum-page?utm_source=badge-top-post-topic-badge&utm_medium=badge&utm_souce=badge-momentum&#0045;page"
							target="_blank"
							><img
								src="https://api.producthunt.com/widgets/embed-image/v1/top-post-topic-badge.svg?post_id=392337&theme=light&period=monthly&topic_id=164"
								alt="Momentum&#0032;Page - Launch&#0032;your&#0032;website&#0032;in&#0032;seconds&#0044;&#0032;get&#0032;users&#0032;in&#0032;minutes | Product Hunt"
								style="width: 250px; height: 54px;"
								width="250"
								height="54"
							/></a
						> -->

					<div class="_section">
						<div class="font-semibold mb-2">Background</div>

						{#if !hero.bgImageUrl}
							<div class="mt-4 text-sm font-semibold mb-2">Background color</div>

							<div class="mb-4">
								<input bind:checked={hero.theme.isOppositeColors} class="mr-2" type="checkbox" />

								Use opposite colors
							</div>

							<div class="flex items-center">
								{#if hero.theme.isOverrideColors}
									<input
										type="color"
										id="head"
										name="head"
										class="mr-4"
										bind:value={hero.theme.backgroundColor}
									/>
								{:else}{/if}
								<div>
									<input
										bind:checked={hero.theme.isOverrideColors}
										class="mr-2"
										type="checkbox"
										on:change={() => {
											if (!hero.theme.backgroundColor) {
												hero.theme.backgroundColor = page.theme.backgroundColor;
											}
										}}
									/>

									Use different background color
								</div>
							</div>
						{/if}

						{#if !hero.theme.isOverrideColors}
							<div class="mt-4 text-sm font-semibold mb-2">Hero background image or video</div>

							<FileInput
								bind:isSearching={isFileSearching}
								isCanSearch
								class="w-full"
								theme="light"
								bind:url={hero.bgImageUrl}
							/>

							{#if hero.bgImageUrl}
								<ToggleGroup
									class="my-2"
									tabs={[
										{ key: '', name: 'cover' },
										{ key: 'contain', name: 'contain' },
										{ key: 'none', name: 'none' }
									]}
									bind:value={hero.theme.bgImageObjectFit}
								/>

								<div class="flex text-sm mt-4 font-normal items-center">
									<input
										bind:checked={hero.theme.isNotBgImageDimmed}
										class="mr-2"
										type="checkbox"
									/>

									Do not dim background image
								</div>
							{/if}
						{/if}
					</div>

					{#if hero.theme}
						<div class="flex shrink-0 font-normal items-center mb-4">
							<input bind:checked={hero.theme.isFullScreen} class="mr-2" type="checkbox" /> Full Screen
						</div>

						<div class="_section">
							<div class="font-semibold mb-2">Text & Layout</div>
							<div class="flex flex-wrap gap-4 mt-4">
								{#if hero.demoUrl}
									<div class="flex shrink-0 font-normal items-center">
										<input bind:checked={hero.theme.isVertical} class="mr-2" type="checkbox" /> Is Vertical
									</div>
								{/if}

								<div class="flex gap-4 items-center">
									{#each [{ value: 'normal' }, { value: 'huge' }, { value: 'giant' }] as titleSize}
										<div class="flex items-center">
											<input
												bind:group={hero.theme.titleSize}
												class="mr-2"
												type="radio"
												value={titleSize.value}
											/>
											{_.capitalize(titleSize.value)}
										</div>
									{/each}
								</div>

								<div class="flex shrink-0 font-normal items-center">
									<input bind:checked={hero.theme.isLeft} class="mr-2" type="checkbox" /> Is Left Aligned
								</div>
							</div>

							<div class="mt-4">
								<div class="flex shrink-0 font-normal items-center">
									<input bind:checked={hero.theme.isAnimatedTitle} class="mr-2" type="checkbox" /> Animate
									Highlights
								</div>
								{#if hero.theme.isAnimatedTitle}
									<div class="text-sm opacity-80">
										Make some text <b>bold</b> to animate it. Separate words with comma to animate
										multiple words like this: <b>one, two, three</b>
									</div>
								{/if}
							</div>
						</div>
					{/if}

					<div class="mt-4 mb-2">
						<div class="_section">
							<div class="font-semibold">Background patterns</div>
							<div class="text-sm mb-4 opacity-80">Nice subtle backgrounds to catch attention</div>

							{#each bgPatterns as bgPattern}
								<button
									class="_secondary _small mr-2 mb-2"
									on:click={() => (hero.theme.bgPattern = bgPattern.key)}
									>{bgPattern.key === hero.theme.bgPattern ? '✅' : ''} {bgPattern.label}</button
								>
							{/each}

							{#if hero.theme.bgPattern === 'canvas'}
								<div class="mb-2">Your JavaScript Code</div>

								<textarea
									placeholder="let canvas = window.backgroundCanvas;"
									bind:value={hero.theme.canvasAnimationCode}
									class="w-full"
									lines="6"
								/>

								<div>Access canvas via <b>window.backgroundCanvas</b></div>

								<div class="text-sm opacity-70">
									<b>Hint</b>: copy open animations from CodePen, like
									<a target="_blank" href="https://codepen.io/towc/pen/OgWeXw">this</a>
									and <a target="_blank" href="https://codepen.io/devamar/pen/ExYWPWB">this</a>
								</div>
							{/if}
						</div>
						<div class="_section">
							<div class="font-semibold">Background gradients</div>
							<div class="text-sm mb-4 opacity-80">
								Nice gradients to add extra dimensions and shadow
							</div>

							{#each bgGradients as bgGradient}
								<button
									class="_secondary _small mr-2 mb-2"
									on:click={() => {
										if (!bgGradient.key) {
											hero.theme.bgGradient = null;
										} else {
											hero.theme.bgGradient = { type: bgGradient.key };
										}
									}}
									>{(!bgGradient.key && !hero.theme.bgGradient?.type) ||
									bgGradient.key === hero.theme.bgGradient?.type
										? '✅'
										: ''}
									{bgGradient.label}</button
								>
							{/each}
						</div>
					</div>

					<div class="_section">
						<div class="font-semibold">Embed Component (HTML)</div>
						<div class="text-sm  mb-2">The Custom component to show above the title</div>

						<textarea
							class="w-full"
							placeholder="<div>Hello World</div>"
							bind:value={hero.embedAboveHtml}
						/>
					</div>

					<!-- <hr class="my-8 opacity-80" /> -->

					<!-- <div class="mt-8 flex justify-end">
							<button class="_secondary _small" on:click={deleteHero}>🗑 Delete Hero</button>
						</div> -->
				</div>
			</div>
		</div>
	{/if}
</div>

{#if isCollapsed}
	<div
		class="{isCollapsed
			? '_section '
			: 'py-4'} flex items-center justify-between cursor-pointer {clazz}"
		on:click={() => {
			page.activeHero = hero;

			isCollapsed = !isCollapsed;
			$aboveTheFoldEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}}
	>
		<div class="overflow-x-hidden">
			{#if isCollapsed}
				{#if hero.title || hero.subtitle || hero.callToActionText}
					<div class="text font-bold">
						{@html striptags(hero.title || '')}
					</div>
					{#if hero.subtitle}
						<div class="mt-1 truncate">
							{@html striptags(hero.subtitle || '')}
						</div>
					{/if}

					{#if hero.callToActionText}
						<div class="mt-2 opacity-80">
							{hero.callToActionText}
						</div>
					{/if}
				{:else}
					<div class="opacity-80">empty</div>
				{/if}
			{/if}
		</div>
	</div>
{/if}

{#if !isCollapsed && hero}
	<div class="_section p-4 relative mt-4" in:fade={{ duration: 100 }}>
		<div class="flex w-full items-center justify-between mb-4 ">
			<div class="flex items-center ">
				<div class="font-bold mr-4">Hero Section</div>
			</div>

			<div
				class="flex items-center opacity-50 hover:opacity-100 cursor-pointer"
				on:click={() => (isCollapsed = true)}
			>
				<FeatherIcon class="mr-2" size="15" name="eye-off" /> Collapse Hero
			</div>
		</div>

		<div class="_section">
			<div class="_title flex items-center justify-between">
				{#if page.renderType === 'article'}
					<div>Article Title</div>
				{:else}
					<div>Tagline</div>
				{/if}
			</div>

			<div
				class="w-full bg-[#f5f5f5] p-2 rounded-lg block"
				contenteditable
				use:contenteditable
				data-placeholder="Build a better product in public."
				bind:innerHTML={hero.title}
				on:focus={() => (focuses.title = true)}
				on:blur={() => (focuses.title = false)}
			/>

			{#if isShowTips && (focuses.title || !hero.title || !hero._id)}
				<div
					class="p-4 bg-green-600 mt-4 rounded-xl text-white font-bold"
					in:fly={{ y: 50, duration: 150 }}
				>
					Start with a bold tagline

					<div class="font-normal mt-2">
						Make a big promise to your customer. Start with a verb. Spark curiosity and hook their
						attention.
					</div>
				</div>
			{/if}
		</div>
		<div class="_section">
			{#if page.renderType === 'article'}
				<div class="_title">Short description</div>
			{:else}
				<div class="_title">Subtitle</div>
			{/if}
			<div
				class="min-h-[100px]"
				contenteditable="true"
				use:contenteditable
				bind:innerHTML={hero.subtitle}
				on:focus={() => (focuses.subtitle = true)}
				on:blur={() => (focuses.subtitle = false)}
				data-placeholder="Momentum instructs you how to create and distribute your content. Add subscribers early and build based on real users feedback."
			/>

			{#if isShowTips && (focuses.subtitle || (hero._id && hero.title && !hero.subtitle))}
				<div
					class="p-4 transition {hero.subtitle
						? 'bg-green-600'
						: 'bg-orange-400'} mt-4 rounded-xl text-white font-bold"
					in:fly={{ y: 50, duration: 150 }}
				>
					Explain your value propositon

					<div class="font-normal mt-2">
						What change do you bring to the customer's life? Get specific. Avoid self-explaining.
						Talk to them.
					</div>
				</div>
			{/if}
			{#if page.renderType === 'article'}{:else}
				<div class="text-sm opacity-90 my-4">
					Use <b>bold</b> and <i>italic</i> text in Tagline and Subtitle to emphasize a word or two.
				</div>
			{/if}
		</div>

		{#if page.renderType !== 'article'}
			<div class="_section">
				<div class="flex items-center justify-between">
					<div class="font-bold text-sm">Key Features</div>

					{#if !hero.keyFeaturesStr && !isShowKeyFeatures}
						<div
							class="cursor-pointer"
							on:click={() => {
								isShowKeyFeatures = true;
							}}
						>
							Add
						</div>
					{/if}
				</div>
				{#if isShowKeyFeatures}
					<div class="mt-4">
						<textarea class="w-full" bind:value={hero.keyFeaturesStr} />
						<div class="text-sm opacity-70">Separate features with a new line</div>
					</div>
				{/if}
			</div>
		{/if}

		<div class="_section">
			<div class="flex justify-between  mb-2">
				<div class="_title">
					{#if page.renderType === 'article'}
						Key image
						<div class="font-normal text-sm opacity-70">
							The main article image
							<br />
						</div>
					{:else}
						{page.renderType === 'service' ? 'Service Demo' : 'Product Demo'}
						<div class="font-normal text-sm opacity-70">
							Screenshot, live GIF or a <a
								href="//loom.com"
								class="underline"
								target="_blank"
								use:tooltip
								title="We recommend using Loom or YouTube">video demo</a
							> <br />
						</div>
					{/if}
				</div>

				<div class="_title flex items-center">
					{#if hero.demoUrl}
						<div>Vertical</div>
						<input class="ml-2" type="checkbox" bind:checked={hero.theme.isVertical} />
					{/if}
				</div>
			</div>

			<div class="flex items-center">
				<FileInput class="w-full" bind:url={hero.demoUrl} theme="light" isCanSearch />
			</div>

			{#if hero.demoUrl && hero.theme?.isVertical}
				<div class="flex items-center mt-2 justify-between">
					<div class="text-xs flex gap-2 items-center">
						<div
							class="cursor-pointer"
							on:click={() => {
								hero.imgMaxWidth = 0;
							}}
							class:font-bold={!hero.imgMaxWidth}
						>
							Stretch
						</div>

						<div
							class="cursor-pointer"
							on:click={() => {
								if (page.renderType === 'article') {
									hero.imgMaxWidth = 768;
								} else {
									hero.imgMaxWidth = 600;
								}
							}}
							class:font-bold={hero.imgMaxWidth === 600 || hero.imgMaxWidth === 768}
						>
							Medium
						</div>
					</div>
					<div
						class="ml-4"
						on:click={() => {
							isSelectBackgroundModalShown = true;
						}}
					>
						<div class="flex items-center justify-center border rounded text-xs">
							{#if hero.demoBackgroundUrl}
								<img class="w-[25px] h-[25px]" src={hero.demoBackgroundUrl} />
							{:else}
								<div class="px-2 cursor-pointer">no background</div>
							{/if}
						</div>
					</div>
				</div>
			{/if}

			{#if isShowTips && !hero.demoUrl && hero.subtitle && hero.title}
				<div
					class="p-4 bg-orange-400 mt-4 rounded-xl text-white font-bold"
					in:fly={{ y: 50, duration: 150 }}
				>
					Add your product demo

					<div class="font-normal mt-2">
						A picture is worth a thousand words. But video works even better. Show how the future
						product will look like or translate emotion through GIF.
					</div>
				</div>
			{/if}
		</div>

		{#if hero}
			<div class="_section">
				<div class="_title flex justify-between w-full">Call To Action</div>

				<EditInteractiveOptions
					class="mt-4"
					bind:section={hero}
					bind:sectionItem={hero}
					isWithButton={false}
				/>

				{#if hero.interactiveRenderType === 'form'}
					<div class="mt-4">
						<EditSection bind:section={hero.formSection} isInnerSection />
					</div>
				{/if}
			</div>

			{#if page.renderType !== 'article'}
				<div class="_section">
					<div class="_title flex justify-between w-full">Social Proof</div>

					{#if hero.socialProof}
						<div class="text-sm mb-2">Title</div>
						<input
							class="mb-4 w-full"
							bind:value={hero.socialProof.title}
							placeholder="Join 100+ creators"
						/>

						<div class="text-sm mb-2">Avatars (or logos)</div>
						{#each hero.socialProof?.logos || [] as logo}
							<div class="flex gap-4 justify-between text-sm mb-2">
								<FileInput class="w-full" theme="light" bind:url={logo.url} />

								<button
									on:click={() => {
										hero.socialProof.logos = hero.socialProof.logos.filter(
											(l) => l.url !== logo.url
										);
									}}>🗑</button
								>
							</div>
						{/each}
					{/if}
					<div class="mt-4 w-full">
						<button
							class="_secondary _small w-full text-center"
							on:click={() => {
								let defaultLogos = [
									{
										url: 'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1701537402054-image.png'
									},
									{
										url: 'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1701537317691-image.png'
									},
									{
										url: 'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1701537348214-image.png'
									},
									{
										url: 'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1701537378909-image.png'
									}
								];

								hero.socialProof = hero.socialProof || {
									title: 'Join 100+ creators',
									logos: defaultLogos
								};

								hero.socialProof.logos.push(_.sample(defaultLogos));
							}}>😎 Add Avatar</button
						>
					</div>
				</div>
			{/if}
		{/if}

		{#if page.renderType === 'article'}
			<div class="_section mb-4">
				<div class="text-sm font-bold mb-2">Published Date</div>

				<DateTimeInput class="w-full" bind:date={page.publishedOn} />
			</div>
		{/if}
	</div>
{/if}
