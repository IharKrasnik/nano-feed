<script>
	import Button from 'lib/components/Button.svelte';
	import CodeMirror from '$lib/components/edit/CodeMirror.svelte';
	import parseQuery from 'lib/helpers/parseQuery';
	import { get, post } from 'lib/api';
	import SitePreview from 'lib-render/components/SitePreview.svelte';
	import currentPage from 'lib-render/stores/currentPage';

	export let section;

	export let url;

	export let onSave;
	export let onCancel = () => {};

	let code;

	let defaultSectionCode = `
<script>
	export let page; 
	export let section; 
<\/script>

This is custom svelte section

<div class="flex flex-col gap-y-2 mb-4">
	<div class="text-3xl bold">{section.title || ''}</div>
	<div>{section.description || ''}</div>
<\/div>

<div class="flex items-center">
	{#each (section.items || []) as sectionItem}
		{sectionItem.title}
	{/each}	
<\/div>
			`;

	let defaultUrlCode = `
<script>
	let clickCount = 0;
<\/script>

<div class="w-full p-4 flex flex-col items-center justify-center">
	<button on:click={() => {
		clickCount +=1;	
	}}>
		Click me!
	<\/button>

	<div>You clicked {clickCount} times.{clickCount > 0 ? ' Nice!': ''}</div>
<\/div>
			`;

	let init = async () => {
		let componentId = parseQuery(url || section?.theme?.codeMediaUrl)?.id;
		if (componentId) {
			const { content } = await get(
				`https://hive-668803db944bc2001292526f.paralect.co/svelte/components/${componentId}`
			);

			code = content;
		} else {
			code = section ? defaultSectionCode : defaultUrlCode;
		}
	};

	let componentName =
		(url ? parseQuery(url)?.componentName : section?.theme?.componentName) || 'HelloWorld';

	let build = async () => {
		const { buildUrl, id } = await post(
			'https://hive-668803db944bc2001292526f.paralect.co/svelte/iife',
			{
				componentName,
				code
			}
		);

		url = `$svelte?buildJsSrc=${encodeURIComponent(
			buildUrl
		)}&id=${id}&componentName=${componentName}`;

		if (section) {
			section.theme.codeMediaUrl = url;
			section.theme.componentName = componentName;
		}
	};

	init();
</script>

<div class="w-full grid grid-cols-2 min-h-[600px] ">
	<div class="w-full h-full flex flex-col justify-between bg-[#faf8f5]">
		<CodeMirror language="svelte" bind:value={code} />

		<div class="flex w-full items-center justify-between">
			<div class="mt-4 flex gap-x-2 items-center bg-white p-4">
				<Button class="_primary" onClick={build}>Build</Button>

				<input type="text" placeholder="CoolComponent" bind:value={componentName} />
			</div>
			{#if onSave}
				<div class="flex items-center">
					<Button class="_primary" onClick={() => onSave(url)}>Save</Button>
					<Button class="_secondary" onClick={onCancel}>Cancel</Button>
				</div>
			{/if}
		</div>
	</div>

	<div
		class="w-full"
		style="background-color: {$currentPage
			? ($currentPage.parentPage || $currentPage).theme.bgColor
			: 'transparent'}"
	>
		{#key url || section?.theme?.codeMediaUrl}
			<div class="max-h-[600px] overflow-y-auto">
				<SitePreview
					isEmbed
					isNoBadge
					isNoHero
					isNoHeaderFooter
					isEdit={false}
					page={{
						...($currentPage || { theme: {} }),
						heros: [],
						sections: [
							{
								id: url,
								imageUrl: url
							}
						]
					}}
				/>
			</div>
		{/key}
	</div>
</div>
