<script>
	import _ from 'lodash';
	import { fly } from 'svelte/transition';

	import Feed from '$lib/components/Feed.svelte';

	import currentUser from '$lib/stores/currentUser'; 
	
	import { page } from '$app/stores'
</script>

<svelte:head>
	<title>Paralect's Momentum</title>
	<meta name="description" content="Paralect's Momentum" />
</svelte:head>

<Feed />