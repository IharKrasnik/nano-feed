<script>
	import { get, post } from 'lib/api';
	import Button from 'lib/components/Button.svelte';
	import EditDomains from '$lib/components/settings/Domains.svelte';
	import EditOpenGraph from '$lib/components/settings/OpenGraph.svelte';

	export let page;
</script>

<div>
	<h2 class="text-2xl font-bold mb-4">Settings</h2>

	<EditOpenGraph bind:page />
	<hr class="my-8 border-[#8B786D] opacity-30" />
	<EditDomains bind:page />
</div>
