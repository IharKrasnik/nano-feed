<script>
	export let backgroundImages = [];
	export let relativeTo;
	import RenderUrl from 'lib/components/RenderUrl.svelte';
</script>

{#each (backgroundImages || []).filter( (i) => (relativeTo ? i.relativeTo === relativeTo : true) ) as backgroundImage}
	<RenderUrl
		url={backgroundImage.url}
		class="absolute"
		style="z-index: -1; {backgroundImage.alignX === 'center'
			? `left: 50%;`
			: backgroundImage.alignX ||
			  'left'}: {backgroundImage.positionX}px; {backgroundImage.alignY === 'middle'
			? 'top: 50%;'
			: `${backgroundImage.alignY || 'top'}: ${
					backgroundImage.positionY
			  }px;`} {backgroundImage.width
			? `width: ${backgroundImage.width}px;`
			: ''} {backgroundImage.height ? `height: ${backgroundImage.height}px;` : ''}
			
			{backgroundImage.alignY === 'middle' && backgroundImage.alignX === 'center'
			? 'transform: translateX(-50%) translateY(-50%);'
			: backgroundImage.alignY === 'middle'
			? 'transform: translateY(-50%);'
			: backgroundImage.alignX === 'center'
			? 'transform: translateX(-50%);'
			: ''} {backgroundImage.style || ''}"
		imgClass="w-full h-full"
	/>
{/each}
