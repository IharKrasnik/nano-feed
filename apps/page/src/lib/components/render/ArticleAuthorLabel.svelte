<script>
	export let page;
	let clazz = '';

	export { clazz as class };

	import moment from 'moment';
	import _ from 'lodash';
	import Avatar from 'lib/components/Avatar.svelte';

	export let isWithAuthor = true;
</script>

<div class="flex items-center {clazz}">
	{#if isWithAuthor}
		<Avatar user={page.creator} size="20px" class="mr-2" />
		<b class="mx-1">{page.creator?.fullName}</b>
		<div class="px-1 opacity-70">/</div>
	{/if}
	<div class="opacity-70">
		{moment(page.publishedOn || page.createdOn).format('MMM DD, YYYY')}
	</div>
</div>
