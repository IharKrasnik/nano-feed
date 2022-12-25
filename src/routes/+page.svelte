<script>
	import FeedItem from '$lib/components/feed-item.svelte';
	import feed from '$lib/stores/feed';

</script>

<svelte:head>
	<title>🪚 Nano Feed</title>
	<meta name="description" content="Nano feed" />
</svelte:head>

<div class="container mx-auto p-8 max-w-[600px]">

	<section>
		<h1 class="text-xl font-bold mb-4">Nano Feed</h1>
	</section>

	{#each $feed as feedItem}
		<FeedItem feedItem={feedItem}></FeedItem>
	{/each}
</div>


<style>
	
</style>
