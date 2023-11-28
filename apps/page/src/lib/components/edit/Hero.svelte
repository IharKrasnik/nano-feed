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
	import RenderSection from '$lib/components/render/Section.svelte';
	import Modal from 'lib/components/Modal.svelte';
	import BackArrowSvg from '$lib/icons/BackArrow.svelte';

	import Button from 'lib/components/Button.svelte';
	import Loader from 'lib/components/Loader.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import WaveSingleStat from 'lib/components/wave/SingleStat.svelte';
	import WaveDashboard from 'lib/components/wave/Dashboard.svelte';
	import FileInput from 'lib/components/FileInput.svelte';
	import MomentumHub from 'lib/components/MomentumHub.svelte';
	import SupportTwitter from 'lib/components/SupportTwitter.svelte';

	import SitePreview from '$lib/components/site-preview.svelte';
	import SignupForm from '$lib/components/signup-form.svelte';

	import Settings from '$lib/components/Settings.svelte';

	import { showSuccessMessage, showErrorMessage } from 'lib/services/toast';

	import tooltip from 'lib/use/tooltip';
	import clickOutside from 'lib/use/clickOutside';
	import contenteditable from 'lib/use/contenteditable';

	import currentUser from 'lib/stores/currentUser';
	import allPages from '$lib/stores/allPages';
	import pageDraft from '$lib/stores/pageDraft';
	import sectionToEdit from '$lib/stores/sectionToEdit';
	import aboveTheFoldEl from '$lib/stores/aboveTheFoldEl';

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

	export let focuses;

	export let isCollapsedDefault = true;
	let isCollapsed = isCollapsedDefault;

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
			key: null,
			label: 'None'
		}
	];
</script>

{#if isCollapsed}
	<div
		class="{isCollapsed
			? '_section '
			: 'py-4'} flex items-center justify-between cursor-pointer {clazz}"
		on:click={() => {
			page.activeHero = hero;

			isCollapsed = !isCollapsed;
		}}
	>
		<div class="overflow-x-hidden">
			{#if isCollapsed}
				<div class="text font-bold">
					{@html striptags(hero.title || '')}
				</div>
				{#if hero.subtitle}
					<div class="mt-1 truncate">
						{@html striptags(hero.subtitle || '')}
					</div>
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
				<div
					class="w-[37px] h-[37px] bg-[#fafafa] rounded-xl flex items-center justify-center cursor-pointer"
					on:click={showSettings}
				>
					⚙️
				</div>
			</div>

			<div
				class="flex items-center opacity-50 hover:opacity-100 cursor-pointer"
				on:click={() => (isCollapsed = true)}
			>
				<FeatherIcon class="mr-2" size="15" name="eye-off" /> Collapse Hero
			</div>
		</div>

		{#if isSettingsShown}
			<div
				class="absolute top-0 mt-8 p-4 z-40 bg-white w-full border border-[#e0dede] rounded-xl"
				in:fly={{ y: 50, duration: 150 }}
				use:clickOutside
				on:clickOutside={() => {
					isSettingsShown = false;
				}}
			>
				<div class="w-full">
					<div class="">
						<div class="_title flex justify-between w-full">
							Hero Settings

							<!-- <div class="flex font-normal items-center">
								Hide Hero <input bind:checked={hero.isHidden} class="ml-2" type="checkbox" />
							</div> -->
						</div>

						<div class="font-normal text-sm opacity-70 mb-2">Hero background image or video</div>

						<FileInput isCanSearch class="w-full" theme="light" bind:url={hero.bgImageUrl} />

						{#if hero.bgImageUrl}
							<div class="flex text-sm mt-2 font-normal items-center">
								<input bind:checked={hero.theme.isNotBgImageDimmed} class="mr-2" type="checkbox" />

								Do not dim background image
							</div>
						{/if}

						{#if hero.theme}
							<div class="flex gap-4 mt-4">
								{#if hero.demoUrl}
									<div class="flex font-normal items-center">
										<input bind:checked={hero.theme.isVertical} class="mr-2" type="checkbox" /> Is Vertocal
									</div>
								{/if}
								<div class="flex font-normal items-center">
									<input bind:checked={hero.theme.isHugeTitle} class="mr-2" type="checkbox" /> Is Huge
								</div>
								<div class="flex font-normal items-center">
									<input bind:checked={hero.theme.isLeft} class="mr-2" type="checkbox" /> Is Left Aligned
								</div>
							</div>
						{/if}

						<div class="mt-4 mb-2">
							<div class="_section">
								<div class="font-semibold">Background patterns</div>
								<div class="text-sm mb-4 opacity-80">
									Nice subtle backgrounds to catch attention
								</div>
								{#each bgPatterns as bgPattern}
									<button
										class="_secondary _small mr-2 mb-2"
										on:click={() => (hero.theme.bgPattern = bgPattern.key)}
										>{bgPattern.key === hero.theme.bgPattern ? '✅' : ''} {bgPattern.label}</button
									>
								{/each}
							</div>
							<div class="_section">
								<div class="font-semibold">Background gradients</div>
								<div class="text-sm mb-4 opacity-80">
									Nice gradients to add extra dimensions and shadow
								</div>

								{#each bgGradients as bgGradient}
									<button
										class="_secondary _small mr-2"
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

						<hr class="my-8 opacity-80" />

						<div class="mt-8">
							<button class="_secondary _small" on:click={deleteHero}>🗑 Delete Hero</button>
						</div>
					</div>
				</div>
			</div>
		{/if}

		<div class="_section">
			<div class="_title flex items-center justify-between">
				<div>Tagline</div>
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
			<div class="_title">Subtitle</div>

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
			<div class="text-sm opacity-90 my-4">
				Use <b>bold</b> and <i>italic</i> text in Tagline and Subtitle to emphasize a word or two.
			</div>
		</div>

		<div class="_section">
			<div class="flex justify-between  mb-2">
				<div class="_title">
					Product Demo

					<div class="font-normal text-sm opacity-70">
						Screenshot, live GIF or a <a
							href="//loom.com"
							class="underline"
							target="_blank"
							use:tooltip
							title="We recommend using Loom or YouTube">video demo</a
						> <br />
					</div>
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

			{#if hero.demoUrl}
				<div class="text-xs mt-2 flex gap-2 items-center">
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

				<EditInteractiveOptions bind:section={hero} bind:sectionItem={hero} isWithButton={false} />
			</div>
		{/if}
	</div>
{/if}
