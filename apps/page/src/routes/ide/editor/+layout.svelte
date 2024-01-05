<script>
	import { page as sveltePage } from '$app/stores';
	import selectedTab from '$lib/stores/selectedTab';

	$selectedTab = 'editor';
</script>

<slot />
