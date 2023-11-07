<script>
	import _ from 'lodash';
	import { lighten, darken, getLuminance } from 'lib/helpers/color';
	import fileFonts from '$lib/stores/fileFonts';

	export let page;

	export let isPreview = false;
	export let width = page.size?.width || 0;
	export let height = page.size?.height || 0;

	export let headerFont = 'Bowlby';
	export let textFont = 'Inter';

	let isHorizontal = page.size && page.size.width > page.size.height;

	let fontsConfig = {
		gaegu: {
			title: [
				{ fontSize: 120, lineHeight: 0.9, maxLength: 200 },
				{ fontSize: 64, lineHeight: 1, maxLength: 1000 }
			],
			subtitle: [{ fontSize: 70, lineHeight: 0.9, maxLength: 1000 }]
		},
		archivo: {
			title: [
				{ fontSize: 120, lineHeight: 0.8, maxLength: isHorizontal ? 40 : 200 },
				{ fontSize: 80, lineHeight: 1, maxLength: 1000 }
			],
			subtitle: [{ fontSize: 60, lineHeight: 1.2, maxLength: 1000 }]
		},
		bowlby: {
			title: [
				{ fontSize: 100, lineHeight: 1, maxLength: isHorizontal ? 40 : 200 },
				{ fontSize: 64, lineHeight: 1, maxLength: 1000 }
			],
			subtitle: [{ fontSize: 60, lineHeight: 1.2, maxLength: 1000 }]
		}
	};

	let getFontSize = (title) => {
		let res;

		_.each(fontsConfig[page.theme?.font || 'archivo'].title, (fontConfig) => {
			if (!res && title.length < fontConfig.maxLength) {
				res = fontConfig;
			}
		});

		return `font-size: ${res.fontSize}px; line-height: ${res.lineHeight * res.fontSize}px;`;
	};

	let getSubtitleFontSize = (subtitle) => {
		let res;

		_.each(fontsConfig[page.theme?.font || 'archivo'].subtitle, (fontConfig) => {
			if (!res && subtitle.length < fontConfig.maxLength) {
				res = fontConfig;
			}
		});

		return `font-size: ${res.fontSize}px; line-height: ${res.lineHeight * res.fontSize}px;`;
	};

	export let bgColor = 'rgb(208, 145, 255)';
	export let accentColor;
	let isTest;
	bgColor = 'rgb(251, 200, 46)';
	bgColor = 'rgb(127, 176, 105)'; //green
	bgColor = '#03005c';

	let textColor;
	// bgColor = 'rgb(37, 206, 209)';

	let imageUrl;
	let imageEl;

	if (imageEl) {
		imageEl.onload = () => {
			throw new Error();
		};
	}

	imageUrl =
		'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1692277307178-image.png';

	let isVertical = !page.demoImageSize || page.demoImageSize.width > page.demoImageSize.height;

	let imageStyles = isVertical
		? `width: ${width}; height: ${height * 0.35}px; `
		: `width: ${width * 0.4}px; height: ${height}px;`;

	let bgUrl;

	$: if (page) {
		if (page?.theme?.backgroundColor && page?.theme?.backgroundColor.startsWith('http')) {
			bgUrl = page?.theme?.backgroundColor;
			bgColor = 'transparent';
		} else {
			bgColor = page?.theme?.backgroundColor || 'white';
		}
		textColor = page?.theme?.textColor || 'black';
		accentColor = page?.theme?.accentColor || 'black';
		imageUrl = page.demoUrl || page.imageUrl;
	}

	let cssStyles = '';

	let titleFontName;
	let textFontName;

	$: if (page.theme) {
		let font = page.theme?.font
			? $fileFonts.filter((f) => f.name === page.theme.font)[0]
			: $fileFonts[0];

		titleFontName = font.titleFont;
		textFontName = font.textFont;
	}
</script>

<!-- style="background-image: url(http://localhost:5173/backgrounds/gradient-7.svg)"> -->
<!-- background-color: #fbc72d; -->

<!-- text-shadow:{darken(
	bgColor,
	0.8
)} 6px 6px; 6px 6px; -->

