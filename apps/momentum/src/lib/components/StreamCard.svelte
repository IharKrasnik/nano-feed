<script>
	import Modal from 'lib/components/Modal.svelte';
	import { browser } from '$app/environment';
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import SourceLogo from '$lib/components/SourceLogo.svelte';
	import { post } from 'lib/api';
	import { onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	import currentUser from 'lib/stores/currentUser';
	import WaveIndicator from '$lib/components/WaveIndicator.svelte';

	import _ from 'lodash';

	export let project;
	export let creators;

	export let stream;

	export let isEditable;

	export let creator;

	export let isIncludeChart = false;
	export let isIncludeGoal = false;

	export let isWithDescription = false;

	export let isLink = false;

	let shuffledCreators = [];

	let shuffleCreators = () => (shuffledCreators = _.shuffle(creators));

	let isPitchOpen = false;

	$: if (creators?.length) {
		shuffleCreators();
	}

	const shuffleInterval = setInterval(() => {
		shuffleCreators();
	}, 10000);

	onDestroy(() => {
		clearInterval(shuffleInterval);
	});

	let upvote = async () => {
		await post(`projects/${stream._id}/upvotes`, {
			fingerprint: window.WAVE_FINGERPRINT
		});

		stream.isUpvoted = true;
	};

	stream.isUpvoted =
		browser &&
		stream.upvotes &&
		stream.upvotes.filter((u) => u.fingerprint === window.WAVE_FINGERPRINT).length;
</script>

{#if isPitchOpen}
	<Modal
		isShown={isPitchOpen}
		onClosed={() => {
			isPitchOpen = false;
		}}
	>
		<RenderUrl url={stream.pitchUrl} />
	</Modal>
{/if}

<div>
	{#if stream}
		{#if isIncludeChart}
			<WaveIndicator
				class="my-4"
				isUseCache={true}
				isChart={false}
				timeframe="7_days"
				project={stream}
			/>
		{/if}

		<a
			href={isEditable &&
			stream._id &&
			($currentUser?.isAdmin ||
				stream.creator?._id === $currentUser?._id ||
				stream._id === $currentUser?._id)
				? `/${stream.slug || '@' + stream.username}/edit`
				: isLink
				? `/${stream.slug}`
				: ''}
		>
			<div
				class="_project mb-8 rounded-xl {stream?._id || stream?.creator?._id ? 'bg-[#111]' : ''}"
			>
				<!-- <img src="https://assets.website-files.com/636cf54cf20a6ac090f7deb0/63773738962ed74d59268fbc_open-graph.png" class="w-full rounded-xl"/> -->

				{#if stream.bannerUrl}
					<div class="relative">
						{#if stream.bannerUrl.includes('.mov') || stream.bannerUrl.includes('.mp4')}
							<video
								autoplay
								muted
								src={stream.bannerUrl}
								class="w-full rounded-xl max-h-[180px] object-cover"
								style="border-bottom-left-radius: 0px; border-bottom-right-radius: 0px;"
							/>
						{:else}
							<img
								src={stream.bannerUrl}
								class="w-full rounded-xl max-h-[180px] object-cover"
								style="border-bottom-left-radius: 0px; border-bottom-right-radius: 0px;"
							/>
						{/if}
					</div>
				{/if}

				{#if stream.avatarUrl || stream.logoUrl}
					<div class="ml-4 {stream.bannerUrl ? 'mt-[-30px]' : 'pt-4'}">
						<img src={stream.avatarUrl || stream.logoUrl} class="w-[60px] h-[60px] rounded-full" />
					</div>
				{/if}

				<div class="p-4">
					<div class="text-lg font-bold">
						{stream.title || stream.fullName}
					</div>

					{#if stream.description && isWithDescription}
						<div class="text-lg whitespace-pre-wrap mb-2">
							{stream.description}
						</div>
						<hr class="my-4" style="border: .5px rgba(255, 255, 255, .2) solid;" />
					{/if}

					{#if stream.longDescription}
						<div class="whitespace-pre-wrap">
							{stream.longDescription}
						</div>
					{/if}

					<div class="flex justify-between items-center opacity-80 mt-2">
						<div class="text-sm font-normal w-full overflow-hidden text-ellipsis">
							{#if stream.url}
								<svg
									class="inline w-[10px] h-[10px] text-gray-500"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									style="&#10;    stroke: white;&#10;"
									><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline
										points="15 3 21 3 21 9"
									/><line x1="10" y1="14" x2="21" y2="3" /></svg
								>
								<a href={stream.url} target="_blank">
									{stream.url.replace('https://', '').replace('http://', '')}</a
								>
							{/if}
						</div>

						{#if stream.links?.length}
							<div class="flex items-center my-2">
								{#each stream.links as link}
									<a href={link.url} target="_blank" class="ml-2">
										<SourceLogo source={link.source} />
									</a>
								{/each}
							</div>
						{/if}
					</div>

					{#if creators}
						<div class="w-full mt-4">
							<label class="font-bold block">
								Creators
								{#if creators?.length}
									<span class="number-tag">
										{creators.length}
									</span>
								{/if}
							</label>

							{#key shuffledCreators}
								{#if shuffledCreators.length}
									<a
										class="_creators w-full mt-2 flex"
										class:justify-between={shuffledCreators.length > 7}
										href="/creators"
										in:fade={{ duration: 200 }}
									>
										{#each shuffledCreators.slice(0, 7) as creator}
											<img
												src={creator.avatarUrl}
												class="w-[35px] h-[35px] inline rounded-full mr-[-10px]"
											/>
										{/each}
									</a>
								{/if}
							{/key}
						</div>
					{/if}
					{#if stream._id}
						<div class="mt-4">
							{#if stream.isUpvoted}
								<div class="text-center">✅ {stream?.upvotes?.length || 1} upvotes</div>
							{:else}
								<button
									class="small w-full"
									style="background-color: rgb(121, 0, 217);"
									on:click|stopPropagation|preventDefault={upvote}>🔥 Upvote {stream.title}</button
								>
							{/if}
						</div>
					{/if}
				</div>
			</div>
		</a>

		{#if isIncludeGoal && stream.goal}
			<div class="mt-2 p-4 text-center rounded-xl bg-zinc-900 rounded-2xl">
				🎯 {stream.goal}
			</div>
		{/if}

		{#if stream.pitchUrl}
			<div
				class="cursor-pointer w-full my-4"
				on:click={() => {
					isPitchOpen = true;
				}}
			>
				<div style="pointer-events: none;">
					<RenderUrl url={stream.pitchUrl} imgClass="max-h-[200px]" />
				</div>
			</div>
		{/if}
	{/if}
</div>

<style>
	._project {
		outline: 2px rgba(255, 255, 255, 0.1) solid;
		transition: all 0.08s linear;
	}

	._project:hover {
		/* transform: scale(1.05); */
		background: #101010;
		outline: 1px rgba(255, 255, 255, 0.3) solid;
	}

	._creators {
		transition: all linear 0.1s;
		border-radius: 8px;
		padding: 16px 0;
	}

	._creators:hover {
		background: rgba(255, 255, 255, 0.1);
		padding: 16px 32px;
	}
</style>
