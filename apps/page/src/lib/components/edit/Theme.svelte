<script>
	import _ from 'lodash';
	import { lighten, darken, getLuminance } from 'lib/helpers/color';
	import isDarkColor from 'is-dark-color';

	import CodeMirror from '$lib/components/edit/CodeMirror.svelte';

	let value = '';
	let isColorPickerShown = false;
	export let page;

	let titleFonts = [
		'Inter',
		'DM Sans',
		'Changa',
		'Plus Jakarta Sans',
		'Syne',
		'Archivo',
		'Calistoga',
		'Cabin',
		'Fraunces',
		'Montserrat',
		'Space Grotesk',
		'Bricolage Grotesque'
	];

	let labelFonts = ['Inter', 'Space Grotesk', 'Fraunces'];

	let textFonts = [
		'Inter',
		'Montserrat',
		'DM Sans',
		'Poppins',
		'Space Grotesk',
		'Plus Jakarta Sans'
	];

	if (page.theme && !page.theme.titleFont) {
		page.theme.titleFont = titleFonts[0];
		page.theme.textFont = textFonts[0];
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
			'#222222',
			lighten(page?.theme?.accentColor || '#fff', 0.8),
			darken(page?.theme?.accentColor || '#fff', 0.99)
		],
		accent: [
			'#00EE2C',
			'#00F0C8',
			'#00B8FF',
			'#0055FF',
			'#713CFF',
			'#C305D1',
			'#FEFD00',
			'#FFDC5C',
			'#FFA200',
			'#E60004'
		],
		textColor: ['#f6f5f4', '#111111'],
		buttonColor: ['#f6f5f4', '#111111'],
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
					textColor: null,
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
					textColor: null,
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

	let resetPageStyles = () => {
		page.theme = {
			accentColor: '#000000',
			backgroundColor: '#ffffff',
			isOverride: false
		};
	};

	let isEditAsJson = false;
	let themeJsonStr = '';

	const customisableClasses = [
		'section-title',
		'section-description',
		'section-label',
		'section-item',
		'section-item-padding',
		'section-item-title',
		'section-item-description'
	];
	generateThemes();
</script>

