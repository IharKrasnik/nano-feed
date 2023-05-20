<script>
	import ColorPicker from 'svelte-awesome-color-picker';
	import { fly } from 'svelte/transition';
	import FileInput from 'lib/components/FileInput.svelte';
	import Modal from 'lib/components/Modal.svelte';
	import SitePreview from '$lib/components/site-preview.svelte';
	import BrowserFrame from 'lib/components/BrowserFrame.svelte';
	import Emoji from '$lib/components/render/Emoji.svelte';
	import isDarkColor from 'is-dark-color';

	let isColorPickerShown = false;

	let fontPairs = [
		{ title: 'Archivo', text: 'Inter' },
		{ title: 'Calistoga', text: 'IBM Plex Sans' },
		{ title: 'Cabin', text: 'Montserrat' },
		{ title: 'Fraunces', text: 'Poppins' },
		{ title: 'Syne', text: 'Syne' }
	];

	fontPairs.forEach((p, i) => {
		if (i > 0) {
			p.id = p.title + ' + ' + p.text;
		}
	});

	let themes = [
		{
			backgroundColor: '#ffffff',
			textColor: '#111',
			accentColor: '#000000',
			sectionBackgroundColor: 'rgb(128, 127, 128, 0.05)'
		},
		{
			backgroundColor: '#0C120C',
			textColor: '#eeeeee',
			accentColor: '#eeeeee',
			sectionBackgroundColor: '#212121'
		},
		{
			backgroundColor: '#0C1020',
			textColor: '#D5CCB2',
			accentColor: '#A4368D',
			sectionBackgroundColor: '#222'
		},
		{
			backgroundColor: '#F4FCFC',
			textColor: '#000000',
			accentColor: '#4350D1',
			sectionBackgroundColor: '#FFFFFF'
		},
		{
			backgroundColor: '#F5DCCA',
			textColor: '#000000',
			accentColor: '#000000',
			sectionBackgroundColor: '#FFFFFF'
		},
		{
			backgroundColor: '#6733ff',
			textColor: '#fffdfc',
			accentColor: '#fff9e5',
			sectionBackgroundColor: '#fff'
		}
	];

	themes.forEach((t) => {
		t.theme = isDarkColor(t.backgroundColor) ? 'dark' : 'light';
		t.buttonTheme = isDarkColor(t.accentColor) ? 'dark' : 'light';

		if (t.theme === 'dark') {
			t.inputBackground = 'transparent';
			t.inputColor = '#ffffff';
		} else {
			t.inputBackground = '#f5f5f5';
			t.inputColor = '#222222';
		}

		if (t.buttonTheme === 'dark') {
			t.buttonColor = '#ffffff';
		} else {
			t.buttonColor = '#222222';
		}
	});

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

	page.theme = page.theme || {};

	let updateFonts = () => {
		let fontPair = fontPairs.find((p) => p.id === page.theme.fontPairId);

		page.theme.titleFont = fontPair.title;
		page.theme.textFont = fontPair.text;

		themes = themes.map((t) => {
			t.titleFont = fontPair.title;
			t.textFont = fontPair.text;
			t.fontPairId = fontPair.id;

			return t;
		});
	};

	let bgColorRGB;
</script>

{#key page._id}
	<div
		class="relative flex justify-center items-center cursor-pointer w-[25px] h-[25px] rounded-full"
		style="border: 1px {page.theme.accentColor} solid; background-color: {page.theme
			.backgroundColor}; color: {page.theme.textColor}"
		on:click={() => {
			isColorPickerShown = true;
		}}
	>
		<div class="text-xs">Aa</div>

		{#if isColorPickerShown}
			<Modal
				isShown
				onClosed={() => {
					isColorPickerShown = false;
				}}
			>
				<div class="p-8">
					<h2 class="text-2xl mb-4 font-bold _title">Styles</h2>

					<div class="flex justify-between mb-16">
						<div>
							<div class="mt-2 mb-8">
								<select bind:value={page.theme.fontPairId} on:change={updateFonts}>
									{#each fontPairs as fontPair}
										<option value={fontPair.id}>{fontPair.title} + {fontPair.text}</option>
									{/each}
								</select>
							</div>

							<div>
								<div class="text-sm mb-2">Background Color</div>

								<input
									type="color"
									id="head"
									name="head"
									bind:value={page.theme.backgroundColor}
									on:input={() => {
										let newTheme = isDarkColor(page.theme.backgroundColor) ? 'dark' : 'light';

										if (page.theme.theme !== newTheme) {
											page.theme = {
												...page.theme,
												theme: newTheme,
												textColor: newTheme === 'dark' ? '#f5f5f5' : '#111'
											};
										}
									}}
								/>
							</div>

							<div>
								<div class="text-sm mb-2">Accent Color (buttons and highlight)</div>

								<input
									type="color"
									id="head"
									name="head"
									bind:value={page.theme.accentColor}
									on:input={() => {
										let newTheme = isDarkColor(page.theme.accentColor) ? 'dark' : 'light';

										if (page.theme.buttonTheme !== newTheme) {
											page.theme = {
												...page.theme,
												buttonTheme: newTheme,
												buttonColor: newTheme === 'dark' ? '#f5f5f5' : '#111'
											};
										}
									}}
								/>
							</div>
						</div>

						<div
							class="p-4 bg-[#f5f5f5] overflow-hidden w-full max-h-[300px] overflow-y-hidden pointer-events-none max-w-[600px] rounded-xl"
						>
							<!-- <BrowserFrame scale={'0.4'}> -->
							<div style="zoom: .5;" class="rounded-2xl transition" on:click={() => setTheme(t)}>
								<SitePreview isAboveTheFold={true} maxHeight="350px;" page={{ ...page }} />
							</div>
							<!-- </BrowserFrame> -->
						</div>
					</div>

					<h2 class="text-2xl mb-4 font-bold _title">Color Themes</h2>
					<div>Choose from prepared schemes</div>

					{#key page.theme.fontPairId}
						<div class="bg-white mt-8" in:fly={{ y: 50, duration: 150 }}>
							<div class="w-full grid grid-cols-3 gap-4">
								{#each themes as t}
									<div class="p-2 w-full max-h-[200px] overflow-y-hidden cursor-pointer">
										<!-- <BrowserFrame scale={'0.4'}> -->
										<div
											style="zoom: .5;"
											class="rounded-2xl transition hover:scale-110"
											on:click={() => setTheme(t)}
										>
											<SitePreview
												isAboveTheFold={true}
												maxHeight="350px;"
												page={{ ...page, theme: { ...t } }}
											/>
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
					{/key}
				</div>
			</Modal>
		{/if}
	</div>
{/key}
