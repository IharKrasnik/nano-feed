<script>
	import moment from 'moment';
	import _ from 'lodash';
	import { get, post } from 'lib/api';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import Loader from 'lib/components/Loader.svelte';

	import allPages from 'lib-render/stores/allPages';
	import { showSuccessMessage, showErrorMessage } from 'lib/services/toast';

	import getPageCssStyles from 'lib-render/services/getPageCssStyles';
	import RenderSection from 'lib-render/components/render//Section.svelte';
	import { goto } from '$app/navigation';
	import subPages, { refreshSubPages } from 'lib/stores/subPages';
	import MomentumWidget from 'lib/components/MomentumWidget.svelte';
	import RenderServiceChat from 'lib-render/components/render/ServiceChat.svelte';
	import RenderMomentumCollection from 'lib-render/components/render/MomentumCollection.svelte';
	import PageContainer from 'lib-render/components/PageContainer.svelte';
	import knowledgeBaseProjects from 'lib-render/stores/knowledgeBaseProjects';

	export let page;
	export let selectedGrowthTab = 'dashboard';

	let selectedKBProject;

	let selectKbProject = (project) => {
		selectedKBProject = project;
		return '';
	};

	let cssVarStyles;
	let styles;

	let parentPage = page.parentPage ? $allPages.find((p) => p._id === page.parentPage._id) : page;

	$: if (page) {
		let res = getPageCssStyles(page);
		cssVarStyles = res.cssVarStyles;
		styles = res.styles;
		parentPage = page.parentPage ? $allPages.find((p) => p._id === page.parentPage._id) : page;

		if (parentPage.subscription?.plan === 'to_the_moon') {
			parentPage.subscription.plan = 'launch';
		}
	}

	let goalPercentage = 0;

	let pricingPage = null;
	let defaultPricingPage = null;

	let getPricingPage = async () => {
		pricingPage = await get(`pricing`);
		defaultPricingPage = _.cloneDeep(pricingPage);
	};

	let pricingStats = null;

	let getPricingStats = async () => {
		pricingStats = await get(`pricing/${parentPage._id}`);
	};

	getPricingPage();
	getPricingStats();
	let currentGoal = '';
	let goalCurrentValue = '';

	$: if (parentPage.totalUniqueViews < 100) {
		currentGoal = 'Get 100 views';
		goalPercentage = (parentPage.totalUniqueViews / 100) * 100;
		goalCurrentValue = `${parentPage.totalUniqueViews} views`;
	} else if (parentPage.totalSignupsCount < 10) {
		currentGoal = 'Get 10 signups';
		goalPercentage = (parentPage.totalSignupsCount / 10) * 100;
		goalCurrentValue = `${parentPage.totalSignupsCount} signups`;
	}

	let newMoment = {};

	let _pricingRefreshTimestamp = new Date();

	let updatePricingButtons = () => {
		pricingPage = _.cloneDeep(defaultPricingPage);
		_pricingRefreshTimestamp = new Date();
	};
</script>

