<script>
	import { get, post } from 'lib/api';
	import currentUser from 'lib/stores/currentUser';
	import Button from 'lib/components/Button.svelte';
	import EditDomains from '$lib/components/settings/Domains.svelte';
	import EditOpenGraph from '$lib/components/settings/OpenGraph.svelte';
	import EditCustomCode from '$lib/components/settings/CustomCode.svelte';
	import PostBadge from '$lib/components/PostBadge.svelte';
	import WaveIndicator from 'lib/components/wave/WaveIndicator.svelte';

	export let blog;

	let subscribe = async () => {
		let { url } = await get('stripe/subscribe', { blogId: blog._id });
		window.location.href = url;
	};
</script>

<div>
	<h2 class="text-2xl font-bold mb-2">Settings</h2>
	<div class="mb-4">Customize your blog 🤌</div>
	<hr class="my-8 border-[#8B786D] opacity-30" />

	<div class="font-bold text-lg">Your Plan</div>

	<div class="my-4 mb-8">
		{#if blog.subscription?.plan}
			<div>To The Moon</div>
		{:else}
			<div>Build In Public</div>
			<Button class="_primary mt-4" onClick={subscribe}>Upgrade</Button>
		{/if}
	</div>

	<EditOpenGraph bind:blog />
	<hr class="my-8 border-[#8B786D] opacity-30" />
	<EditDomains bind:blog />

	<hr class="my-8 border-[#8B786D] opacity-30" />

	<EditCustomCode bind:blog />

	<hr class="my-8 border-[#8B786D] opacity-30" />

	<div>
		<div class="flex justify-between w-full">
			<div>
				<h3 class="text-xl font-bold mb-2">Momentum Badge</h3>
				<div class="mb-4">Show the branded Momentum badge on your blog</div>
			</div>
			<div>
				<Button class="_primary _small _green" onClick={subscribe}>⚡️ Hide Badge</Button>
			</div>
		</div>
		<div class="bg-zinc-700 p-4">
			<div class="my-4"><PostBadge isFixed={false} /></div>
		</div>
	</div>

	<hr class="my-8 border-[#8B786D] opacity-30" />

	<div>
		<div class="flex justify-between w-full">
			<div>
				<h3 class="text-xl font-bold mb-2">Web Analytics</h3>
				<div class="mb-4">Publish your analytics for Momentum community</div>
			</div>

			<div>
				<Button class="_primary _small _green" onClick={subscribe}>⚡️ Make Private</Button>
			</div>
		</div>

		<div class="text-sm mb-4">
			Share your knowledge, help other founders and build your product in public. <br />
			Momentum goal is to empower founders by sharing details about your startup. <br />

			We'll never share email addresses or your customers private data. <br />
		</div>

		<div class="bg-zinc-700 p-4">
			<div class="my-4">
				<div class=" w-full my-4">
					<WaveIndicator
						class="w-full _section text-white"
						pageTitle="Your public analytics"
						pageSubtitle="This data is available to founders from Momentum community"
						isUseCache={true}
						isChart={false}
						timeframe="7_days"
						isNoTimeframeLabel
						project={{
							blog,
							statsCache: blog.statsCache
						}}
					/>
				</div>
			</div>
		</div>
	</div>
</div>
