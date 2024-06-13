<script>
	export let page;
	export let author;
	export let publishedOn;

	let clazz = '';

	export { clazz as class };

	import moment from 'moment';
	import _ from 'lodash';
	import Avatar from 'lib/components/Avatar.svelte';

	export let isWithAuthor = true;
</script>

<div class={clazz.includes('flex') ? clazz : 'flex items-center'}>
	{#if isWithAuthor}
		<Avatar user={author || page.author || page.creator} size="36px" class="mr-2" />
		<div class="mx-1">{(author || page.author || page.creator).fullName}</div>
		<div class="px-1 opacity-70">/</div>
	{/if}
	<div class="opacity-70">
		{moment(publishedOn || page.publishedOn || page.createdOn).format('MMM DD, YYYY')}
	</div>
</div>
