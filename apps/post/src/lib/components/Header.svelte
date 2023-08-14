<script>
	import Emoji from 'lib/components/Emoji.svelte';
	import { fly, fade, slide } from 'svelte/transition';
	import { page } from '$app/stores';
	import styles from '$lib/stores/styles';
	import isCustomDomain from '$lib/stores/isCustomDomain';

	let clazz;
	export { clazz as class };

	export let blog;
	export let isSubmitted;
	export let onButtonClick;

	let scrollY;
</script>

<svelte:window bind:scrollY />

<div style={$styles.css}>
	<div
		class="fixed top-0 z-40 bg-site w-full ${clazz}"
		in:fly={{ y: -150, duration: 150, delay: 150 }}
		out:fade={{ duration: 150, delay: 150 }}
	>
		<div class="flex w-full justify-between items-center max-w-[1080px] left-0 mx-auto p-4">
			<a class="flex items-center shrink-0" href={$isCustomDomain ? '/' : `/${blog.slug}`}>
				<Emoji class="mr-2" emoji={blog.logo} />
				<span class="font-bold  ">
					{blog.name}
				</span>
				{#if scrollY > 30}
					<div class="ml-4 opacity-70 hidden sm:block" in:fade>
						{@html blog.title}
					</div>
				{/if}
			</a>

			<div class="shrink-0">
				{#if scrollY > 30}
					{#if !isSubmitted}
						{#if blog.isCollectEmails}
							<button
								class="cursor-pointer"
								style="border: 2px rgba(255, 255, 255, .8) solid;"
								on:click={onButtonClick}>{blog.callToAction}</button
							>
						{:else}
							<a href={blog.actionUrl} target="_blank" class="button">
								{blog.callToAction}
							</a>
						{/if}
					{/if}
				{/if}
			</div>
		</div>

		<hr class="border-[#8B786D] opacity-30 w-full" />
	</div>
</div>

<style src="./app-site.css"></style>
