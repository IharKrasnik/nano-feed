<script>
	import Avatar from 'lib/components/Avatar.svelte';
	import Twitter from 'lib/icons/twitter.svelte';
	export let feedItem;
</script>

<h3 class="text-2xl font-bold flex items-center">
	{feedItem.title}
	{#if feedItem.twitterData}
		<a
			class="block ml-2"
			href="https://twitter.com/nano_fund/status/{feedItem.twitterData.id}"
			target="_blank"
		>
			<div class="w-[25px]">
				<Twitter />
			</div>
		</a>
	{/if}
</h3>

<div class="mt-4 whitespace-pre-wrap text-lg opacity-70">
	{feedItem.content.replace('Report #buildinpublic', '')}
</div>

{#if feedItem.attachments && feedItem.attachments[0] && feedItem.attachments[0].url}
	<img class="w-full my-4 rounded-xs" src={feedItem.attachments[0].url} />
{/if}

{#if feedItem.creator}
	<a class="block mt-4 flex" href="@{feedItem.creator.username}">
		<Avatar class="mr-2" user={feedItem.creator} />
		<div class="opacity-60">
			@{feedItem.creator?.username}
		</div>
	</a>
{/if}

<img
	class="max-w-[150px] mx-auto my-4"
	src="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1693763239679-image.png"
/>
