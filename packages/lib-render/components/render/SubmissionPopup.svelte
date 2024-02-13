<script>
	import currentUser from 'lib/stores/currentUser';
	import servicePages, { refresh as refreshServicePages } from 'lib-render/stores/servicePages';
	import Popup from 'lib-render/components/Popup.svelte';
	import Loader from 'lib/components/Loader.svelte';
	import ServiceRequest from 'lib-render/components/ServiceRequest.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';

	export let page;
	export let submission;

	let parentPage = page.parentPage || page;

	let getDefaultSubmission = () => {
		return {
			title: '',
			description: '',
			page: null
		};
	};

	if (!submission) {
		submission = getDefaultSubmission();
	}

	if (!$servicePages) {
		refreshServicePages(
			$currentUser
				? { parentPageId: '654e6776c712c70014d65d77' }
				: { parentPageId: (page.parentPage || page)._id }
		);
	}

	export let onClosed = () => {};

	let isShown = true;
</script>

<Popup {isShown} position="right" isClickOutsideClose={false} bind:page {onClosed}>
	{#if submission && $servicePages}
		<div class="p-4 mb-[300px]">
			<div
				class="flex justify-between sm:px-8 pt-8 pb-4 opacity-50 transition hover:opacity-100 cursor-pointer"
			>
				<div
					on:click={() => {
						if (submission?.page) {
							submission = {};
						} else {
							isShown = false;
							onClosed();
						}
					}}
				>
					{#if submission.page}
						<FeatherIcon name="chevron-left" theme={parentPage.theme?.theme} />
					{:else}
						<FeatherIcon name="x" theme={parentPage.theme?.theme} />
					{/if}
				</div>
			</div>

			{#key submission._id}
				<ServiceRequest bind:page bind:submission />
			{/key}
		</div>
	{:else}
		<div class="w-full h-full flex items-center justify-center">
			<Loader theme={(page.parentPage || page).theme?.theme} />
		</div>
	{/if}
</Popup>
