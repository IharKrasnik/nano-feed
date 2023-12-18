<script>
	import _ from 'lodash';
	import moment from 'moment-timezone';
	import { slide, fly, scale, fade } from 'svelte/transition';
	import { get, post, put } from 'lib/api';

	import Loader from 'lib/components/Loader.svelte';
	import WaveDashboard from 'lib/components/wave/Dashboard.svelte';
	import CustomerAnalytics from 'lib-render/components/render//CustomerAnalytics.svelte';
	import currentUser from 'lib/stores/currentUser';
	import getPageCssStyles from 'lib-render/services/getPageCssStyles';

	export let page;
	export let customer;

	let cssVarStyles;
	let styles;

	$: if (page) {
		let res = getPageCssStyles(page);
		cssVarStyles = res.cssVarStyles;
		styles = res.styles;
	}
</script>

<div class="px-8 py-16 bg-background overflow-y-auto" style={cssVarStyles}>
	{#if customer}
		{#key customer._id}
			<CustomerAnalytics bind:page bind:customer />
		{/key}
	{:else}
		<div class="" in:fly={{ y: 50, duration: 150 }} style="height: calc(100vh - 60px);">
			<div class="mt-8 w-full">
				<WaveDashboard project={{ page: page.parentPage || page }} isShowSignups />
			</div>
		</div>
	{/if}
</div>
