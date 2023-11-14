<script>
	import { get, post, put, del } from 'lib/api';
	import { countryCodeEmoji } from 'country-code-emoji';

	export let page;

	let customers = [];

	let loadCustomers = async () => {
		let customerResult = await get(`customers`, { pageId: page._id });
		customers = customerResult.results;
	};

	loadCustomers();
</script>

{#each customers as customer}
	<div class="_section">
		{countryCodeEmoji(customer?.visitor?.geoData?.country)}
		{customer.email}
	</div>
{/each}
