<script>
	import iframeResize from 'iframe-resizer/js/iframeResizer';

	import axios from 'axios';
	import _ from 'lodash';
	import { onMount } from 'svelte';
	import { STREAM_URL, PAGE_URL } from 'lib/env';
	import FeedItem from '$lib/components/FeedItem.svelte';
	import slug from 'slug';

	let clazz = '';

	export { clazz as class };
	export let browserClass = 'p-4';
	export let onClose;
	export let fullscreenUrl = { STREAM_URL };

	export let bgColor = '#fafafa';
	export let theme = 'light';
	export let url;
	export let favicon;
	export let title;
</script>

<div
	class="relative mt-4 mb-16 {clazz} rounded-xl max-h-[800px] overflow-y-scroll"
	style="background-color:{bgColor === 'transparent' || bgColor === 'rgba(255, 255, 255, 0)'
		? '#fafafa'
		: bgColor};"
>
	<div
		class="sticky z-30 h-[40px] bg-[#676869] w-full top-0 left-0 flex items-center rounded-tl-xl rounded-tr-xl"
	>
		<div class="absolute top-0 left-[15px] flex z-10 h-full flex items-center">
			<div
				class="cursor-pointer w-[10px] h-[10px] bg-[#fe6152] rounded-full mr-2"
				on:click={onClose}
			/>
			<div
				class="cursor-pointer w-[10px] h-[10px] bg-[#ffbe2d] rounded-full mr-2"
				on:click={onClose}
			/>
			<a href={fullscreenUrl} target="_blank">
				<div class="w-[10px] h-[10px] bg-[#27ca42] rounded-full mr-2" />
			</a>
		</div>
		<div class="w-full flex justify-center items-center">
			<div
				class="text-black w-[300px] bg-white h-[20px] rounded-2xl flex justify-center items-center text-black text-xs"
			>
				{url}
			</div>
		</div>
	</div>

	<div class="p-4 pt-8">
		{#if title}
			<div class="w-full overflow-hidden mt-8">
				<div
					class:text-black={theme === 'light'}
					class="flex items-center justify-center text-2xs mb-4"
				>
					{#if favicon}
						{#if favicon?.startsWith('http') || favicon?.startsWith('//')}
							<img class="max-w-[15px] mr-2" src={favicon} />
						{:else}
							{favicon}
						{/if}
					{/if}
					{title}
				</div>
			</div>
		{/if}
	</div>

	<div class={browserClass} class:text-black={theme === 'light'}>
		<slot />
	</div>
</div>
