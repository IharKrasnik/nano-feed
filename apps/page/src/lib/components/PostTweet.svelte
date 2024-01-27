<script>
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import { get, postFile } from 'lib/api';
	import placeholder from 'lib/use/placeholder';
	import currentUser from 'lib/stores/currentUser';
	import contenteditable from 'lib/use/contenteditable';
	import striptags from 'striptags';

	export let post;
	export let page;
	export let onAddPostBelow = () => {};

	let parentPage = page.parentPage || page;

	let msgLength;

	$: msgLength = striptags(post.content || '').length || 0;
</script>

<div class="flex items-start w-full">
	<div>
		<img
			src={$currentUser.twitterData.profile_image_url}
			class="w-[48px] h-[48px] shrink-0 rounded-full object-cover"
		/>
	</div>
	<div class=" ml-3 w-full">
		<div class="flex items-center">
			<div class="font-semibold">
				{$currentUser.twitterData.name}
			</div>
			<div class="opacity-50 ml-2">
				@{$currentUser.twitterData.username}
			</div>
		</div>
		<div
			class="w-full min-h-[40px]"
			bind:innerHTML={post.content}
			use:contenteditable
			use:placeholder={'Empty tweet...'}
			contenteditable
		/>
		{#if post.attachments?.length}
			<RenderUrl class="w-full object-cover rounded my-2" url={post.attachments[0].url} />
		{/if}
	</div>
</div>
<div class="w-full justify-end flex gap-3">
	<div class="text-sm">
		{msgLength} / 280
	</div>
	<div class="transition cursor-pointer opacity-60 hover:opacity-100">
		<label for="new-file-{post.id}" class="cursor-pointer opacity-70 hover:opacity-100">
			<FeatherIcon size={18} name="image" theme={parentPage?.theme?.theme} />

			<input
				id="new-file-{post.id}"
				type="file"
				on:change={async (e) => {
					let file = await postFile('files', (e.target?.files || e.detail?.files)[0]);

					post.attachments = [file];
				}}
				hidden
			/>
		</label>
	</div>
	<div class="transition cursor-pointer opacity-60 hover:opacity-100" on:click={onAddPostBelow}>
		<FeatherIcon size={18} name="plus" theme={parentPage?.theme?.theme} />
	</div>
</div>
