<script>
	import { onDestroy, onMount } from 'svelte';
	import isContentEditorLoaded from 'lib/stores/isContentEditorLoaded';
	export let section;
	export let page;
	import { EDITOR_URL } from 'lib/env';

	let iframeEl;

	import { browser } from '$app/environment';

	if (browser) {
		onMount(() => {
			window.addEventListener('message', ({ data: { name, data } }) => {
				if (data.sectionId !== section.id) {
					return;
				}

				if (name === 'editor.value:updated') {
					let { json } = data;

					section.editorValue = {
						json
					};
				} else if (name === 'editor:onPageLoaded') {
					setTimeout(() => {
						iframeEl.contentWindow.postMessage(
							{
								name: 'editor:setValue',
								data: {
									json: section.editorValue?.json,
									theme: (page.parentPage || page).theme
								}
							},
							'*'
						);
						$isContentEditorLoaded = true;
					}, 10);
				} else if (name === 'editor:onResized') {
					iframeEl.height = data.height;
				}
			});
		});
	}

	onDestroy(() => {
		$isContentEditorLoaded = false;
	});
</script>

<div class=" w-full h-full">
	<iframe
		src="{EDITOR_URL}?sectionId={section.id}"
		class="bg-background"
		bind:this={iframeEl}
		style="
	width: 100%;
	z-index: 1000;"
	/>
</div>
