<script>
	export let data;
	import Feed from '$lib/components/Feed.svelte';
</script>

<!-- <svelte:head>
	<title>{data.ogTitle}</title>
	<meta name="title" content="{data.ogTitle}" />
	<meta name="description" content="{data.ogDescription}" />
	<meta name="og:description" content="{data.ogDescription}" />
</svelte:head> -->

<Feed ogTitle={data.ogTitle} ogDescription={data.ogDescription} />
