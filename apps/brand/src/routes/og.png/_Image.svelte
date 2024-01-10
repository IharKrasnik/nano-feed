<script>
	import { lighten, darken, getLuminance } from 'lib/helpers/color';
	export let page;

	let getFontSize = (title) => {
		if (title?.length < 60) {
			return 'font-size: 90px; line-height: 90%;';
		} else if (title?.length < 100) {
			return 'font-size: 64px; line-height: 100%;';
		} else {
			return 'font-size: 48px; line-height: 120%;';
		}
	};

	export let bgColor = 'rgb(208, 145, 255)';
	let bgUrl;

	export let width;
	export let height;

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

	let imageStyles = isVertical ? `width: 1200px; height: 230px; ` : `width: 500px; height: 600px;`;

	$: if (page) {
		if (page?.theme?.backgroundColor && page?.theme?.backgroundColor.startsWith('url')) {
			bgUrl = page?.theme?.backgroundColor;
			bgColor = 'transparent';
		} else {
			bgColor = page?.theme?.backgroundColor || 'white';
		}
		textColor = page?.theme?.textColor || 'black';
		accentColor = page?.theme?.accentColor || 'black';
		imageUrl = page.demoUrl || page.imageUrl;
	}

	let styles = {
		mainContainer: '',
		textContainer: '',
		imageContainer: '',
		image: ''
	};
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
	style="display: flex; flex-direction: column; {bgUrl
		? `background-image: ${bgUrl};`
		: ''}; min-width: {width}px; min-height: {height}px;"
	class="h-full w-full"
>
	<div
		class="og"
		style="background-color: {bgColor ||
			'transparent'}; color: {textColor}; background: url('https://i.stack.imgur.com/GySvQ.png'); min-width: {width}px; min-height: {height}px;"
	>
		<div class="flex justify-between items-center" style="width: 1200px;">
			<div class="flex {isVertical ? 'flex-col' : 'flex-row'} justify-between items-center w-full">
				<div
					class="flex flex-col"
					style={imageUrl
						? isVertical
							? `width:1200px; height: 400px`
							: `width: 700px; height: 630px;`
						: 'w-full h-full'}
				>
					<div
						class="flex {isVertical ? 'justify-center' : 'justify-between'} items-center"
						style={isVertical ? 'margin: 10px auto;' : ''}
					>
						{#if page.logo}
							{#if page.logo.startsWith('http') || page.logo.startsWith('//')}
								<img style="width: 40px; margin-right: 20px" src={page.logo} />
							{:else}
								{page.logo}
							{/if}
						{/if}
					</div>

					{#if page.title}
						<div
							class="_title flex items-center {isVertical ? 'justify-center' : 'justify-start'}"
							style="{getFontSize(page.title)} {isVertical
								? 'text-align: center; margin: 0 auto;'
								: 'text-align: left;'}; max-width: 95%; margin: 0 auto; {imageUrl
								? isVertical
									? 'width: 1200px; height: 400px;'
									: 'height: 630px;'
								: ''}"
						>
							{page.title}
						</div>
					{/if}
				</div>

				{#if imageUrl}
					<div class="flex" style="{imageStyles} overflow: hidden; border: 3px {hite} solid;">
						<img src={imageUrl} bind:this={imageEl} style="width: 1200px; object-fit: contain;" />
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	* {
		font-family: Inter;
	}

	._title {
		font-family: Bowlby One;
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
