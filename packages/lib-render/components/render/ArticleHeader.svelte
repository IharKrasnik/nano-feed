<script>
	import moment from 'moment';
	import { get } from 'lib/api';

	import ContentEditableIf from 'lib/components/ContentEditableIf.svelte';
	import RenderSection from 'lib-render/components/render/Section.svelte';
	import Avatar from 'lib/components/Avatar.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';

	let clazz;
	export { clazz as class };

	export let page;
	export let isEdit;

	get(`pages/${page._id}/views`, {
		parentPageId: page?.parentPage?._id
	});
</script>

<div class="max-w-[1000px]  w-full">
	<div class="flex items-center my-4 mt-8 {clazz} w-full text-base">
		<Avatar user={page.author || page.creator} size="40px" class="mr-2" />
		<div class="mx-1">{(page.author || page.creator)?.fullName}</div>
		<div class="px-1 opacity-70">/</div>
		<div class="opacity-70">
			{moment(page.publishedOn || page.createdOn).format('MMM DD, YYYY')}
		</div>
	</div>
	<div class="flex items-center mt-4 mb-8 {clazz} w-full">
		<div class="opacity-70 flex items-center mt-2">
			<FeatherIcon size="15" class="mr-2" name="eye" theme={page.theme?.theme} />
			<div>
				{page.totalViewsCount || 0 + (page.initialViewsCount || 0)} views
			</div>
		</div>
	</div>
</div>
