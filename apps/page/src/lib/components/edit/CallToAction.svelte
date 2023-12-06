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
	import SelectBackgroundImage from '$lib/components/SelectImageBackground.svelte';
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

	export let focuses;

	export let isCollapsedDefault = true;
	let isCollapsed = isCollapsedDefault;

	let isSettingsShown = false;

	let showSettings = () => {
		isSettingsShown = true;
	};

	if (!page.ctaFooter) {
		page.ctaFooter = {};
	}
</script>

{#if isCollapsed}
	<div
		class="{isCollapsed
			? '_section '
			: 'py-4'} flex items-center justify-between cursor-pointer {clazz}"
		on:click={() => {
			isCollapsed = !isCollapsed;
		}}
	>
		<div class="overflow-x-hidden font-bold">
			{@html striptags(page.ctaFooter?.title || page.title)}
		</div>
	</div>
{/if}

{#if !isCollapsed}
	<div class="_section p-4 relative mt-4" in:fade={{ duration: 100 }}>
		<div class="flex w-full items-center justify-between mb-4 ">
			<div class="flex items-center ">
				<div class="font-bold mr-4">Call-to-action section</div>
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
				<FeatherIcon class="mr-2" size="15" name="eye-off" /> Collapse CTA
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
							Settings

							<div class="flex font-normal items-center">
								Hide Section <input
									bind:checked={page.ctaFooter.isHidden}
									class="ml-2"
									type="checkbox"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/if}

		<div class="_section">
			<div class="_title flex items-center justify-between">
				<div>Title</div>
			</div>

			<div
				class="w-full bg-[#f5f5f5] p-2 rounded-lg block"
				contenteditable
				use:contenteditable
				data-placeholder="Default (page title)"
				bind:innerHTML={page.ctaFooter.title}
			/>
		</div>
		<div class="_section">
			<div class="_title">Subtitle</div>

			<div
				class="min-h-[100px]"
				contenteditable="true"
				use:contenteditable
				bind:innerHTML={page.ctaFooter.subtitle}
				data-placeholder="Guide them to action"
			/>
		</div>
	</div>
{/if}
