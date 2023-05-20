<script>
	import _ from 'lodash';
	import ColorPicker from 'svelte-awesome-color-picker';
	import { fly } from 'svelte/transition';
	import { lighten, darken, getLuminance } from 'lib/helpers/color';
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

	let sectionBackgroundColors = {
		'#ffffff': 'rgba(0,0,0, .3)'
	};

	let colors = {
		all: [
			'#ffffff',
			'#000000',
			'#0C120C',
			'#0C1020',
			'#A4368D',
			'#F5DCCA',
			'#6733ff',
			'#41d8ce',
			'#29e783',
			'#283fe6',
			'#e6e027',
			'#03005c',
			'#c6ffad',
			'#fb00ff',
			'#00474d',
			'#00ebff'
		],
		dark: [],
		light: []
	};

	let isTooLight = (color) => {
		return getLuminance(color) > 0.9;
		// color = color.toLowerCase();

		// let a = ['d', 'e', 'f'].includes(color[1]) ? 1 : 0;
		// let b = ['d', 'e', 'f'].includes(color[3]) ? 1 : 0;
		// let c = ['d', 'e', 'f'].includes(color[5]) ? 1 : 0;

		// return a + b + c >= 2;
	};

	if (window) {
		window.getLuminance = getLuminance;
	}
	let isTooDark = (color) => {
		return getLuminance(color) < 0.2;
		// color = color.toLowerCase();
		// return color.startsWith('#0') && parseInt(color[3]) < 2;
	};

	colors.all.forEach((color) => {
		if (isDarkColor(color)) {
			colors.dark.push(color);
		} else {
			colors.light.push(color);
		}
	});

	let themes;

	let LIGHT_SECTION_COLOR = 'rgba(255, 255, 255, 0.3)';
	let DARK_SECTION_COLOR = 'rgba(0, 0, 0, 0.3)';

	let generateThemes = () => {
		let limit = 6;

		let lightColors = _.take(_.shuffle(colors.light), limit);
		let darkColors = _.take(_.shuffle(colors.dark), limit);

		let result = [];

		for (let i = 0; i < limit; i++) {
			if (i % 2) {
				result.push({
					backgroundColor: darkColors[i],
					textColor: '#f5f5f5',
					// textColor: lightColors[limit - i - 1],
					accentColor: lightColors[i],
					buttonColor: '#111111',

					...(isTooDark(darkColors[i])
						? {
								sectionBackgroundColor: 'rgba(255,255,255,0.1)',
								sectionTheme: 'dark'
						  }
						: {
								sectionBackgroundColor: DARK_SECTION_COLOR,
								sectionTheme: 'dark'
						  })
				});
			} else {
				result.push({
					backgroundColor: lightColors[i],
					textColor: '#111111',
					// textColor: darkColors[limit - i - 1],
					accentColor: darkColors[i],
					...(isTooLight(lightColors[i])
						? {
								sectionBackgroundColor: 'rgba(0,0,0,0.05)',
								sectionTheme: 'light'
						  }
						: {
								sectionBackgroundColor: LIGHT_SECTION_COLOR,
								sectionTheme: 'light'
						  }),

					buttonColor: '#f5f5f5'
				});
			}
		}

		themes = result;
	};

	generateThemes();

	// let themes = [
	// 	{
	// 		backgroundColor: '#ffffff',
	// 		textColor: '#111111',
	// 		accentColor: '#000000',
	// 		sectionBackgroundColor: 'rgb(128, 127, 128, 0.05)'
	// 	},
	// 	{
	// 		backgroundColor: '#0C120C',
	// 		textColor: '#eeeeee',
	// 		accentColor: '#eeeeee',
	// 		sectionBackgroundColor: '#212121'
	// 	},
	// 	{
	// 		backgroundColor: '#0C1020',
	// 		textColor: '#D5CCB2',
	// 		accentColor: '#A4368D',
	// 		sectionBackgroundColor: '#222'
	// 	},
	// 	{
	// 		backgroundColor: '#F4FCFC',
	// 		textColor: '#000000',
	// 		accentColor: '#4350D1',
	// 		sectionBackgroundColor: '#FFFFFF'
	// 	},
	// 	{
	// 		backgroundColor: '#F5DCCA',
	// 		textColor: '#000000',
	// 		accentColor: '#000000',
	// 		sectionBackgroundColor: '#FFFFFF'
	// 	},
	// 	{
	// 		backgroundColor: '#6733ff',
	// 		textColor: '#fffdfc',
	// 		accentColor: '#fff9e5',
	// 		sectionBackgroundColor: '#fff'
	// 	}
	// ];

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
		page.theme = { ...theme };

		setTimeout(() => {
			isColorPickerShown = false;
		}, 0);
	};

	if (!page.theme?.textColor) {
		page.theme = {
			textColor: '#111111',
			accentColor: '#000000',
			backgroundColor: '#ffffff'
		};
	}

	$: if (!page.theme) {
		degugger;
		page.theme = themes[0];
	}

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
			generateThemes();
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
							<div class="flex">
								<div class="_section">
									<div class="text-sm font-bold">Background Color</div>
									<div class="text-sm mb-2 opacity-80">Page background color</div>

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

								<div class="ml-2 _section">
									<div class="text-sm font-bold">Accent Color</div>
									<div class="text-sm mb-2 opacity-80">Buttons and highlight color</div>

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
							<div class="_section mt-2 mb-8">
								<div class="text-sm font-bold">Fonts</div>
								<div class="text-sm mb-4 opacity-80">Select your font below</div>

								<select bind:value={page.theme.fontPairId} on:change={updateFonts}>
									{#each fontPairs as fontPair}
										<option value={fontPair.id}>{fontPair.title} + {fontPair.text}</option>
									{/each}
								</select>
							</div>
						</div>

						<div class="overflow-hidden w-full overflow-y-hidden max-w-[500px] rounded-xl">
							<!-- <BrowserFrame scale={'0.4'}> -->
							<div style="zoom: .5;" class="rounded-2xl transition" on:click={() => setTheme(t)}>
								<BrowserFrame>
									<div class="max-h-[500px] overflow-y-scroll">
										<SitePreview isEmbed maxHeight="450px;" page={{ ...page }} />
									</div>
								</BrowserFrame>
							</div>
							<!-- </BrowserFrame> -->
						</div>
					</div>

					<div class="flex justify-between items-center">
						<div>
							<h2 class="text-2xl font-bold _title">Design Library</h2>

							<div class="flex w-full flex justify-between items-center mb-4">
								<div>Update your design in 1 click. Or generate more 👉</div>
							</div>
						</div>

						<button class="_button _primary cursor-pointer" on:click={generateThemes}
							>💥 Generate more designs</button
						>
					</div>

					{#key page.theme.fontPairId}
						<div class="bg-white mt-8" in:fly={{ y: 50, duration: 150 }}>
							<div class="w-full grid grid-cols-3 gap-4">
								{#each themes as t}
									<div class="p-2 w-full max-h-[250px] overflow-y-hidden cursor-pointer">
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
