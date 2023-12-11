<script>
	import { get } from 'lib/api';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import getPageCssStyles from '$lib/services/getPageCssStyles';
	import RenderSection from '$lib/components/render/Section.svelte';
	import { goto } from '$app/navigation';

	export let page;
	export let selectedGrowthTab = 'dashboard';

	let cssVarStyles;
	let styles;

	$: if (page) {
		let res = getPageCssStyles(page);
		cssVarStyles = res.cssVarStyles;
		styles = res.styles;
	}

	let goalPercentage = 0;

	let pricingPage = null;

	let getPricingPage = async () => {
		pricingPage = await get(`pricing`);
	};

	getPricingPage();
</script>

<div class="max-w-[900px] m-8 p-8 mx-auto bg-background" style={cssVarStyles}>
	<div class="mb-8">
		<div class="text-lg font-bold mb-2 opacity-90">Current Goal</div>
		<div class="_section">
			<div class="flex justify-between items-center mb-2">
				<div class="flex items-center font-bold text-lg w-full">Get 100 views</div>
				<!-- <FeatherIcon class="mr-2" theme={page.theme?.theme || 'light'} name="target" size="20" /> -->
				<div class="text-sm shrink-0 text-right"><b>Next:</b> get 10 conversions</div>
			</div>
			<div
				class="relative p-2 rounded-lg border"
				style={page.theme?.theme === 'dark'
					? 'background-color: rgba(255,255,255,.1);'
					: 'background-color: rgba(0,0,0,.1);'}
			>
				<div
					class="absolute left-0 top-0 h-full"
					style="{!goalPercentage || goalPercentage < 2
						? 'width: 2%;'
						: `width: ${goalPercentage}%;`} {page.theme?.theme === 'dark'
						? 'background-color: rgba(255,255,255,.3);'
						: 'background-color: rgba(0,0,0,.3);'}"
				/>
				2 views
			</div>
		</div>
	</div>

	{#if selectedGrowthTab === 'dashboard'}
		<div>
			<div class="text-lg font-bold mb-2 opacity-90">Growth Dashboard</div>

			<div class="grid grid-cols-4 gap-2 mt-4">
				<div class="_section">
					<div class="text-2xl font-bold opacity-80">100</div>
					<div class="">Unique Views</div>
				</div>
				<div class="_section">
					<div class="text-2xl font-bold opacity-80">50</div>
					<div class="">Clicks</div>
				</div>
				<div class="_section">
					<div class="text-2xl font-bold opacity-80">20</div>
					<div class="">Signups</div>
				</div>
				<div class="_section">
					<div class="text-2xl font-bold opacity-80">$0</div>
					<div class="">Total Revenue</div>
				</div>
			</div>
		</div>

		<div class="mt-8">
			<div class="text-lg font-bold mb-2 opacity-90">Momentum Usage</div>

			<div class="grid grid-cols-3 gap-4">
				<div>
					<div class="text-sm font-bold mb-2 opacity-80">Pages</div>
					<div class="_section w-full">
						<div class="flex flex-col w-full gap-2">
							<div class="w-full flex justify-between">
								<div>Subpages</div>
								<div>0/1</div>
							</div>
							<div class="w-full flex justify-between">
								<div>Blog Articles</div>
								<div>0/1</div>
							</div>
							<div class="w-full flex justify-between">
								<div>CMS Pages</div>
								<div>0/1</div>
							</div>
						</div>
					</div>
				</div>
				<div>
					<div class="text-sm font-bold mb-2 opacity-80">Databases</div>
					<div class="_section w-full">
						<div class="flex flex-col w-full gap-2">
							<div class="w-full flex justify-between">
								<div>Database Items</div>
								<div>0/3</div>
							</div>
							<div class="w-full flex justify-between">
								<div>Feed Items</div>
								<div>0/10</div>
							</div>
							<div class="w-full flex justify-between">
								<div>Changelog Updates</div>
								<div>0</div>
							</div>
						</div>
					</div>
				</div>
				<div>
					<div class="text-sm font-bold mb-2 opacity-80">Emails</div>
					<div class="_section w-full">
						<div class="flex flex-col w-full gap-2">
							<div class="w-full flex justify-between">
								<div>Automated Emails</div>
								<div>0/100</div>
							</div>
							<div class="w-full flex justify-between">
								<div>Manual Emails</div>
								<div>0/10</div>
							</div>
							<div class="w-full flex justify-between">
								<div>Newsletter Emails</div>
								<div>0/300</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		{#if pricingPage}
			<RenderSection
				page={{ ...pricingPage, theme: page.theme }}
				section={{
					...pricingPage.sections[0],
					columns: pricingPage.sections[0].items.length - 1,
					items: pricingPage.sections[0].items
						.filter((i) => i.pricing.amount > 0)
						.map((plan) => {
							plan.onUrlClick = async () => {
								let { url } = await get('stripe/subscribe', {
									pageId: page.parentPage?._id || page._id,
									plan: plan.title.toLowerCase()
								});
								goto(url);
							};

							let subscriptionPlan = page.subscription?.plan;

							if (subscriptionPlan) {
								if (subscriptionPlan === 'launch' && plan.title === 'Launch') {
									plan.interactiveRenderType = null;
								} else if (subscriptionPlan === 'startup') {
									if (plan.title === 'Launch') {
										plan.callToActionText = 'Downgrade';
									} else if (plan.title === 'Startup') {
										plan.interactiveRenderType = null;
									}
								} else {
									plan.callToActionText = 'Upgrade';
								}
							} else {
								plan.callToActionText = 'Upgrade';
							}

							return plan;
						}),
					title: 'Upgrade',
					description: ''
				}}
			/>
		{/if}
	{/if}
</div>
