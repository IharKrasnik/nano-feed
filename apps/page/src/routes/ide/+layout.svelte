<script>
	import selectedTab from '$lib/stores/selectedTab';
	import selectedEditorTab from '$lib/stores/selectedEditorTab';
	import selectedGrowthTab from '$lib/stores/selectedGrowthTab';

	import { goto } from '$app/navigation';

	let refreshUrl = () => {
		if ($selectedTab) {
			goto(
				`/ide/${$selectedTab}${
					$selectedTab === 'editor' && $selectedEditorTab ? `/${$selectedEditorTab}` : ''
				}${$selectedTab === 'growth' && $selectedEditorTab ? `/${$selectedGrowthTab}` : ''}`
			);
		}
	};

	// selectedTab.subscribe(refreshUrl);
	// selectedEditorTab.subscribe(refreshUrl);
	// selectedGrowthTab.subscribe(refreshUrl);
</script>

<slot />
