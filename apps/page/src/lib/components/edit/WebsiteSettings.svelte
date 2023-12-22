<script>
	import Emoji from 'lib/components/Emoji.svelte';
	export let page;
	import subPages from 'lib/stores/subPages';

	import selectedSettingsPage from '$lib/stores/selectedSettingsPage';
	import selectedSettingsTab from '$lib/stores/selectedSettingsTab';

	let parentPage = page.parentPage || page;
</script>

<div class="text-lg font-bold mb-4">Settings</div>

<div
	class="_section cursor-pointer"
	class:_selected={!$selectedSettingsPage?._id && $selectedSettingsTab === 'settings'}
	on:click={() => {
		$selectedSettingsTab = 'settings';

		$selectedSettingsPage = null;
	}}
>
	<div class="flex items-start">
		<div class="mr-2  pr-2">
			<Emoji width={30} height={30} emoji={parentPage.emoji} />
		</div>
		<div>
			<div class="font-bold">
				{parentPage.name}
			</div>
			<div class="opacity-80 mt-1">Website settings: Domains, Badge, Analytics</div>
		</div>
	</div>
</div>

<div
	class="_section cursor-pointer flex items-start"
	class:_selected={$selectedSettingsTab === 'header-footer'}
	on:click={() => {
		$selectedSettingsTab = 'header-footer';
	}}
>
	<div class="mr-2 pr-2">
		<Emoji width={30} height={30} emoji={'🔗'} />
	</div>

	<div class="">
		<div class="font-bold">Header and Footer</div>
		<div class="opacity-80 mt-1">Links to display on every page</div>
	</div>
</div>

<hr class="my-8" />

<div class="text-lg font-bold mb-4">Subscription</div>
<div
	class="_section cursor-pointer flex items-start"
	class:_selected={$selectedSettingsTab === 'plans'}
	on:click={() => {
		$selectedSettingsTab = 'plans';
	}}
>
	<div class="mr-2 pr-2">
		<Emoji width={30} height={30} emoji={'💳'} />
	</div>

	<div class="">
		<div class="font-bold">Plans & Billing</div>
		<div class="opacity-80 mt-1">Upgrade and manage your Momentum plan</div>
	</div>
</div>

<hr class="my-8" />

<div class="flex mb-2 items-center">
	<div class="text-lg font-bold">Pages</div>
	<div class="ml-4 px-3 rounded-full border ring-1 ring-black text-sm">
		{$subPages.length}
	</div>
</div>
<div class="opacity-80 mt-2">OpenGraph, custom code</div>
{#each [parentPage, ...$subPages] as subPage}
	<div
		class="_section cursor-pointer mt-4"
		class:_selected={$selectedSettingsPage?._id === subPage._id &&
			$selectedSettingsTab === 'settings'}
		on:click={() => {
			$selectedSettingsTab = 'settings';
			$selectedSettingsPage = subPage;
		}}
	>
		{subPage.parentPage ? subPage.name : 'Home'}
	</div>
{/each}
