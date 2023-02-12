<script>
	import { onMount } from 'svelte';

	import dayjs from 'dayjs';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import { GOOGLE_LOGIN_URL } from 'lib/env';
	import { get, post } from 'lib/api';
	import currentUser from 'lib/stores/currentuser';

	import SourceLogo from '$lib/components/SourceLogo.svelte';
	import FeedItemPreview from '$lib/components/FeedItemPreview.svelte';
	import Modal from 'lib/components/Modal.svelte';

	let isPreview = false;
	export let theme = 'dark';
	export let bgColor = '';
	export let hideLikes = false;

	export let feedItem = {};

	let clazz = '';
	export { clazz as class };

	let videoEl;

	onMount(() => {
		if (videoEl) {
			videoEl.play();
		}
	});

	const likeFeedItem = async (evt) => {
		if (!$currentUser) {
			return goto(GOOGLE_LOGIN_URL);
		}
		if (!feedItem.isLiked) {
			feedItem.isLiked = true;
			feedItem.likesCount++;

			await post(`feed/${feedItem._id}/like`);
		} else {
			feedItem.isLiked = false;
			feedItem.likesCount--;

			await post(`feed/${feedItem._id}/unlike`);
		}
	};

	const trackView = async (feedItem) => {
		post(`feed/${feedItem._id}/view`);
	};

	const showPreview = async (evt) => {
		isPreview = true;
	};
</script>

<Modal isShown={isPreview} onClosed={() => (isPreview = false)}>
	<FeedItemPreview {feedItem} />
</Modal>

<a
	class="{theme === 'dark'
		? '_dark'
		: '_light'}  _item _link mb-8 inline-block w-full relative {clazz}"
	style={bgColor ? `background-color: ${bgColor};` : ''}
	class:_release={feedItem.isRelease}
	href={feedItem.url}
	on:click={(e) => {
		if (!feedItem.url || ['youtube', 'loom'].includes(feedItem.source)) {
			showPreview();
			e.preventDefault();
		} else {
			trackView(feedItem);
		}
	}}
	target="_blank"