{#key page._id}
	<div class="mt-8">
		<div class="_editor">
			<div class="flex items-center">
				<h2 class="text-lg font-bold _title mr-12">Page Appearance</h2>
			</div>

			<div class="flex relative justify-between gap-4 mb-16">
				<div class="relative">
					<div
						class="absolute right-0 top-0 text-sm mb-2 cursor-pointer translate-y-[-100%] mt-[-10px] _text-link "
						on:click={() => {
							isEditAsJson = !isEditAsJson;

							if (isEditAsJson) {
								let themeClone = { ...page.theme };
								delete themeClone.customCss;

								Object.keys(page.theme).forEach((key) => {
									if (key.includes('Font')) {
										delete themeClone[key];
									}
								});

								themeJsonStr = JSON.stringify(themeClone, null, 2);
							}
						}}
					>
						{isEditAsJson ? 'Edit via UI' : 'Edit CSS/JSON'}
					</div>

					{#if isEditAsJson}
						<div class="font-semibold mb-4">Custom CSS</div>
						<div class="bg-white max-w-[350px]">
							<CodeMirror language="css" bind:value={page.theme.customCss} />
						</div>
						<div class="_section">
							<!-- <textarea class="w-full" rows={30} bind:value={page.theme.customCss} /> -->

							<div class="flex gap-x-2 items-center flex-wrap">
								{#each customisableClasses as customisableClass}
									<div class="text-xs">
										.{customisableClass}
									</div>
								{/each}
							</div>
						</div>
						<div class="text-sm font-bold mb-2">Theme JSON</div>
						<div class="bg-white max-w-[350px]">
							<CodeMirror
								language="json"
								bind:value={themeJsonStr}
								onChange={() => {
									try {
										page.theme = { ...page.theme, ...JSON.parse(themeJsonStr) };
									} catch (err) {}
								}}
							/>
						</div>
					{:else}
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
							<div class="flex flex-wrap">
								{#each colors.accent as color}
									<div
										class="w-[30px] h-[30px] border border-black/50 rounded-full mb-1 mr-1"
										on:click={() => {
											page.theme.accentColor = color;
											changeAccentColor();
										}}
										style="background-color: {color};"
									/>
								{/each}
							</div>
						</div>

						<div class="_section">
							<div class="font-bold mb-1">Advanced colors</div>
							<div class="text-sm opacity-80 mb-4">
								It's easy to get messy with colors so better stick to defaults
							</div>
							<div class="grid grid-cols-2 gap-4">
								<div class="_section">
									<div class="shrink-0">
										<div class="flex w-full justify-between">
											<div class="text-xs font-semibold">Text Color</div>
											<input type="color" id="head" name="head" bind:value={page.theme.textColor} />
										</div>
										<div class="flex flex-col justify-between w-full">
											<div class="flex flex-wrap mt-4">
												{#each colors.textColor as color}
													<div
														class="w-[30px] h-[30px] border border-black/50 rounded-full mb-1 mr-1"
														on:click={() => {
															page.theme.textColor = color;
														}}
														style="background-color: {color};"
													/>
												{/each}
											</div>

											{#if page.theme.textColor}
												<div
													class="_text-link text-sm cursor-pointer"
													on:click={() => {
														page.theme.textColor = null;
													}}
												>
													Reset
												</div>
											{/if}
										</div>
									</div>
								</div>
								<div class="_section">
									<div class="shrink-0">
										<div class="flex w-full justify-between">
											<div class="text-xs font-semibold">Button Text Color</div>
											<input
												type="color"
												id="head"
												name="head"
												bind:value={page.theme.buttonColor}
												class="shrink-0"
											/>
										</div>
										<div class="flex flex-col justify-between w-full">
											<div class="flex flex-wrap mt-4">
												{#each colors.buttonColor as color}
													<div
														class="w-[30px] h-[30px] border border-black/50 rounded-full mb-1 mr-1"
														on:click={() => {
															page.theme.buttonColor = color;
														}}
														style="background-color: {color};"
													/>
												{/each}
											</div>

											{#if page.theme.buttonColor}
												<div
													class="_text-link text-sm cursor-pointer"
													on:click={() => {
														page.theme.buttonColor = null;
													}}
												>
													Reset
												</div>
											{/if}
										</div>
									</div>
								</div>

								<div class="_section">
									<div class="shrink-0">
										<div class="flex w-full justify-between">
											<div class="text-xs font-semibold">Section Items Background Color</div>
											<input
												type="color"
												id="head"
												name="head"
												class="shrink-0"
												bind:value={page.theme.sectionItemBackgroundColor}
											/>
										</div>
										<div class="flex items-center justify-between w-full">
											{#if page.theme.sectionItemBackgroundColor}
												<div
													class="_text-link text-sm cursor-pointer"
													on:click={() => {
														page.theme.sectionItemBackgroundColor = null;
													}}
												>
													Reset
												</div>
											{/if}
										</div>
									</div>
								</div>
								<div class="_section">
									<div class="shrink-0">
										<div class="flex w-full justify-between">
											<div class="text-xs font-semibold">Link Color</div>
											<input type="color" class="shrink-0" bind:value={page.theme.linkColor} />
										</div>
										<div class="flex items-center justify-between w-full">
											{#if page.theme.linkColor}
												<div
													class="_text-link text-sm cursor-pointer"
													on:click={() => {
														page.theme.linkColor = null;
													}}
												>
													Reset
												</div>
											{/if}
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="flex gap-4 items-center col-span-2 my-4">
							<!-- <input type="checkbox" bind:checked={page.theme.isInputBorder} /> Transparent Input -->
							<div>
								<input type="checkbox" bind:checked={page.theme.isTitlesLeft} />
								Are Titles Left
							</div>
							<div>
								<input type="checkbox" bind:checked={page.theme.isTitlesHuge} />
								Are Titles Huge
							</div>
						</div>

						<div class="grid grid-cols-1 gap-4 mb-2">
							<div class="_section">
								<div class="font-bold mb-2">Fonts</div>

								<div class="grid grid-cols-2 gap-4">
									<div class="_section w-full">
										<div class="font-bold mb-2">Title Font</div>

										<select class="w-full" bind:value={page.theme.titleFont}>
											{#each titleFonts as titleFont}
												<option value={titleFont}>{titleFont}</option>
											{/each}
										</select>
										<div class="mt-4">
											<input type="checkbox" bind:checked={page.theme.isGradientTitle} />

											Are Titles Gradient
										</div>
									</div>

									<div class="_section w-full">
										<div class="font-bold mb-2">Text Font</div>

										<select class="w-full" bind:value={page.theme.textFont}>
											{#each textFonts as textFont}
												<option value={textFont}>{textFont}</option>
											{/each}
										</select>

										<div class="font-bold mb-2 mt-4">Label Font</div>

										<select class="w-full" bind:value={page.theme.labelFont}>
											{#each labelFonts as labelFont}
												<option value={labelFont}>{labelFont}</option>
											{/each}
										</select>
									</div>
								</div>
							</div>

							<div class="_section">
								<div class="font-semibold mb-4">Buttons Radius</div>
								<button
									class="_transparent border rounded-[2px] mr-2 px-6"
									on:click={() => setButtonRadius('2px')}
									>{#if page.theme.buttonRadius === '2px'}✅{/if} No
									<div class="text-xs">2px</div></button
								>
								<button
									class="_transparent border rounded-[8px] mr-2 px-6"
									on:click={() => setButtonRadius('8px')}
									>{#if page.theme.buttonRadius === '8px'}✅{/if} SM
									<div class="text-xs">8px</div></button
								><button
									class="_transparent border rounded-[16px] mr-2 px-6"
									on:click={() => setButtonRadius('16px')}
									>{#if page.theme.buttonRadius === '16px'}✅{/if} MD
									<div class="text-xs">16px</div></button
								><button
									class="_transparent border rounded-[24px] mr-2 px-6"
									on:click={() => setButtonRadius('24px')}
									>{#if !page.theme.buttonRadius || page.theme.buttonRadius === '24px'}✅{/if} LG
									<div class="text-xs">24px</div></button
								>
							</div>

							<div class="_section">
								<div>
									<div class="font-bold mb-4">Container Size</div>
									<div class="flex gap-4">
										<button
											class="_transparent border rounded-[8px]"
											on:click={() => setContainerWidth('900px')}
											>{#if page.theme.containerWidth === '900px'}✅{/if} SM
											<div class="text-xs">900px</div></button
										><button
											class="_transparent border rounded-[8px]"
											on:click={() => setContainerWidth('1080px')}
											>{#if page.theme.containerWidth === '1080px'}✅{/if}MD
											<div class="text-xs">1080px</div></button
										><button
											class="_transparent border rounded-[8px]"
											on:click={() => setContainerWidth('1200px')}
											>{#if !page.theme.containerWidth || page.theme.containerWidth === '1200px'}✅{/if}
											LG
											<div class="text-xs">1200px</div></button
										>
										<button
											class="_transparent border rounded-[8px]"
											on:click={() => setContainerWidth('1280px')}
											>{#if page.theme.containerWidth === '1280px'}✅{/if} XL
											<div class="text-xs">1280px</div></button
										>
									</div>
								</div>
							</div>
						</div>
						<div class="_section flex justify-between mt-12">
							<button
								class="_primary _small"
								on:click={() => {
									isColorPickerShown = false;
								}}>Save and close</button
							>
							<button class="_orange _small" on:click={resetPageStyles}>Reset Styles</button>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/key}
