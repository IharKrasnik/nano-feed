<script>
	import Emoji from 'lib/components/Emoji.svelte';
	let clazz;
	export { clazz as class };
	export let tabs = [];
	export let onTabSelected = (tab) => {};
	export let value = '';
	if (!value) {
		value = '';
	}

	let selectTab = (tab) => {
		let selectedTab = tabs.find((t) => t.isSelected);
		if (selectedTab) {
			selectedTab.isSelected = false;
		}

		tab.isSelected = true;
		value = tab.key;
		tabs = [...tabs];

		onTabSelected(tab);
	};

	if (!tabs.find((t) => t.isSelected)) {
		selectTab(tabs.find((t) => t.key === value) || tabs[0]);
	}
</script>

<div class=" flex gap-2 rounded {clazz} w-full justify-between">
	{#each tabs as tab}
		<div
			class="flex items-center justify-center cursor-pointer rounded text-sm  px-4 py-1 w-full text-center {tab.isSelected
				? 'border border-[#8b786d]'
				: '_border-section transition opacity-50 hover:opacity-100'} bg-white"
			on:click={() => {
				selectTab(tab);
			}}
		>
			{#if tab.icon}
				<div class="mr-2 flex items-center h-full">
					<Emoji width={15} emoji={tab.icon} />
				</div>
			{/if}

			{tab.name}

			<div class="text-xs opacity-70">
				{#if tab.description}
					{tab.description}
				{/if}
			</div>
		</div>
	{/each}
</div>
