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
	export let page;

	let fontPairs = [
		{ title: 'Inter', subtitle: 'Space Grotesk', text: 'Inter' },
		{ title: 'DM Sans', text: 'Inter' },
		{ title: 'Syne', text: 'Syne' },
		{ title: 'Archivo', text: 'Inter' },
		{ title: 'Calistoga', text: 'IBM Plex Sans' },
		{ title: 'Cabin', text: 'Montserrat' },
		{ title: 'Fraunces', text: 'Poppins' }
	];

	fontPairs.forEach((p, i) => {
		if (i > 0) {
			p.id = p.title + ' + ' + p.text;
		}
	});

	if (page.theme && !page.theme.titleFont) {
		page.theme.titleFont = fontPairs[0].title;
		page.theme.textFont = fontPairs[0].text;
	}

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
		background: [
			'#ffffff',
			'#fafafa',
			'#111111',
			'#1c1c1c',
			'#222222',
			lighten(page?.theme?.accentColor || '#fff', 0.8),
			darken(page?.theme?.accentColor || '#fff', 0.99)
		],
		accent: [
			'#a7d7c5',
			'#a7c5d7',
			'#a7b0d7',
			'#a7c7d7',
			'#d7a7d4',
			'#b2a7d7',
			'#d7a7a7',
			'#a7d7c3',
			'#acd7a7',
			'#c8d7a7',
			'#d7d2a7',
			'#d7bca7',
			'#d7aea7'
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
					isZebra: true,
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
					isZebra: true,
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

		result.forEach((t) => {
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

		themes = result;
	};

	generateThemes();

	let setTheme = (theme) => {
		page.theme = { ...theme };

		setTimeout(() => {
			isColorPickerShown = false;
		}, 0);
	};

	if (!page.theme?.accentColor && !page.parentPage?.theme?.accentColor) {
		page.theme = {
			accentColor: '#000000',
			backgroundColor: '#ffffff'
		};
	}

	$: if (!page.theme) {
		page.theme = {};
	}

	let updateFonts = () => {
		let fontPair = fontPairs.find((p) => p.id === page.theme.fontPairId);

		page.theme.titleFont = fontPair.title;

		if (fontPair.subtitleFont) {
			page.theme.subtitleFont = fontPair.subtitleFont;
		}

		page.theme.textFont = fontPair.text;

		themes = themes.map((t) => {
			t.titleFont = fontPair.title;
			t.textFont = fontPair.text;
			t.fontPairId = fontPair.id;

			return t;
		});
	};

	let bgColorRGB;

	let setButtonRadius = (size) => {
		page.theme.buttonRadius = size;
	};

	let setContainerWidth = (width) => {
		page.theme.containerWidth = width;
	};

	let changeBackgroundColor = () => {
		let newTheme = isDarkColor(page.theme.backgroundColor) ? 'dark' : 'light';

		page.theme = {
			...page.theme,
			theme: newTheme,
			isOverride: true
		};
	};

	let changeAccentColor = () => {
		let newTheme = isDarkColor(page.theme.accentColor) ? 'dark' : 'light';

		colors.background.pop();
		colors.background.pop();
		colors.background.push(lighten(page.theme.accentColor, 0.8));
		colors.background.push(darken(page.theme.accentColor, 0.997));

		colors.background = [...colors.background];

		if (page.theme.buttonTheme !== newTheme) {
			page.theme = {
				...page.theme,
				buttonTheme: newTheme,
				buttonColor: newTheme === 'dark' ? '#f5f5f5' : '#111'
			};

			page.theme.isOverride = true;
		}
	};
</script>

{#key page._id}
	<div
		class="relative flex justify-center items-center cursor-pointer w-[25px] h-[25px] rounded-full"
		style="border: 2px {page.theme.accentColor} solid; background-color: {page.theme
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

					<div class="flex justify-between gap-4 mb-16">
						<div>
							<div class="_section grid grid-cols-2">
								<div class="shrink-0">
									<div class="text-sm font-bold">Background Color</div>
									<div class="text-sm mb-2 opacity-80">Page background color</div>

									<input
										type="color"
										id="head"
										name="head"
										bind:value={page.theme.backgroundColor}
										on:input={changeBackgroundColor}
									/>
								</div>
								<div class="flex flex-wrap gap-2">
									{#each colors.background as color}
										<div
											class="w-[30px] h-[30px] border border-black/50 rounded-full"
											on:click={() => {
												page.theme.backgroundColor = color;
												changeBackgroundColor();
											}}
											style="background-color: {color};"
										/>
									{/each}
								</div>
							</div>

							<div class="_section grid grid-cols-2">
								<div class="shrink-0">
									<div class="text-sm font-bold">Accent Color</div>
									<div class="text-sm mb-2 opacity-80">Buttons and highlight color</div>

									<input
										type="color"
										id="head"
										name="head"
										bind:value={page.theme.accentColor}
										on:input={changeAccentColor}
									/>
								</div>
								<div class="flex flex-wrap gap-2">
									{#each colors.accent as color}
										<div
											class="w-[30px] h-[30px] border border-black/50 rounded-full"
											on:click={() => {
												page.theme.accentColor = color;
												changeAccentColor();
											}}
											style="background-color: {color};"
										/>
									{/each}
								</div>
							</div>

							<div class="flex gap-4 items-center col-span-2 my-2">
								<div>
									<input type="checkbox" bind:checked={page.theme.is} />

									Are Titles Gradient
								</div>
								<div>
									<input type="checkbox" bind:checked={page.theme.isGradientTitle} />

									Are Titles Gradient
								</div>
								<!-- <div>
									<input type="checkbox" bind:checked={page.theme.isTitlesLeft} />
									Are Titles Left
								</div>
								<div>
									<input type="checkbox" bind:checked={page.theme.isTitlesHuge} />
									Are Titles Huge
								</div> -->
							</div>

							<div class="grid grid-cols-2 gap-4 mb-2">
								<div class="_section">
									<div class="font-semibold">Fonts</div>
									<div class="text-sm mb-4 opacity-80">Select your font below</div>

									<select bind:value={page.theme.fontPairId} on:change={updateFonts}>
										{#each fontPairs as fontPair}
											<option value={fontPair.id}>{fontPair.title} + {fontPair.text}</option>
										{/each}
									</select>
								</div>

								<div class="_section">
									<div class="font-semibold">Buttons Radius</div>
									<button on:click={() => setButtonRadius('2px')}
										>No <div class="text-xs">2px</div></button
									>
									<button on:click={() => setButtonRadius('8px')}
										>SM <div class="text-xs">8px</div></button
									><button on:click={() => setButtonRadius('16px')}
										>MD
										<div class="text-xs">16px</div></button
									><button on:click={() => setButtonRadius('24px')}
										>LG
										<div class="text-xs">24px</div></button
									>
									<input type="checkbox" bind:checked={page.theme.isInputBorder} /> Transparent
									Input
									<div>
										<div class="text-sm font-bold">Container Size:</div>
										<button on:click={() => setContainerWidth('900px')}>SM (900px)</button><button
											on:click={() => setContainerWidth('1080px')}>MD (1080px)</button
										><button on:click={() => setContainerWidth('1200px')}>LG (1200px)</button>
										<button on:click={() => setContainerWidth('1280px')}>XL (1280px)</button>
									</div>
								</div>
							</div>
						</div>

						<div class="overflow-hidden w-full overflow-y-hidden max-w-[1000px] rounded-xl">
							<!-- <BrowserFrame scale={'0.4'}> -->
							<div style="zoom: .5;" class="rounded-2xl transition" on:click={() => setTheme(t)}>
								<BrowserFrame>
									<div class="max-h-[1000px] overflow-y-scroll">
										<SitePreview isEmbed isNoBadge page={{ ...page }} />
									</div>
								</BrowserFrame>
							</div>
							<!-- </BrowserFrame> -->
						</div>
					</div>
				</div>
			</Modal>
		{/if}
	</div>
{/key}

<!-- 
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
					<div
						style="zoom: .5;"
						class="rounded-2xl transition hover:scale-110"
						on:click={() => setTheme(t)}
					>
						<SitePreview
							isAboveTheFold={true}
							maxHeight="350px;"
							isEmbed
							isNoBadge
							page={{ ...page, theme: { ...t } }}
						/>
					</div>
				</div>
			
			{/each}
		</div>
	</div>
{/key} -->
