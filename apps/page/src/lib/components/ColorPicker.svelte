<script>
	import { fly } from 'svelte/transition';
	import clickOutside from 'lib/use/clickOutside';
	import FileInput from 'lib/components/FileInput.svelte';
	import SitePreview from '$lib/components/site-preview.svelte';
	import BrowserFrame from 'lib/components/BrowserFrame.svelte';
	import Emoji from '$lib/components/render/Emoji.svelte';

	let isColorPickerShown = false;

	let themes = [
		{
			backgroundColor: '#fff',
			textColor: '#111',
			accentColor: '#000',
			sectionBackgroundColor: 'rgb(128, 127, 128, 0.05)'
		},
		{
			backgroundColor: '#0C120C',
			textColor: '#fff',
			accentColor: '#000',
			sectionBackgroundColor: '#212121',
			theme: 'dark'
		},
		{
			backgroundColor: '#0C1020',
			textColor: '#D5CCB2',
			accentColor: '#A4368D',
			sectionBackgroundColor: '#222',
			theme: 'dark'
		},
		{
			backgroundColor: '#F4FCFC',
			textColor: '#000000',
			accentColor: '#4350D1',
			sectionBackgroundColor: '#FFFFFF'
		},
		{
			backgroundColor: '#F4B647',
			textColor: '#0C120C',
			accentColor: '#0C120C',
			sectionBackgroundColor: '#FFFFFF'
		},
		{
			backgroundColor: '#F5DCCA',
			textColor: '#000000',
			accentColor: '#000000',
			sectionBackgroundColor: '#FFFFFF'
		}
	];

	export let page;

	let setTheme = (theme) => {
		page.theme = theme;

		setTimeout(() => {
			isColorPickerShown = false;
		}, 0);
	};

	$: if (!page.theme) {
		page.theme = themes[0];
	}
</script>

{#key page._id}
	<div
		class="relative flex justify-center items-center cursor-pointer w-[25px] h-[25px] rounded-full"
		style="border: 1px {page.theme.accentColor} solid; background-color: {page.theme
			.backgroundColor}; color: {page.theme.textColor}"
		on:click={() => (isColorPickerShown = true)}
		use:clickOutside
		on:clickOutside={() => {
			isColorPickerShown = false;
		}}
	>
		<div class="text-xs">Aa</div>

		{#if isColorPickerShown}
			<div
				class="absolute left-0 top-0 mt-8 z-40 bg-white p-4 w-[400px] left-0"
				in:fly={{ y: 50, duration: 150 }}
			>
				<div class="w-full grid grid-cols-2">
					{#each themes as t}
						<div class="p-2 w-full max-h-[200px] overflow-y-hidden">
							<!-- <BrowserFrame scale={'0.4'}> -->
							<div
								style="zoom: 0.4;"
								class="rounded-2xl transition hover:scale-110"
								on:click={() => setTheme(t)}
							>
								<SitePreview maxHeight="350px;" page={{ ...page, theme: t }} />
							</div>
							<!-- </BrowserFrame> -->
						</div>
						<!-- <div
						class="flex justify-center items-center w-[25px] h-[25px] rounded-full mr-2 text-xs"
						style="border: 1px rgba(0,0,0,.3) solid; background-color: {t.backgroundColor}; color: {t.textColor}"
					>
						Aa
					</div> -->
					{/each}
				</div>
			</div>
		{/if}
	</div>
{/key}
