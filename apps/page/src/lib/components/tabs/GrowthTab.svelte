<script>
	import { get } from 'lib/api';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import Loader from 'lib/components/Loader.svelte';

	import getPageCssStyles from '$lib/services/getPageCssStyles';
	import RenderSection from '$lib/components/render/Section.svelte';
	import { goto } from '$app/navigation';
	import subPages, { refreshSubPages } from 'lib/stores/subPages';

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

	let pricingStats = null;

	let getPricingStats = async () => {
		pricingStats = await get(`pricing/${page._id}`);
	};

	getPricingPage();
	getPricingStats();
	let currentGoal = '';
	let goalCurrentValue = '';

	$: if (page.totalUniqueViews < 100) {
		currentGoal = 'Get 100 views';
		goalPercentage = (page.totalUniqueViews / 100) * 100;
		goalCurrentValue = `${page.totalUniqueViews} views`;
	} else if (page.totalSignupsCount < 10) {
		currentGoal = 'Get 10 signups';
		goalPercentage = (page.totalSignupsCount / 10) * 100;
		goalCurrentValue = `${page.totalSignupsCount} signups`;
	}
</script>

<div class="p-8 bg-background" style={cssVarStyles}>
	<div class="max-w-[900px] mx-auto">
		<div class="mb-8">
			<div class="text-lg font-bold mb-2 opacity-90">Current Goal</div>
			<div class="_section">
				<div class="flex justify-between items-center mb-2">
					<div class="flex items-center font-bold text-lg w-full">Get 100 views</div>
					<!-- <FeatherIcon class="mr-2" theme={page.theme?.theme || 'light'} name="target" size="20" /> -->
					<div class="text-sm shrink-0 text-right"><b>Next:</b> get 10 signups</div>
				</div>
				<div
					class="relative overflow-hidden p-2 rounded-lg border"
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
					{goalCurrentValue}
				</div>
			</div>
		</div>

		{#if selectedGrowthTab === 'dashboard'}
			<div>
				<div class="text-lg font-bold mb-2 opacity-90">Growth Dashboard</div>

				<div class="grid grid-cols-4 gap-2 mt-4">
					<div class="_section">
						<div class="text-2xl font-bold opacity-80">{page.totalUniqueViews || 0}</div>
						<div class="">Unique Views</div>
					</div>
					<div class="_section">
						<div class="text-2xl font-bold opacity-80">{page.totalUniqueClicksCount || 0}</div>
						<div class="">Clicks</div>
					</div>
					<div class="_section">
						<div class="text-2xl font-bold opacity-80">{page.totalSignupsCount || 0}</div>
						<div class="">Signups</div>
					</div>
					<div class="_section opacity-50">
						<div class="text-2xl font-bold opacity-80">$0</div>
						<div class="">Total Revenue</div>
					</div>
					<div class="_section">
						<div class="text-2xl font-bold opacity-80">
							{$subPages?.filter((sp) => sp.renderType !== 'article').length}
						</div>

						<div class="">Total Subpages</div>
					</div>
					<div class="_section">
						<div class="text-2xl font-bold opacity-80">
							{$subPages?.filter((sp) => sp.renderType === 'article').length}
						</div>

						<div class="">Total Articles</div>
					</div>

					<div class="_section">
						<div class="text-2xl font-bold opacity-80">
							{pricingStats ? pricingStats?.totalEmailsCount : ' '}
						</div>

						<div class="">Total Emails Sent</div>
					</div>

					<div class="_section">
						<div class="text-2xl font-bold opacity-80">
							{pricingStats ? pricingStats?.totalDatabaseCount : ' '}
						</div>

						<div class="">Total Database Items</div>
					</div>
				</div>
			</div>

			{#if pricingPage && pricingStats}
				<div class="mt-8">
					<div class="text-lg font-bold mb-4 opacity-90">Momentum Usage</div>

					<div class="grid grid-cols-3 gap-4">
						<div>
							<div class="text-sm font-bold mb-2 opacity-80">Pages</div>
							<div class="_section w-full">
								<div class="flex flex-col w-full gap-2">
									<div class="w-full flex justify-between">
										<div>Subpages</div>
										<div>
											{pricingStats.subPages}/{pricingPage.limits.subPages[
												page.subscription?.plan || 'free'
											]}
										</div>
									</div>
									<div class="w-full flex justify-between">
										<div>Blog Articles</div>
										<div>
											{pricingStats.articles}/{pricingPage.limits.articles[
												page.subscription?.plan || 'free'
											]}
										</div>
									</div>
									<div class="w-full flex justify-between">
										<div>CMS Pages</div>
										<div>
											{pricingStats.cmsPages}/{pricingPage.limits.cmsPages[
												page.subscription?.plan || 'free'
											]}
										</div>
									</div>
								</div>
							</div>
						</div>
						<div>
							<div class="text-sm font-bold mb-2 opacity-80">Emails (per month)</div>
							<div class="_section w-full">
								<div class="flex flex-col w-full gap-2">
									<div class="w-full flex justify-between">
										<div>Emails Sent</div>
										{pricingStats.totalEmailsMonthly}/{pricingPage.limits.totalEmailsMonthly[
											page.subscription?.plan || 'free'
										]}
									</div>
									<hr class="opacity-50" />
									<div class="w-full flex justify-between">
										<div>Automated Emails</div>
										<div>{pricingStats.emails.totalAutoCount}</div>
									</div>
									<div class="w-full flex justify-between">
										<div>Manual Emails</div>
										<div>{pricingStats.emails.totalManualCount}</div>
									</div>
									<div class="w-full flex justify-between">
										<div>Newsletter Emails</div>
										<div>{pricingStats.emails.totalBroadcastCount}</div>
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
										<div>
											{pricingStats.databaseItems}/{pricingPage.limits.databaseItems[
												page.subscription?.plan || 'free'
											]}
										</div>
									</div>
									<div class="w-full flex justify-between">
										<div>Feed Items</div>
										{pricingStats.feedItems}/{pricingPage.limits.feedItems[
											page.subscription?.plan || 'free'
										]}
									</div>
									<div class="w-full flex justify-between">
										<div>Changelog Updates</div>
										<div>{pricingStats.changelogItems}/∞</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
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
			{:else}
				<div class="flex justify-center my-8"><Loader /></div>
			{/if}
		{/if}
	</div>
</div>