<!-- {#if page.callToAction}
						<div
							class="_title"
							style="font-size: 32px; background-color: {accentColor}; color: {page.theme
								?.buttonTheme === 'light'
								? 'black'
								: 'white'}; display: flex; align-items:center; font-weight: bold; opacity: .9; text-align: {imageUrl
								? 'left'
								: 'center'}; margin: 0 auto; margin-top: 20px; border-radius: 30px; padding: 20px 30px;"
						>
							{page.callToAction}
						</div>
					{/if} -->

<div
	class="relative"
	style="display: flex; flex-direction: column; {bgUrl
		? ``
		: ''}; {cssStyles}; font-family: {textFontName};  min-width: {width}px; min-height: {height}px;"
>
	{#if bgUrl}
		<img src={bgUrl} class="absolute w-full h-full object-cover" style="z-index: -1;" />
	{/if}

	<div class="og transition" style=" background-color: {bgColor}; color: {textColor};">
		<div class="flex justify-between items-center" style="width: {width}px;">
			<div class="flex {isVertical ? 'flex-col' : 'flex-row'} justify-between items-center w-full">
				<div
					class="flex flex-col {page.author ? 'mt-[-80px]' : ''}"
					style={imageUrl
						? isVertical
							? `width: ${width}px; height: ${height * 0.65}px`
							: `width: ${width * 0.6}px; height: ${height}px;`
						: `width: ${width}px; height: ${height}px;`}
				>
					<div class="flex flex-col items-start justify-center h-full w-full max-w-[95%] mx-auto">
						<div
							class="flex items-center justify-start {page.logo || page.name ? 'mb-[40px]' : ''}"
						>
							{#if page.logo}
								{#if page.logo.startsWith('http') || page.logo.startsWith('//')}
									<img style="width: 40px; margin-right: 20px" src={page.logo} />
								{:else}
									<div class="width: 60px; margin-right: 20px;">
										{page.logo}
									</div>
								{/if}
							{/if}

							{#if page.name}
								<div
									class="_title flex items-center font-bold opacity-90 shrink-0 mb-0"
									style="font-size: 32px; color: {textColor}; max-width: 95%; margin-left: 20px; margin-bottom: 0;"
								>
									{page.name}
								</div>
							{/if}
						</div>

						{#if page.title}
							<div
								class="flex flex-col _title {page.subtitle ? 'mb-[40px]' : ''}"
								style="font-family: {titleFontName}; {getFontSize(page.title)};"
							>
								{page.title}
							</div>
						{/if}

						{#if page.subtitle}
							<div
								class="flex flex-col"
								style="margin-top: 40px; {getSubtitleFontSize(page.subtitle)}"
							>
								{#if isPreview}
									{@html page.subtitle.replace(/\n/g, '<br/>')}
								{:else}
									{page.subtitle.replace(/\n/g, '<br/>')}
								{/if}
							</div>
						{/if}
					</div>
				</div>

				<div class="absolute bottom-[0px] left-0 w-full flex justify-start text-left">
					{#if page.author}
						<div class="flex text-left items-center justify-start w-[95%] mx-auto">
							<img
								src={page.author.avatarUrl}
								style="width: 70px; height: 70px; border-radius: 100%;"
							/>
							<div class="font-bold ml-[20px] text-[40px]">
								{page.author.fullName}
							</div>
						</div>
					{/if}
				</div>

				<!-- {#if imageUrl}
					<div class="flex" style="{imageStyles} overflow: hidden; ">
						<img
							src={imageUrl}
							bind:this={imageEl}
							class="rounded-2xl"
							style="width: {width}px; object-fit: contain;"
						/>
					</div>
				{/if} -->
			</div>
		</div>
	</div>
</div>

<style>
	* {
		/* font-family: Inter; */
		/* font-family: var(--text-font); */
	}

	._title {
		/* font-family: Bowlby One; */
		/* font-family: var(--title-font); */
		font-weight: bold;
	}

	._title b {
		background-color: yellow;
	}

	b {
		background: red;
		padding: 16px;
		margin: 0 16px;
		font-weight: bold;
	}

	.og {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		justify-content: center;
	}

	.moment {
		margin-top: 32px;
		padding: 32px;
		border-radius: 32px;
		border: 1px rgba(255, 255, 255, 0.3) solid;
	}
</style>
