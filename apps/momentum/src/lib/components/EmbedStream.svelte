<script>
	import iframeResize from 'iframe-resizer/js/iframeResizer';
	import { fly } from 'svelte/transition';
	import axios from 'axios';
	import { onMount } from 'svelte';

	import { STREAM_URL, WAVE_URL } from 'lib/env';

	import Highlight from 'lib/components/Highlight.svelte';
	import Browser from '$lib/components/Browser.svelte';
	import StreamCard from '$lib/components/StreamCard.svelte';

	import * as socketIoService from 'lib/socketIoService';

	export let project;
	export let creator;

	let shareUrl = `${STREAM_URL}/${project?.slug || `@${creator.username}`}`;

	let embedCode = `<script src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.min.js" integrity="sha512-dnvR4Aebv5bAtJxDunq3eE8puKAJrY9GBJYl9GC6lTOEC76s1dbDfJFcL9GyzpaDW4vlI/UjR8sKbc1j6Ynx6w==" crossorigin="anonymous" referrerpolicy="no-referrer"><\/script>
<script async src="https://wave.mmntm.build/wave.js"><\/script>
<iframe src="${shareUrl}/embed?isAutoConfig=true" onload="iFrameResize({}, '#momentum-feed')"  id="momentum-feed" style="width:100%; border: none;"><\/iframe>
`;

	let isJustCopied = false;

	let copyEmbedCode = () => {
		navigator.clipboard.writeText(embedCode);
		isJustCopied = true;
	};

	onMount(() => {
		iframeResize({}, '#iframeResize');

		socketIoService.on('project:embedded', (embeddedProject) => {
			if (embeddedProject._id === project._id) {
				project.embedConfig = embeddedProject.embedConfig;
			}
		});
	});

	let bgColorRGB = { r: 255, g: 255, b: 255, a: 1 };

	function rgba2hex(orig) {
		var a,
			isPercent,
			rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
			alpha = ((rgb && rgb[4]) || '').trim(),
			hex = rgb
				? (rgb[1] | (1 << 8)).toString(16).slice(1) +
				  (rgb[2] | (1 << 8)).toString(16).slice(1) +
				  (rgb[3] | (1 << 8)).toString(16).slice(1)
				: orig;

		if (alpha !== '') {
			a = alpha;
		} else {
			a = 1;
		}
		// multiply before convert to HEX
		a = ((a * 255) | (1 << 8)).toString(16).slice(1);
		hex = hex + a;

		return hex;
	}

	let isDarkColor = (c) => {
		c = rgba2hex(c);

		c = c.substring(1); // strip #
		let rgb = parseInt(c, 16); // convert rrggbb to decimal
		let r = (rgb >> 16) & 0xff; // extract red
		let g = (rgb >> 8) & 0xff; // extract green
		let b = (rgb >> 0) & 0xff; // extract blue

		let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

		if (luma < 40) {
			return false;
		}

		return true;
	};

	// import ColorPicker from 'svelte-awesome-color-picker';

	let rgb = { r: 255, g: 255, b: 255, a: 1 }; // or hsv or hex

	let formatRgba = (rgb) => `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`;

	// $: if (bgColorRGB) {
	// 	theme = isDarkColor(`${formatRgba(bgColorRGB)}`) ? 'light' : 'dark';
	// }
</script>

<!-- <div>
  <label>Stream URL</label>
  <input type="text" disabled value={shareUrl} />
</div> -->

<div class="">
	<div class="flex justify-between items-start w-full mb-2">
		<div>
			<h2>Embed Momentum Feed</h2>
			<h3 class="mb-2">Show the live content feed on your website.</h3>
		</div>
		<button class="small" on:click={copyEmbedCode}>
			{#if isJustCopied}
				✅ Copied
			{:else}
				{'</>'} Copy Embed Code
			{/if}
		</button>
	</div>

	{#if !project.embedConfig || project.embedConfig._isNew || isJustCopied}
		<div class="bg-zinc-900 p-8 rounded-xl">
			<h2 class="mb-2 text-base">Add the code below to your website</h2>

			{#if embedCode}
				<Highlight code={embedCode} />
			{/if}
			<div class="text-sm mt-2 opacity-80">
				You can customize settings once the feed is embedded.
			</div>
		</div>
	{/if}

	{#if project.embedConfig && !project.embedConfig._isNew}
		<div
			class="bg-zinc-900 rounded-lg p-4 mt-8 max-w-[350px] mx-auto"
			in:fly={{ y: 50 }}
			style="border: 1px rgba(255, 255, 255, .3) solid;"
		>
			<div class="text-sm font-bold mb-2">Columns</div>
			<div class="flex mt-2">
				<div
					class="cursor-pointer bg-black h-[37px] flex justify-center items-center rounded-xl mr-2"
					class:aspect-square={project.embedConfig.columns !== 1}
					class:px-4={project.embedConfig.columns === 1}
					on:click={() => (project.embedConfig.columns = 1)}
				>
					1
					{#if project.embedConfig.columns === 1}column{/if}
				</div>

				<div
					class="aspect-square cursor-pointer bg-black h-[37px] flex justify-center items-center rounded-xl mr-2"
					on:click={() => (project.embedConfig.columns = 2)}
					class:aspect-square={project.embedConfig.columns !== 2}
					class:px-4={project.embedConfig.columns === 2}
				>
					2
					{#if project.embedConfig.columns === 2}columns{/if}
				</div>

				<div
					class="aspect-square cursor-pointer bg-black h-[37px] flex justify-center items-center rounded-xl mr-2"
					class:aspect-square={project.embedConfig.columns !== 3}
					class:px-4={project.embedConfig.columns === 3}
					on:click={() => (project.embedConfig.columns = 3)}
				>
					3
					{#if project.embedConfig.columns === 3}columns{/if}
				</div>

				<div
					class="aspect-square cursor-pointer bg-black h-[37px] flex justify-center items-center rounded-xl mr-2"
					class:aspect-square={project.embedConfig.columns !== 4}
					class:px-4={project.embedConfig.columns === 4}
					on:click={() => (project.embedConfig.columns = 4)}
				>
					4
					{#if project.embedConfig.columns === 4}columns{/if}
				</div>
			</div>

			<div class="flex">
				<div>
					<div class="text-sm font-bold mb-2 mt-4">Posts Limit</div>
					<input class="small max-w-[100px]" type="number" bind:value={project.embedConfig.limit} />
				</div>
				<div class="ml-8">
					<div class="text-sm font-bold mb-2 mt-4">Background Color</div>
					<input
						class="small"
						type="text"
						bind:value={project.embedConfig.bgColor}
						placeholder="#ffffff"
					/>
				</div>
			</div>

			<!-- <ColorPicker bind:rgb={bgColorRGB} /> -->
		</div>
	{/if}

	<Browser bind:project bind:creator bind:embedConfig={project.embedConfig} />
</div>
