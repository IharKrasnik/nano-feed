<script>
	import { get, post } from 'lib/api';
	import currentUser from 'lib/stores/currentUser';
	import Button from 'lib/components/Button.svelte';
	import EditDomains from '$lib/components/settings/Domains.svelte';
	import EditOpenGraph from '$lib/components/settings/OpenGraph.svelte';
	import EditCustomCode from '$lib/components/settings/CustomCode.svelte';

	export let page;

	let subscribe = async () => {
		let { url } = await get('stripe/subscribe');
		window.location.href = url;
	};
</script>

<div>
	<h2 class="text-2xl font-bold mb-4">Settings</h2>

	<!-- <div class="font-bold text-lg">Your Plan</div>

	<div class="my-4 mb-8">
		{#if $currentUser?.stripe?.subsription}
			<div>To The Moon</div>
		{:else}
			<div>Build In Public</div>
			<Button class="_primary mt-4" onClick={subscribe}>Upgrade</Button>
		{/if}
	</div> -->

	<EditOpenGraph bind:page />
	<hr class="my-8 border-[#8B786D] opacity-30" />
	<EditDomains bind:page />

	<!-- 	
	<hr class="my-8 border-[#8B786D] opacity-30" />

	<EditCustomCode bind:page /> -->
</div>
