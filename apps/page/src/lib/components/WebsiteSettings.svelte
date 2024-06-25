<script>
	import { get, put, del } from 'lib/api';
	import currentUser from 'lib/stores/currentUser';
	import Button from 'lib/components/Button.svelte';

	import EditDomains from '$lib/components/settings/Domains.svelte';
	import EditEditors from '$lib/components/settings/Editors.svelte';
	import EditGlobalCode from '$lib/components/settings/GlobalCode.svelte';
	import EditClaimCode from '$lib/components/settings/ClaimCode.svelte';
	import { showSuccessMessage, showErrorMessage } from 'lib/services/toast';

	import PageBadge from '$lib/components/PageBadge.svelte';
	import WaveIndicator from 'lib/components/wave/WaveIndicator.svelte';

	import selectedSettingsTab from '$lib/stores/selectedSettingsTab';

	export let page;
	export let onDeleted;

	let parentPage = page.parentPage || page;

	let subscribe = async () => {
		$selectedSettingsTab = 'plans';
	};

	let deletePage = async () => {
		await del(`pages/${page._id}`);
		onDeleted();
	};

	let hideBadge = async () => {
		await put(`pages/${page._id}/settings`, {
			fieldName: 'isNoBadge',
			value: { value: true }
		});

		parentPage.isNoBadge = true;

		showSuccessMessage('Momentum badge is hidden now');
	};

	let showBadge = async () => {
		await put(`pages/${page._id}/settings`, {
			fieldName: 'isNoBadge',
			value: { value: false }
		});
		parentPage.isNoBadge = false;

		showSuccessMessage('Momentum badge is shown now');
	};

	let makeAnalyticsPrivate = async () => {
		await put(`pages/${page._id}/settings`, {
			fieldName: 'isAnalyticsHidden',
			value: { value: true }
		});

		parentPage.isAnalyticsHidden = true;

		showSuccessMessage('Your web analytics is private now.');
	};

	let makeAnalyticsPublic = async () => {
		await put(`pages/${page._id}/settings`, {
			fieldName: 'isAnalyticsHidden',
			value: { value: false }
		});

		parentPage.isAnalyticsHidden = false;

		showSuccessMessage('Your web analytics is public now.');
	};

	let isDeleteIntent = false;
</script>

<div class="_editor">
	<h2 class="text-xl font-bold mb-1">Website Settings</h2>
	<div class="mt-1 text-lg opacity-70 mb-4">
		{parentPage.name}
	</div>

	<!-- 	

	<div class="font-bold text-lg">Your Plan</div>

	<div class="my-4 mb-8">
		{#if page.subscription?.plan}
			<div>To The Moon</div>
		{:else}
			<div>Build In Public</div>
			<Button class="_primary mt-4" onClick={subscribe}>Upgrade</Button>
		{/if}
	</div> -->

	<hr class="my-8 border-[#8B786D] opacity-30" />
	<EditDomains bind:page />

	<hr class="my-8 border-[#8B786D] opacity-30" />
	<EditGlobalCode bind:page />

	<hr class="my-8 border-[#8B786D] opacity-30" />
	<EditEditors bind:page />

	<!-- <hr class="my-8 border-[#8B786D] opacity-30" /> -->

	<!-- <EditCustomCode bind:page /> -->

	<hr class="my-8 border-[#8B786D] opacity-30" />

	<div>
		<div class="flex justify-between w-full">
			<div>
				<h3 class="text-xl font-bold mb-2">Momentum Badge</h3>
				<div class="mb-4">Show the branded Momentum badge on your page</div>
			</div>
			{#if parentPage.isNoBadge}
				<div class="flex flex-col items-end">
					<Button class="_primary _small" onClick={showBadge}>Show Badge</Button>
					<div class="mt-1 opacity-80 text-right text-sm">The badge is hidden now</div>
				</div>
			{:else if parentPage.subscription && !parentPage.subscription.isStopped}
				<div class="flex flex-col items-end">
					<div>
						<Button class="_primary _small" onClick={hideBadge}>Hide Badge</Button>
					</div>
					<div class="mt-1 opacity-80 text-right text-sm">The badge is shown now</div>
				</div>
			{:else}
				<div>
					<Button class="_primary _small _green" onClick={subscribe}
						>⚡️ Upgrade to Hide badge</Button
					>
					<div class="mt-1 opacity-80 text-right text-sm">Paid plan is required</div>
				</div>
			{/if}
		</div>
		<div class="bg-zinc-700 p-4">
			<div class="my-4"><PageBadge isFixed={false} /></div>
		</div>
	</div>

	<hr class="my-8 border-[#8B786D] opacity-30" />

	<div>
		<div class="flex justify-between w-full">
			<div>
				<h3 class="text-xl font-bold mb-2">Web Analytics</h3>
				<div class="mb-4">Publish your analytics for Momentum community</div>
			</div>

			{#if parentPage.isAnalyticsHidden}
				<div class="flex flex-col items-end">
					<Button class="_primary _small" onClick={makeAnalyticsPublic}>Make Public</Button>
					<div class="mt-1 opacity-80 text-right text-sm">Your analytics is private now</div>
				</div>
			{:else if parentPage.subscription && !parentPage.subscription.isStopped}
				<div class="flex flex-col items-end">
					<div>
						<Button class="_primary _small" onClick={makeAnalyticsPrivate}>Make Private</Button>
					</div>
					<div class="mt-1 opacity-80 text-right text-sm">Your analytics is public now</div>
				</div>
			{:else}
				<div>
					<Button class="_primary _green _small" onClick={subscribe}
						>⚡️ Upgrade to Make Private</Button
					>
					<div class="mt-1 opacity-80 text-right text-sm">Paid plan is required</div>
				</div>
			{/if}
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
							page,
							statsCache: page.statsCache
						}}
					/>
				</div>
			</div>
		</div>
	</div>

	<hr class="my-8 border-[#8B786D] opacity-30" />

	<EditClaimCode bind:page />
	<!-- 
	<hr class="my-8 border-[#8B786D] opacity-30" />

	<div>
		<div class="flex justify-between w-full">
			<div>
				<h3 class="text-xl font-bold mb-2">😱 Danger Zone</h3>
				<div class="mb-4">You scrolled too far, well...</div>
			</div>

			<div />
		</div>

		{#if isDeleteIntent}
			<Button class="_primary _small _red" onClick={deletePage}>
				😱 I am sure, delete {page.name} forever</Button
			>
		{:else}
			<Button class="_primary _small _red" onClick={() => (isDeleteIntent = true)}
				>🙈 Delete {page.name}</Button
			>
		{/if}
	</div> -->
</div>
