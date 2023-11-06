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

	import { GOOGLE_LOGIN_URL, PAGE_URL, STREAM_URL } from 'lib/env';

	import { get, post, put } from 'lib/api';

	import loginWithGoogle from 'lib/helpers/loginWithGoogle';

	import EditSection from '$lib/components/edit/Section.svelte';
	import EditFAQ from '$lib/components/edit/FAQ.svelte';
	import EditPricing from '$lib/components/edit/Pricing.svelte';
	import EditTestimonials from '$lib/components/edit/Testimonials.svelte';
	import RenderSection from '$lib/components/render/Section.svelte';
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import Modal from 'lib/components/Modal.svelte';
	import BackArrowSvg from '$lib/icons/BackArrow.svelte';

	import Button from 'lib/components/Button.svelte';
	import Loader from 'lib/components/Loader.svelte';
	import FeatherIcon from '$lib/components/FeatherIcon.svelte';
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

	export let hero;
	let page = hero;

	$: page = hero;

	export let focuses;

	export let isCollapsed = true;
</script>

<div
	class="_section flex items-center justify-between cursor-pointer"
	on:click={() => (isCollapsed = !isCollapsed)}
>
	Header

	{#if isCollapsed}
		<div class="flex items-center">
			<FeatherIcon class="mr-2" size="15" name="eye" /> Expand
		</div>
	{:else}
		<div class="flex items-center">
			<FeatherIcon class="mr-2" size="15" name="eye-off" /> Hide
		</div>
	{/if}
</div>

{#if !isCollapsed && (page.title || page.parentPage)}
	<div class="_section">
		<div class="_title flex items-center justify-between">
			<div>Tagline</div>

			{#if page.theme}
				<div class="flex font-normal items-center">
					Is Huge <input bind:checked={page.theme.isHugeTitle} class="ml-2" type="checkbox" />
				</div>
			{/if}
		</div>

		<div
			class="w-full bg-[#f5f5f5] p-2 rounded-lg block"
			contenteditable
			use:contenteditable
			data-placeholder="Build a better product in public."
			bind:innerHTML={page.title}
			on:focus={() => (focuses.title = true)}
			on:blur={() => (focuses.title = false)}
		/>

		{#if focuses.title || (page.name && (!page.title || !page._id))}
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
	{#if page._id}
		<div class="_section">
			<div class="_title">Subtitle</div>

			<div
				class="min-h-[100px]"
				contenteditable="true"
				use:contenteditable
				bind:innerHTML={page.subtitle}
				on:focus={() => (focuses.subtitle = true)}
				on:blur={() => (focuses.subtitle = false)}
				data-placeholder="Momentum instructs you how to create and distribute your content. Add subscribers early and build based on real users feedback."
			/>

			<!-- <textarea
												bind:value={page.subtitle}
												on:focus={() => (focuses.subtitle = true)}
												on:blur={() => (focuses.subtitle = false)}
												rows="4"
												class="w-full"
												placeholder="Momentum instructs you how to create and distribute your content. Add subscribers early and build based on real users feedback."
											/> -->

			{#if focuses.subtitle || (page._id && page.title && !page.subtitle)}
				<div
					class="p-4 transition {page.subtitle
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
		</div>
	{/if}

	<div class="text-sm opacity-90 my-4">
		Use <b>bold</b> and <i>italic</i> text in Tagline and Subtitle to emphasize a word or two.
	</div>

	{#if page._id}
		<div class="_section">
			<div class="flex justify-between  mb-4">
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
					{#if page.demoUrl}
						<div>Vertical</div>
						<input class="ml-2" type="checkbox" bind:checked={page.theme.isHeroVertical} />
					{/if}
				</div>
			</div>

			<div class="flex items-center">
				<FileInput class="w-full" bind:url={page.demoUrl} theme="light" isCanSearch />
			</div>

			{#if !page.demoUrl && page.subtitle && page.title}
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
	{/if}

	{#if page._id}
		<div class="_section">
			<div class="_title flex justify-between w-full">
				Call To Action

				<div class="flex font-normal items-center">
					Collect Emails <input bind:checked={page.isCollectEmails} class="ml-2" type="checkbox" />
				</div>
			</div>

			<div class="font-normal text-sm opacity-70 mb-2">Button text</div>

			<input class="mb-4 w-full" bind:value={page.callToAction} placeholder="Join Waitlist" />

			<div class="flex items-center font-normal text-sm opacity-70 mb-2 w-full">
				<div class="shrink-0">Explain CTA:</div>

				<input
					class="ml-4 w-full"
					placeholder="No credit card required"
					bind:value={page.ctaExplainer}
				/>
			</div>

			<div class="font-normal text-sm opacity-70 mb-2">
				URL to open {page.isCollectEmails ? 'once email submitted (optional)' : 'on click'}
			</div>

			<input class="w-full mb-4" bind:value={page.actionUrl} placeholder="Action Url" />
		</div>
	{/if}

	{#if page._id}
		<div class="_section">
			<div class="_title flex justify-between w-full">
				Hero Settings

				<div class="flex font-normal items-center">
					Hide Hero <input bind:checked={page.isHeroHidden} class="ml-2" type="checkbox" />
				</div>
			</div>

			<div class="font-normal text-sm opacity-70 mb-2">Hero background image</div>

			<FileInput isCanSearch class="w-full" theme="light" bind:url={page.heroBgImage} />
		</div>
	{/if}
{/if}
