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
				style="font-family: 'Chillax'; line-height: 25.6px; margin-bottom: 10px; color: #111111;"
			>
				{feedItem.title}
			</div>
		{/if}

		<div class="text-[16px] whitespace-pre-wrap" style="line-height: 25.6px; color: #474747;">
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
				src={feedItem.creators[0].avatarUrl}
				class="rounded-full"
				style="width: 55px; height: 55px; filter: grayscale(100%); border: 2px black solid;"
			/>
			<div class="ml-[15px]">
				<div style="color: #333333; font-size: 18px; font-weight: bold;">
					{feedItem.creators.map((c) => c.fullName.split(' ')[0]).join(', ')}
				</div>
				{#if feedItem.creators[0].twitterUsername}
					<div style="color: #999999; letter-spacing: -0.7px; font-size: 16px;">
						{#each feedItem.creators as creator}
							@{creator.twitterUsername} &nbsp;
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	._root {
		font-family: 'Gilroy';
		margin-bottom: 20px;
		break-inside: avoid;
		color: rgb(71, 71, 71);
		-webkit-column-break-inside: avoid;
	}
</style>
