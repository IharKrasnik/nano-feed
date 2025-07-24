<script>
	import { onMount, onDestroy } from 'svelte';
	import { get } from 'lib/api';
	import { PULSE_API_URL } from 'lib/env';
	import { initRenderer } from '@paralect/pulse-renderer';
	import { browser } from '$app/environment';

	import striptags from 'striptags';

	export let page;
	export let isEdit;

	let pulseDocEl;
	let isLoading = false;

	let getPulseDoc = async () => {
		if (page.metadata.pulseDocId) {
			isLoading = true;
			pulseDocEl.innerHTML = '';
			let pulseDoc = await get(`${PULSE_API_URL}/public/docs/${page.metadata.pulseDocId}`);
			page.metadata = { ...(page.metadata || {}), pulseDoc };
			initRenderer(pulseDocEl, { ...page.metadata.pulseDoc, title: undefined });

			page.name = striptags(page.metadata.pulseDoc.title);
			page.heros = [
				{
					id: 'pulse_hero',
					title: page.metadata.pulseDoc.title,
					subtitle: page.metadata.pulseDoc.description,
					demoUrl: page.metadata.pulseDoc.imageUrl,
					theme: { isVertical: true }
				}
			];

			page.activeHero = page.heros[0];
			page.isDirty = true;

			isLoading = false;
		}
	};

	let handleVisibilityChange = () => {
		if (!document.hidden) {
			getPulseDoc();
		}
	};

	$: if (!page.metadata?.pulseDoc && !isLoading) {
		getPulseDoc();
	}

	if (browser) {
		if (isEdit) {
			onMount(() => {
				getPulseDoc();
				document.addEventListener('visibilitychange', handleVisibilityChange);
			});

			onDestroy(() => {
				document.removeEventListener('visibilitychange', handleVisibilityChange);
			});
		} else {
			setTimeout(() => {
				initRenderer(pulseDocEl, { ...page.metadata.pulseDoc, title: undefined });
			}, 0);
		}
	}
</script>

{#if page.metadata?.pulseDocId}
	<div class="px-4 sm:px-0" bind:this={pulseDocEl} />
{/if}
