<script>
	import { lighten, darken, getLuminance } from 'lib/helpers/color';
	export let page;

	let getFontSize = (title) => {
		if (title.length < 60) {
			return 'font-size: 80px; line-height: 80%;';
		} else if (title.length < 100) {
			return 'font-size: 64px; line-height: 80%;';
		} else {
			return 'font-size: 48px; line-height: 80%;';
		}
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

	let isVertical = page.demoImageSize && page.demoImageSize.width > page.demoImageSize.height;
	console.log('demoImageSize', page.demoImageSize);
	let imageStyles = isVertical ? `width: 1200px; height: 230px; ` : `width: 500px; height: 600px;`;

	if (page) {
		bgColor = page?.theme?.backgroundColor || 'white';
		textColor = page?.theme?.textColor || 'black';
		accentColor = page?.theme?.accentColor || 'black';
		imageUrl = page.demoUrl;
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

<div style="display: flex; flex-direction: column;">
	<div
		class="og"
		style="background-color: {bgColor}; color: {textColor}; background: url('https://i.stack.imgur.com/GySvQ.png');
		"
	>
		<div class="flex justify-between items-center" style="width: 1200px;">
			<div class="flex {isVertical ? 'flex-col' : 'flex-row'} justify-between items-center w-full">
				<div
					class="flex flex-col"
					style={isVertical ? `width:1200px; height: 400px` : `width: 700px; height: 630px;`}
				>
					<div
						class="flex {isVertical ? 'justify-center' : 'justify-between'} items-center"
						style={isVertical ? 'margin: 10px auto;' : ''}
					>
						{#if page.logo}
							{#if page.logo.startsWith('http') || page.logo.startsWith('//')}
								<img style="width: 40px;" src={page.logo} />
							{:else}
								{page.logo}
							{/if}
						{/if}
						{#if page.name}
							<div
								class="_title flex items-center justify-start font-bold opacity-90"
								style="font-size: 32px; color: {textColor}; max-width: 95%; {isVertical
									? 'text-align: center; margin: 0 auto;'
									: 'text-align: left;'};"
							>
								{page.name}
							</div>
						{/if}
					</div>

					<div
						class="_title flex items-center justify-start"
						style="{getFontSize(page.title)} {isVertical
							? 'text-align: center; margin: 0 auto;'
							: 'text-align: left;'}; max-width: 95%; margin: 0 auto; {isVertical
							? 'width: 1200px; height: 400px;'
							: 'height: 630px;'}"
					>
						{page.title}
					</div>
				</div>

				{#if imageUrl}
					<div
						class="flex"
						style="{imageStyles} overflow: hidden; border: 3px {darken(bgColor, 0.8)} solid;"
					>
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
