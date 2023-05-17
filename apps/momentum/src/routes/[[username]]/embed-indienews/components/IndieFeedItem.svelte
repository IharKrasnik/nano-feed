<script>
	import { getNextColor } from '../stores/nextColor';

	export let feedItem;
</script>

<div class="_root w-full">
	<div
		class="p-[30px]"
		style="background-color: {getNextColor()}; color: #111; border-radius: 20px;"
	>
		{#if feedItem.title}
			<div
				class="text-[24px]"
				style=" font-family: 'Chillax'; line-height: 1.4em; margin-bottom: 24px;"
			>
				{feedItem.title}
			</div>
		{/if}

		<div class="text-[16px] whitespace-pre-wrap" style="line-height: 1.4em;">
			{feedItem.content}
		</div>

		{#if feedItem.attachments?.length}
			<img
				class="w-full object-cover"
				style="border-radius: 15px; max-height: 120px; margin: 24px 0; "
				alt="image"
				src={feedItem.attachments[0].url}
			/>
		{/if}

		<div class="flex" style="margin-top: 30px;">
			<img
				src={feedItem.creator.avatarUrl}
				class="rounded-full"
				style="width: 55px; height: 55px; filter: grayscale(100%); border: 2px black solid;"
			/>
			<div class="ml-[15px]">
				<div style="font-size: 18px; font-weight: bold;">
					{feedItem.creator.fullName.split(' ')[0]}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	._root {
		font-family: 'Gilroy';
	}
</style>
