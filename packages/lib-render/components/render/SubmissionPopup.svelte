<script>
	import currentUser from 'lib/stores/currentUser';
	import servicePages, { refresh as refreshServicePages } from 'lib-render/stores/servicePages';
	import Popup from 'lib-render/components/Popup.svelte';
	import Loader from 'lib/components/Loader.svelte';
	import ServiceRequest from 'lib-render/components/ServiceRequest.svelte';

	export let page;
	export let submission;

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
</script>

<Popup isShown position="right" isClickOutsideClose={false} bind:page {onClosed}>
	{#if submission && $servicePages}
		<div class="p-4 mb-[300px]">
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
