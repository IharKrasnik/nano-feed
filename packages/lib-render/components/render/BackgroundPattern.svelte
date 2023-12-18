<script>
	export let theme;
	export let accentColor;
	export let bgPattern;
	export let bgGradient = null;
</script>

{#if bgPattern === 'squares'}
	<div
		class="bg-root absolute z-10 inset-0 -z-50 h-full w-full bg-[linear-gradient(to_right,{theme ===
		'dark'
			? '#ffffff'
			: '#000000'}12_1px,transparent_1px),linear-gradient(to_bottom,{theme === 'dark'
			? '#ffffff'
			: '#000000'}12_1px,transparent_1px)] [background-size:80px_80px] {bgGradient?.type ===
			'ray' || bgGradient?.type === 'cobalt'
			? '[mask-image:radial-gradient(75%_50%_at_top_center,white,transparent)]'
			: ''}"
	/>
{:else}
	<div
		class="bg-root absolute z-10 inset-0 -z-50 h-full w-full pattern-{bgPattern} {theme === 'dark'
			? 'pattern-white pattern-bg-black pattern-opacity-10'
			: 'pattern-black pattern-bg-white'} 
								{bgPattern === 'wavy' ? 'pattern-size-8' : 'pattern-size-4'} {bgGradient?.type === 'cobalt'
			? '[mask-image:radial-gradient(75%_50%_at_top_center,white,transparent)]'
			: ''}
								{bgGradient?.type === 'ray'
			? '[mask-image:radial-gradient(50%_70%_at_top_center,white,transparent)]'
			: ''}
								{bgGradient?.type === 'radial'
			? '[mask-image:radial-gradient(50%_80%_at_top_center,white,transparent)]'
			: ''}
								"
		style="--pattern-color: {accentColor};
								--pattern-color-55: {accentColor}55;
								--pattern-color-77: {accentColor}77;"
	/>
{/if}
