<script>
	import moment from 'moment';
	import ContentEditableIf from 'lib/components/ContentEditableIf.svelte';
	import RenderSection from '$lib/components/render/Section.svelte';
	import Avatar from 'lib/components/Avatar.svelte';

	export let page;
	export let isEdit;
</script>

<div class="max-w-[768px] sm:px-16 mx-auto">
	<ContentEditableIf class="text-3xl font-bold" bind:innerHTML={page.title} condition={isEdit} />
	<ContentEditableIf class="text-lg mt-4" bind:innerHTML={page.subtitle} condition={isEdit} />

	<div class="flex items-center my-8">
		<Avatar user={page.creator} size="20px" class="mr-2" />
		<b class="mx-1">{page.creator?.fullName}</b>
		<div class="px-1 opacity-70">/</div>
		<div class="opacity-70">
			{moment(page.publishedOn || page.createdOn).format('MMM DD, YYYY')}
		</div>
	</div>
</div>
