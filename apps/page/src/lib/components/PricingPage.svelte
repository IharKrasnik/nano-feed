<script>
	import moment from 'moment';
	import _ from 'lodash';
	import { get, post } from 'lib/api';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import Loader from 'lib/components/Loader.svelte';

	import allPages from 'lib-render/stores/allPages';
	import { showSuccessMessage, showErrorMessage } from 'lib/services/toast';

	import RenderSection from 'lib-render/components/render//Section.svelte';
	import { goto } from '$app/navigation';
	import subPages, { refreshSubPages } from 'lib/stores/subPages';
	import MomentumWidget from 'lib/components/MomentumWidget.svelte';
	import RenderServiceChat from 'lib-render/components/render/ServiceChat.svelte';
	import RenderMomentumCollection from 'lib-render/components/render/MomentumCollection.svelte';
	import knowledgeBaseProjects from 'lib/stores/knowledgeBaseProjects';

	import pricingPage from '$lib/stores/pricingPage';

	export let page;

	let selectedKBProject;

	let selectKbProject = (project) => {
		selectedKBProject = project;
		return '';
	};

	let parentPage = page.parentPage ? $allPages.find((p) => p._id === page.parentPage._id) : page;

	$: if (page) {
		parentPage = page.parentPage ? $allPages.find((p) => p._id === page.parentPage._id) : page;

		if (parentPage.subscription?.plan === 'to_the_moon') {
			parentPage.subscription.plan = 'launch';
		}
	}

	let goalPercentage = 0;

	let newMoment = {};

	let _pricingRefreshTimestamp = new Date();

	let _pricingPage;

	if ($pricingPage && !_pricingPage) {
		_pricingPage = _.cloneDeep($pricingPage);
	}

	let updatePricingButtons = () => {
		_pricingPage = _.cloneDeep($pricingPage);
		_pricingRefreshTimestamp = new Date();
	};
</script>

{#if _pricingPage}
	{#key _pricingRefreshTimestamp}
		<RenderSection
			page={{ ..._pricingPage, theme: parentPage.theme }}
			section={{
				..._pricingPage.sections[0],
				columns: _pricingPage.sections[0].items.length - 1,
				items: _pricingPage.sections[0].items
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
				title: 'Upgrade Momentum Website',
				description: ''
			}}
		/>
	{/key}
{/if}