>
	<div class="relative">
		{#if feedItem.title}
			<div class="font-bold" href={feedItem.url}>{feedItem.title}</div>
			<hr class="my-4" />
		{/if}

		{#if feedItem.content}
			<div class="whitespace-pre-wrap" class:line-clamp-7={feedItem.content?.length > 240}>
				{feedItem.content}
			</div>
		{/if}

		{#if ['youtube'].includes(feedItem.source) && feedItem.url}
			{#if feedItem.attachments?.length}
				<div
					class="absolute"
					style="left: 50%; top: 50%; transform: translateX(-50%) translateY(-50%);"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						style="width: 80px; height: 80px;"
						height="800"
						width="1200"
						viewBox="-35.20005 -41.33325 305.0671 247.9995"
						><path
							d="M229.763 25.817c-2.699-10.162-10.65-18.165-20.748-20.881C190.716 0 117.333 0 117.333 0S43.951 0 25.651 4.936C15.553 7.652 7.6 15.655 4.903 25.817 0 44.236 0 82.667 0 82.667s0 38.429 4.903 56.85C7.6 149.68 15.553 157.681 25.65 160.4c18.3 4.934 91.682 4.934 91.682 4.934s73.383 0 91.682-4.934c10.098-2.718 18.049-10.72 20.748-20.882 4.904-18.421 4.904-56.85 4.904-56.85s0-38.431-4.904-56.85"
							fill="red"
						/><path d="M93.333 117.559l61.333-34.89-61.333-34.894z" fill="#fff" /></svg
					>
				</div>
			{:else}
				<iframe
					class="w-full mt-2 min-h-[300px] pointer-events-none"
					src="https://www.youtube.com/embed/{new URL(feedItem.url).searchParams.get('v')}"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				/>
			{/if}
		{/if}

		{#if feedItem.longContent || (['linkedin'].includes(feedItem.source) && !feedItem.isRelease)}
			<div class="flex justify-between opacity-50">
				<div>...</div>
				<div class="text-right">...see more</div>
			</div>
		{/if}

		{#if feedItem.attachments}
			<div class="mt-2">
				{#each feedItem.attachments as attachment}
					{#if attachment.type === 'image'}
						<img
							src={attachment.url}
							class="w-full "
							style="max-height: 300px; object-fit: cover;"
						/>
					{/if}
					{#if attachment.type === 'video'}
						<video
							src={attachment.url}
							style="width: 100%; max-height: 300px;"
							muted
							loop
							autoplay
							bind:this={videoEl}
						/>
					{/if}
				{/each}
			</div>
		{/if}

		<div class="my-4 flex items-center justify-between">
			<div class="flex items-center text-sm opacity-80">
				{#if feedItem.isRelease}
					<div class="mr-2">🚀</div>
				{/if}

				<div class="shrink-0">
					{#if $currentUser && ($currentUser.isAdmin || feedItem.creators.find((c) => c._id === $currentUser._id))}
						<a
							class="hover:underline opacity-90"
							href="/write?feedId={feedItem._id}"
							on:click|stopPropagation={() => {}}
						>
							{dayjs(new Date(feedItem.publishedOn || feedItem.createdOn)).format('MMM DD, YYYY')}
						</a>
					{:else}
						{dayjs(new Date(feedItem.publishedOn || feedItem.createdOn)).format('MMM DD, YYYY')}
					{/if}
				</div>

				<div class="mx-4">
					{#each (feedItem.projects || []).filter((p) => !p.isHub) as project}
						<a
							class="hover:underline mr-4 opacity-90"
							on:click|stopPropagation={() => {}}
							href="/{project.slug}"
						>
							<span style="color: {project.color};">#</span>
							{project.title}
						</a>
					{/each}
				</div>
			</div>

			<SourceLogo bind:source={feedItem.source} />
		</div>

		<hr class="my-4" />

		<div class="flex justify-between items-center">
			<div class="flex justify-between items-center">
				<div class="flex items-center">
					{#if feedItem?.creators}
						{#each feedItem.creators as creator, i}
							<a
								href="/@{creator.username}"
								class="shrink-0 w-[40px] mr-[-20px]"
								style="z-index: {100 - i};"
								on:click|stopPropagation={() => {}}
							>
								<img src={creator.avatarUrl} class="rounded-full w-[40px] h-[40px]" />
							</a>
						{/each}

						<div class="pl-4 text-sm ml-[20px]">
							{#each feedItem.creators as creator, i}
								<a
									href="/@{creator.username}"
									on:click|stopPropagation={() => {}}
									class="hover:underline">{creator.fullName}</a
								>{i !== feedItem.creators.length - 1 ? ', ' : ''}
							{/each}
						</div>
					{/if}
				</div>
			</div>

			{#if !hideLikes}
				<div class="flex">
					<div
						class="text-sm text-gray-400 mr-2 items-center justify-center flex items-center mr-4"
					>
						{feedItem.viewsCount || 0}

						<svg
							class="ml-1"
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							fill="rgba(255, 255, 255, .6)"
							height="15px"
							width="15px"
							version="1.1"
							viewBox="0 0 512 512"
							enable-background="new 0 0 512 512"
						>
							<g>
								<path
									d="m494.8,241.4l-50.6-49.4c-50.1-48.9-116.9-75.8-188.2-75.8s-138.1,26.9-188.2,75.8l-50.6,49.4c-11.3,12.3-4.3,25.4 0,29.2l50.6,49.4c50.1,48.9 116.9,75.8 188.2,75.8s138.1-26.9 188.2-75.8l50.6-49.4c4-3.8 11.7-16.4 0-29.2zm-238.8,84.4c-38.5,0-69.8-31.3-69.8-69.8 0-38.5 31.3-69.8 69.8-69.8 38.5,0 69.8,31.3 69.8,69.8 0,38.5-31.3,69.8-69.8,69.8zm-195.3-69.8l35.7-34.8c27-26.4 59.8-45.2 95.7-55.4-28.2,20.1-46.6,53-46.6,90.1 0,37.1 18.4,70.1 46.6,90.1-35.9-10.2-68.7-29-95.7-55.3l-35.7-34.7zm355,34.8c-27,26.3-59.8,45.1-95.7,55.3 28.2-20.1 46.6-53 46.6-90.1 0-37.2-18.4-70.1-46.6-90.1 35.9,10.2 68.7,29 95.7,55.4l35.6,34.8-35.6,34.7z"
								/>
							</g>
						</svg>
					</div>

					<div class="flex items-center {feedItem.isLiked ? 'text-[#ff3838]' : 'text-white'}">
						<div class="text-sm opacity-70">{feedItem.likesCount || 0}</div>

						{#if feedItem.isLiked}
							<div on:click|preventDefault|stopPropagation={likeFeedItem}>
								<svg
									class="cursor-pointer ml-2 hover:text-[#ff3838] w-[15px] h-[15px] opacity-80"
									xmlns="http://www.w3.org/2000/svg"
									xmlns:xlink="http://www.w3.org/1999/xlink"
									fill="#000000"
									height="800px"
									width="800px"
									version="1.1"
									id="Layer_1"
									viewBox="0 0 507.168 507.168"
									xml:space="preserve"
								>
									<g>
										<g>
											<path
												d="M368.804,38.31c-46.848,0-89.452,23.064-115.212,62.008C227.836,61.374,185.22,38.31,138.384,38.31    C62.08,38.31,0,100.402,0,176.738c0,69.304,43.66,141.764,126.264,209.576c62.048,50.924,124.96,81.84,125.592,82.144    c0.544,0.268,1.14,0.4,1.732,0.4s1.188-0.128,1.736-0.4c0.628-0.304,63.544-31.22,125.584-82.144    c82.604-67.808,126.26-140.268,126.26-209.576C507.172,100.402,445.1,38.31,368.804,38.31z"
												fill={feedItem.isLiked ? '#ff3838' : ''}
												stroke="white"
											/>
										</g>
									</g>
								</svg>
							</div>
						{/if}

						{#if !feedItem.isLiked}
							<div on:click|preventDefault|stopPropagation={likeFeedItem}>
								<svg
									class="svg-icon cursor-pointer ml-2 hover:text-[#ff3838] {feedItem.isLiked
										? ''
										: 'opacity-70 hover:opacity-100'}"
									xmlns="http://www.w3.org/2000/svg"
									style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
									viewBox="0 0 1024 1024"
									version="1.1"
									><path
										d="M526.464 159.573333C572.586667 113.472 631.893333 85.333333 704 85.333333c155.221333 0 277.333333 126.869333 277.333333 305.408 0 107.093333-52.693333 196.138667-150.016 292.202667-20.949333 20.693333-84.970667 79.317333-87.850666 82.090667-9.066667 8.618667-18.837333 17.557333-29.290667 26.773333a1554.282667 1554.282667 0 0 1-41.301333 35.114667c-29.866667 24.533333-61.76 49.237333-93.632 72.917333a2607.744 2607.744 0 0 1-42.688 31.061333 42.666667 42.666667 0 0 1-49.109334 0 2607.744 2607.744 0 0 1-42.709333-31.04 2444.010667 2444.010667 0 0 1-93.610667-72.938666 1554.282667 1554.282667 0 0 1-41.301333-35.114667c-10.453333-9.216-20.224-18.154667-29.290667-26.773333-2.88-2.773333-66.901333-61.418667-87.850666-82.090667C95.381333 586.88 42.666667 497.856 42.666667 390.741333 42.666667 212.181333 164.778667 85.333333 320 85.333333c72.106667 0 131.413333 28.117333 177.536 74.24 5.184 5.184 10.005333 10.368 14.464 15.488 4.48-5.12 9.28-10.304 14.464-15.466666z m1.898667 671.786667A2360.746667 2360.746667 0 0 0 618.666667 761.002667a1469.802667 1469.802667 0 0 0 39.04-33.173334c9.664-8.533333 18.645333-16.746667 26.88-24.576 3.989333-3.797333 67.2-61.717333 86.784-81.024C853.952 540.672 896 469.674667 896 390.741333 896 258.624 811.349333 170.666667 704 170.666667c-47.765333 0-86.144 18.197333-117.205333 49.258666a202.325333 202.325333 0 0 0-27.946667 35.029334 129.728 129.728 0 0 0-7.872 13.909333c-15.04 33.749333-62.933333 33.749333-77.952 0a129.728 129.728 0 0 0-7.850667-13.909333 202.325333 202.325333 0 0 0-27.968-35.029334C406.144 188.864 367.765333 170.666667 320 170.666667c-107.349333 0-192 87.957333-192 220.074666 0 78.933333 42.026667 149.930667 124.629333 231.466667 19.562667 19.328 82.794667 77.248 86.784 81.045333 8.234667 7.829333 17.216 16.042667 26.88 24.576 12.074667 10.666667 25.130667 21.76 39.04 33.173334a2360.746667 2360.746667 0 0 0 106.666667 82.410666c5.205333-3.818667 10.666667-7.829333 16.362667-12.053333z"
									/></svg
								>
							</div>
						{/if}
					</div>
				</div>
			{/if}
		</div>
	</div>
</a>

<style>
	._item {
		transition: all 0.08s linear;
		border: 1px rgba(255, 255, 255, 0.3) solid;
		border-radius: 15px;
		padding: 16px;
		z-index: 1000;
		color: white;
	}

	._item:not(._light) hr {
		opacity: 0.2;
	}

	._item._light {
		color: #222;
		border: 1px rgba(0, 0, 0, 0.2) solid;
	}

	._item._link {
		cursor: pointer;
	}

	._item._release {
		border-color: #d87712 !important;
		border-width: 1px;
	}

	._item._release:hover {
	}

	._item._link:hover {
		/* transform: scale(1.05); */
		background: rgba(255, 255, 255, 0.03);
		border: 1px rgba(255, 255, 255, 0.5) solid;
	}
</style>
