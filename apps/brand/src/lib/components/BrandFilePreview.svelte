<script>
	import { browser } from '$app/environment';
	import _ from 'lodash';

	export let file;
	export let brand;
	export let onClick = () => {};
	export let parentFile;

	if (parentFile) {
		file.size = file.size || _.cloneDeep(parentFile.size);
		file.theme = file.theme || _.cloneDeep(parentFile.theme);
	}

	import ImagePreview from './../../routes/doc.pdf/Image.svelte';

	let isMobile;

	if (browser && window.innerWidth) {
		isMobile = window.innerWidth < 600;
	}
</script>

<div
	class="transition"
	style="transform: scale({isMobile
		? '0.25'
		: '0.5'}); transform-origin: top left; max-height: {(file.size?.height || 1080) /
		(isMobile ? 4 : 2)}px;"
>
	{#key file}
		<ImagePreview isPreview={true} page={file} />
	{/key}
</div>
