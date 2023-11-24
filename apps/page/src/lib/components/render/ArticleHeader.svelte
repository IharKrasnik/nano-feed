<script>
	import moment from 'moment';
	import ContentEditableIf from 'lib/components/ContentEditableIf.svelte';
	import RenderSection from '$lib/components/render/Section.svelte';
	import Avatar from 'lib/components/Avatar.svelte';

	let clazz;
	export { clazz as class };

	export let page;
	export let isEdit;
</script>

<div class="max-w-[712px] mx-auto w-full">
	<div class="flex items-center my-8 {clazz} w-full">
		<Avatar user={page.creator} size="20px" class="mr-2" />
		<b class="mx-1">{page.creator?.fullName}</b>
		<div class="px-1 opacity-70">/</div>
		<div class="opacity-70">
			{moment(page.publishedOn || page.createdOn).format('MMM DD, YYYY')}
		</div>
	</div>
</div>