<PageContainer class="min-h-screen p-8" bind:page>
	<div class="mx-auto">
		{#if selectedGrowthTab === 'dashboard'}
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
						style={parentPage.theme?.theme === 'dark'
							? 'background-color: rgba(255,255,255,.1);'
							: 'background-color: rgba(0,0,0,.1);'}
					>
						<div
							class="absolute left-0 top-0 h-full"
							style="{!goalPercentage || goalPercentage < 2
								? 'width: 2%;'
								: `width: ${goalPercentage}%;`} {parentPage.theme?.theme === 'dark'
								? 'background-color: rgba(255,255,255,.3);'
								: 'background-color: rgba(0,0,0,.3);'}"
						/>
						{goalCurrentValue}
					</div>
				</div>
			</div>
			<div>
				<div class="text-lg font-bold mb-2 opacity-90">Growth Dashboard</div>

				<div class="grid grid-cols-4 gap-2 mt-4">
					<div class="_section">
						<div class="text-2xl font-bold opacity-80">{parentPage.totalUniqueViews || 0}</div>
						<div class="">Unique Views</div>
					</div>
					<div class="_section">
						<div class="text-2xl font-bold opacity-80">
							{parentPage.totalUniqueClicksCount || 0}
						</div>
						<div class="">Clicks</div>
					</div>
					<div class="_section">
						<div class="text-2xl font-bold opacity-80">{parentPage.totalSignupsCount || 0}</div>
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
										<div>Custom subpages</div>
										<div>
											{pricingStats.subPages}/{pricingPage.limits.subPages[
												parentPage.subscription?.plan || 'free'
											]}
										</div>
									</div>
									<div class="w-full flex justify-between">
										<div>Blog Articles</div>
										<div>
											{pricingStats.articles}/{pricingPage.limits.articles[
												parentPage.subscription?.plan || 'free'
											]}
										</div>
									</div>
									<div class="w-full flex justify-between">
										<div>CMS Pages</div>
										<div>
											{pricingStats.cmsPages}/{pricingPage.limits.cmsPages[
												parentPage.subscription?.plan || 'free'
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
											parentPage.subscription?.plan || 'free'
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
												parentPage.subscription?.plan || 'free'
											]}
										</div>
									</div>
									<div class="w-full flex justify-between">
										<div>Feed Items</div>
										{pricingStats.feedItems}/{pricingPage.limits.feedItems[
											parentPage.subscription?.plan || 'free'
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

				{#key _pricingRefreshTimestamp}
					<RenderSection
						page={{ ...pricingPage, theme: parentPage.theme }}
						section={{
							...pricingPage.sections[0],
							columns: pricingPage.sections[0].items.length - 1,
							items: pricingPage.sections[0].items
								.filter((i) => i.pricing.amount > 0)
								.map((plan) => {
									plan.onUrlClick = async () => {
										let planName = plan.title.toLowerCase();

										let { url, isUpgraded, subscription } = await get('stripe/subscribe', {
											pageId: page.parentPage?._id || page._id,
											plan: planName
										});

										if (isUpgraded) {
											parentPage.subscription = {
												id: subscription.id,
												plan: planName,
												activatedOn: new Date()
											};

											showSuccessMessage(
												`You've upgraded ${parentPage.name} to ${plan.title} plan. Thank you!`
											);

											updatePricingButtons();
										} else if (url) {
											goto(url);
										}
									};

									if (parentPage.subscription && !parentPage.subscription.isStopped) {
										let subscriptionPlan = parentPage.subscription.plan;

										if (subscriptionPlan === plan.title.toLowerCase()) {
											if (!parentPage.subscription.cancelledOn) {
												plan.interactiveRenderType = 'link';
												plan.isUrlAlternative = true;
												plan.callToActionText = 'Cancel';
												plan.title += ' (Current Plan)';
												plan.url = '';

												plan.onUrlClick = async () => {
													await post(`stripe/cancel?pageId=${parentPage._id}`);
													parentPage.subscription.cancelledOn = new Date();
													showSuccessMessage(`Plan ${parentPage.subscription.plan} was cancelled.`);
													updatePricingButtons();
												};
											} else {
												let planName = plan.title;
												plan.interactiveRenderType = 'link';
												plan.title += ' (Current Plan)';
												plan.callToActionText = 'Reactivate';
												plan.url = '';
												plan.ctaExplainer = `Cancelled on ${moment(
													parentPage.subscription.cancelledOn
												).format('MMM DD')}`;

												plan.onUrlClick = async () => {
													await post(`stripe/reactivate?pageId=${parentPage._id}`);
													parentPage.subscription.cancelledOn = null;
													plan.callToActionText = '';

													showSuccessMessage(`Plan ${planName} was reactivated. Thank you!`);
													updatePricingButtons();
												};
											}
										} else if (subscriptionPlan === 'startup') {
											if (plan.title === 'Launch') {
												plan.callToActionText = 'Downgrade';
												plan.isUrlAlternative = true;
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
				{/key}
			{:else}
				<div class="flex justify-center my-8"><Loader /></div>
			{/if}
		{:else if selectedGrowthTab === 'create'}
			<MomentumWidget
				title="Publish Content & Grow"
				description="Share useful content about your product and journey. Create daily. Build trust and grow your metrics."
				placeholderContent={'test'}
				isCollapsed={false}
				bind:newMoment
				onSent={() => {}}
			/>
		{:else if selectedGrowthTab === 'knowledge-base'}
			<div class="_title text-3xl mb-4">Knowledge Base</div>
			{selectKbProject($knowledgeBaseProjects[0]) && ''}

			{#if $knowledgeBaseProjects}
				<div class="flex gap-2">
					{#each $knowledgeBaseProjects as knowledgeBaseProject (knowledgeBaseProject._id)}
						<div
							class="cursor-pointer px-3 py-1 text-sm opacity-80 rounded-full inline ring {page
								.parentPage?.theme?.theme || page.theme?.theme === 'dark'
								? 'ring-zinc-900'
								: 'ring-zinc-100'} bg-black"
							style={page.parentPage?.theme?.theme || page.theme?.theme === 'dark'
								? 'background: rgba(255,255,255,.1); border: 1px rgba(255, 255,255, .3) solid;'
								: 'background: rgba(0,0,0,.1); border: 1px rgba(0, 0, 0, .3) solid;'}
							on:click={() => selectKbProject(knowledgeBaseProject)}
							class:_selected={selectedKBProject?._id === knowledgeBaseProject._id}
						>
							{knowledgeBaseProject.title}
						</div>
					{/each}
				</div>

				{#if selectedKBProject}
					<div class="mt-8 mb-4">
						<div class="text-xl font-bold">{selectedKBProject.title}</div>
						<div class="text-lg _color-item-description">
							{selectedKBProject.description}
						</div>
					</div>

					{#key selectedKBProject?.slug}
						<RenderMomentumCollection
							page={{
								...page,
								theme: {
									...page.theme,
									containerWidth: '1200px'
								}
							}}
							section={{
								id: selectedKBProject.slug,
								streamSlug: selectedKBProject.slug,
								columns: 3,
								isMasonryGrid: true,
								isShowSource: true
							}}
						/>
					{/key}
				{/if}
			{/if}
		{/if}
	</div>
</PageContainer>
{#if selectedGrowthTab === 'boost'}{/if}

{#if selectedGrowthTab === 'knowledge-base'}{/if}
