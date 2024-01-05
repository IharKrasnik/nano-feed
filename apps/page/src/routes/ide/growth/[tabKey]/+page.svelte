<script>
	import { page as sveltePage } from '$app/stores';
	import selectedGrowthTab from '$lib/stores/selectedGrowthTab';

	$selectedGrowthTab = $sveltePage.params.tabKey;
</script>
