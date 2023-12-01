<script>
	import _ from 'lodash';
	import { isDev } from 'lib/env';
	import moment from 'moment-timezone';
	import { browser } from '$app/environment';
	import { onDestroy } from 'svelte';
	import { ConfettiExplosion } from 'svelte-confetti-explosion';
	import { onMount } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';
	import { slide, fly, scale, fade } from 'svelte/transition';
	import autofocus from 'lib/use/autofocus';
	import { goto } from '$app/navigation';
	import { page as sveltePage } from '$app/stores';

	import { GOOGLE_LOGIN_URL, PAGE_URL, STREAM_URL } from 'lib/env';

	import { get, post, put } from 'lib/api';

	import loginWithGoogle from 'lib/helpers/loginWithGoogle';

	import EditHero from '$lib/components/edit/Hero.svelte';
	import EditSection from '$lib/components/edit/Section.svelte';
	import EditFAQ from '$lib/components/edit/FAQ.svelte';
	import EditPricing from '$lib/components/edit/Pricing.svelte';
	import EditWelcomeEmail from '$lib/components/edit/WelcomeEmail.svelte';
	import EditNewsletter from '$lib/components/edit/Newsletter.svelte';
	import EditTestimonials from '$lib/components/edit/Testimonials.svelte';
	import EditPost from 'lib/components/post/EditPost.svelte';
	import EditInteractiveOptions from '$lib/components/edit/InteractiveOptions.svelte';

	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import PostPreview from 'lib/components/post/PostPreview.svelte';
	import Modal from 'lib/components/Modal.svelte';
	import BackArrowSvg from '$lib/icons/BackArrow.svelte';

	import Button from 'lib/components/Button.svelte';
	import Loader from 'lib/components/Loader.svelte';
	import WaveSingleStat from 'lib/components/wave/SingleStat.svelte';
	import BackTo from '$lib/components/BackTo.svelte';
	import FileInput from 'lib/components/FileInput.svelte';
	import MomentumHub from 'lib/components/MomentumHub.svelte';
	import SupportTwitter from 'lib/components/SupportTwitter.svelte';

	import contenteditable from 'lib/use/contenteditable';

	import SitePreview from '$lib/components/site-preview.svelte';

	import AnalyticsTab from '$lib/components/tabs/AnalyticsTab.svelte';
	import MessagingTab from '$lib/components/tabs/MessagingTab.svelte';
	import AudienceTab from '$lib/components/tabs/AudienceTab.svelte';
	import NewsletterTab from '$lib/components/tabs/NewsletterTab.svelte';
	import DatabaseTab from '$lib/components/tabs/DatabaseTab.svelte';
	import BlogTab from '$lib/components/tabs/BlogTab.svelte';

	import SignupForm from '$lib/components/signup-form.svelte';

	import EmojiPicker from 'lib/components/EmojiPicker.svelte';
	import ColorPicker from '$lib/components/ColorPicker.svelte';
	import BrowserFrame from 'lib/components/BrowserFrame.svelte';
	import MomentumWidget from '$lib/components/MomentumWidget.svelte';
	import Settings from '$lib/components/Settings.svelte';
	import EditDatabase from '$lib/components/edit/Database.svelte';
	import EditCustomers from '$lib/components/edit/Customers.svelte';
	import EditSubmissions from '$lib/components/edit/Submissions.svelte';
	import EditMessaging from '$lib/components/edit/Messaging.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';

	import { showSuccessMessage, showErrorMessage } from 'lib/services/toast';

	import tooltip from 'lib/use/tooltip';
	import clickOutside from 'lib/use/clickOutside';

	import currentUser from 'lib/stores/currentUser';
	import allPages from '$lib/stores/allPages';
	import isPageSet from '$lib/stores/isPageSet';
	import pageDraft from '$lib/stores/pageDraft';
	import postDraft from 'lib/stores/postDraft';
	import sectionToEdit from '$lib/stores/sectionToEdit';
	import aboveTheFoldEl from '$lib/stores/aboveTheFoldEl';
	import subPages, { refreshSubPages } from 'lib/stores/subPages';
	import childStreams, { refreshChildStreams } from 'lib/stores/childStreams';
	import heatmap from '$lib/stores/heatmap';

	//
	onMount(async () => {
		await import('emoji-picker-element/svelte');
	});

	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';

	const flipDurationMs = 300;

	let submissions;
	let metrics;

	function handleDndConsider(e) {
		page.sections = e.detail.items;
	}

	function handleDndFinalize(e) {
		page.sections = e.detail.items;
	}

	let isLoading = false;
	let isSignupFormShown = false;
	let isJustPaid;

	if ($sveltePage.url.searchParams.get('thank-you')) {
		isJustPaid = true;
	}

	let defaultPage = {
		_id: undefined,
		name: '',
		heros: [
			{
				title: '',
				subtitle: '',
				interactiveRenderType: 'email',
				callToActionText: 'Join Waitlist',
				theme: {}
			}
		],
		slug: '_new',
		welcomeEmail: null
	};

	let page = { ..._.cloneDeep($pageDraft['_new'] || defaultPage) };

	let pageSlug = '_new';
	let selectedTab = 'editor';

	let conversions;

	let isShowHeatmap = false;

	let refreshHeatmap = async () => {
		$heatmap = await get(`pages/${page._id}/heatmap`);
		isShowHeatmap = true;
	};

	let refreshPageConversionStats = async () => {
		if (!page.parentPage?._id && !page._id) {
			return;
		}

		let endpointName = isDev
			? `pages/${page._id}/conversions`
			: `pages/${page._id}/conversions-optimised`;

		let stats = await get(endpointName, {
			...(page.parentPage ? { parentPageId: page.parentPage._id } : {})
		});

		page.totalUniqueViews = stats.totalVisitorsCount;
		page.totalUniqueClicksCount = stats.uniqueClicksCount;
		page.totalSignupsCount = stats.totalSubmissionsCount;

		conversions = {
			clicks: page.totalUniqueViews
				? ((page.totalUniqueClicksCount / page.totalUniqueViews) * 100).toFixed(2)
				: 0,
			forms: page.totalUniqueViews
				? ((page.totalSignupsCount / page.totalUniqueViews) * 100).toFixed(2)
				: 0
		};
	};

	let addDefaultHero = () => {
		page.heros = [
			{
				id: uuidv4(),
				isHidden: false,
				renderType: 'default',

				title: page.title,
				subtitle: page.subtitle,
				demoUrl: page.demoUrl,

				interactiveRenderType: page.interactiveRenderType,

				callToActionText: page.callToAction,
				ctaExplainer: page.ctaExplainer,

				url: page.url,
				actionUrl: page.actionUrl,
				isUrlButton: page.isUrlButton,

				url2: page.url2,
				isUrl2Button: page.isUrl2Button,

				bgImageUrl: page.theme?.heroBgImage,

				theme: {
					isLeft: page.theme?.isHeroLeft,
					isVertical: page.theme?.isHeroVertical,
					isHuge: page.theme?.isHugeTitle
				}
			}
		];
	};

	//

	let setPageAndDraft = (p, { force = false } = {}) => {
		page = { ..._.cloneDeep(p) };

		if (
			!force &&
			$pageDraft[page._id] &&
			new Date(page.updatedOn) < new Date($pageDraft[page._id].updatedOn)
		) {
			page = { ..._.cloneDeep($pageDraft[page._id]), totalSignupsCount: page.totalSignupsCount };
		} else {
			$pageDraft = {
				..._.cloneDeep($pageDraft),
				[page.slug]: { ..._.cloneDeep(page) },
				[page._id]: { ..._.cloneDeep(page) }
			};
		}

		pageSlug = page.slug;

		$pageDraft = { ...$pageDraft, lastPageSlug: page.slug, lastPageId: page._id };

		selectedTab = 'editor';

		if (!page.heros) {
			page.heros = [];
		}

		if (!page.parentPage && !page.heros) {
			addDefaultHero();
		}

		page.activeHero = page.heros[0];

		refreshPageConversionStats();
		refreshSubPages({ page });
		refreshChildStreams({ page });
	};

	let addNewHero = () => {
		let newHero = { ..._.last(page.heros.find((h) => !h.isHidden)) };

		newHero.id = uuidv4();
		newHero.isCollapsed = false;

		page.heros = [...page.heros, newHero];
	};

	if ($pageDraft.lastPageSlug && $pageDraft[$pageDraft.lastPageId]) {
		$isPageSet = true;

		setPageAndDraft({ ..._.cloneDeep($pageDraft[$pageDraft.lastPageId]) });

		// refreshData();
	}

	$: if (!$isPageSet && $allPages?.length && !page?._id) {
		setPageAndDraft({ ..._.cloneDeep($allPages[0]) });

		// refreshData();
		$isPageSet = true;
	}

	let isJustPublished = false;

	let isJustCreated = false;

	let isTutorialShown = false;

	let isBrandNameEdit = false;

	const publishPage = async () => {
		// if (!$currentUser) {
		// 	$pageDraft = { ..._.cloneDeep($pageDraft), _new: page };
		// 	isSignupFormShown = true;
		// 	return;
		// }
		if (!page.isInDir) {
			page.dirName = null;
		}

		let isNewPage = !page._id;

		if (isNewPage) {
			if (page.isUseDatabase) {
				if (newStreamName) {
					const { streamSlug, project: newStream } = await put(
						`pages/${page.parentPage?._id || page._id}/embed-stream`,
						{
							title: newStreamName
						}
					);

					$childStreams = [newStream, ...$childStreams];
					newStreamName = '';

					page.streamSlug = streamSlug;
				}

				page.slug = `${page.name.trim().toLowerCase().replace(' ', '-')}/$data.slug`;
			} else if (page.isInDir) {
				page.slug = `${page.dirName.trim().toLowerCase().replace(' ', '-')}/${page.name
					.trim()
					.replace(' ', '-')
					.toLowerCase()}`;
			}
		}

		if (!isNewPage && page.creator && !$currentUser) {
			return showErrorMessage('Please log in to update the page.');
		}

		try {
			isLoading = true;

			page.testimonials = page.testimonials || [];
			page.benefits = page.benefits || [];

			if (!page._id && page.name?.includes(':')) {
				page.slug = page.name;
			}

			page = await (isNewPage ? post : put)(`pages${page._id ? `/${page._id}` : ''}`, page);

			page.isDirty = false;
			pageSlug = page.slug;

			if (!page.heros) {
				addDefaultHero();
			}

			page.activeHero = page.heros && page.heros[0];

			$pageDraft = {
				..._.cloneDeep($pageDraft),

				[isNewPage ? '_new' : page.slug]: null
			};

			if (isNewPage && !page.parentPage) {
				$allPages = [{ ...page }, ...($allPages || [])];
				isJustCreated = true;

				if ($allPages.length === 1) {
					// isTutorialShown = true;
				}
			} else {
				$allPages = $allPages.map((p) => {
					if (p._id === page._id) {
						return { ..._.cloneDeep(page) };
					} else if (page.parentPage && p._id == page.parentPage._id) {
						return { ...p, subPages: [...p.subPages, page] };
					} else {
						return p;
					}
				});
			}
		} catch (err) {
		} finally {
			isLoading = false;
			isJustPublished = true;
			isBrandNameEdit = false;

			setTimeout(() => {
				isJustPublished = false;
			}, 1000);
		}
	};

	if ($sveltePage.url.searchParams.get('name')) {
		page.name = $sveltePage.url.searchParams.get('name');

		if ($sveltePage.url.searchParams.get('title')) {
			page.title = $sveltePage.url.searchParams.get('title');

			if (!$currentUser) {
				publishPage();
			}
		}
	}

	let fileUploaded = ({ type, url } = {}, key) => {
		page[key] = url;
	};

	let isEmojiPickerShown = false;

	let addNewTestimonial = () => {
		page.testimonials = page.testimonials || [];

		page.testimonials.push({
			name: '',
			comment: '',
			avatarUrl: ''
		});
	};

	let removeTestimonial = (testimonial) => {
		page.testimonials = page.testimonials.filter((t) => t !== testimonial);
	};

	let addGuids = (sections = []) => {
		return sections.map((s) => {
			if (!s.id) {
				return (s.id = uuidv4());
			}

			return s;
		});
	};

	let addNewSection = ({ type } = {}) => {
		let newSection = {
			id: uuidv4(),
			columns: 1,
			items: [],
			type,
			renderType: page.renderType === 'article' ? 'article' : 'grid'
		};

		if (type === 'benefits') {
			newSection.emoji = '🙌';
			newSection.title = 'Tell the audience how <b>they</b> will benefit';
			newSection.description =
				'Show your features below, talk to the audience. Start features titles with verb.';

			newSection.columns = 1;

			newSection.items = [
				{
					emoji: '🖼',
					title: 'Attach Images',
					description:
						'Paste image from clipboard, insert a link to input or upload from your computer.',
					imageUrl:
						'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1684243151802-image.png'
				},
				{
					emoji: '📼',
					title: 'Use Videos',
					description: 'Simply insert a link to YouTube, Loom or Vimeo.',
					imageUrl:
						'https://www.youtube.com/watch?v=2zE7uWxA95s&pp=ygUac3RhcnR1cCBpcyBhIG1lZGlhIGNvbXBhbnk%3D'
				},
				{
					emoji: '💥',
					title: 'Use GIFs',
					description:
						'Use animated GIFs to catch their attention (use search icon near file input)',
					imageUrl:
						'https://media3.giphy.com/media/MuOGhW5GtDazUSJcL3/giphy.gif?cid=54dcf3bfdsjg51xsczxm9lgxtmf2bprs055i37ma5kxfk0s1&ep=v1_gifs_search&rid=giphy.gif&ct=g'
				},
				{
					emoji: '⚒️',
					title: 'Customize The Grid',
					description: 'Select the number of columns you want to show in your section (1—4)',
					imageUrl:
						'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1684243758302-image.png'
				}
			];
		} else if (type === 'pricing') {
			newSection.columns = 2;

			newSection.renderType = 'pricing';

			newSection.title = 'Pricing';
			newSection.description = 'Simple plans that fit your needs';

			newSection.items = [
				{
					title: 'Free',
					description: 'Start from free (capped at 1000 emails)',
					pricing: {
						amount: 0,
						per: 'month',
						benefits: [
							{
								name: 'collect emails',
								name: 'broadcast emails'
							}
						]
					}
				},
				{
					title: 'Growth',
					description: 'For growing businesses (capped at 10k emails)',
					pricing: {
						amount: 4.2,
						per: 'month',
						benefits: [
							{
								name: 'everything in free'
							},
							{
								name: 'custom domain'
							},
							{
								name: 'priority support'
							}
						]
					}
				}
			];
		} else if (type === 'faq') {
			newSection.title = 'Frequently Asked Questions';
			newSection.description = 'Answers summarized';
			newSection.renderType = 'faq';

			// delete newSection.items;

			newSection.items = [
				{
					title: 'Do you offer a refund?',
					description: 'Yes, all subscriptions refunded no-questions-asked the first 2 weeks.'
				},
				{
					title: 'How the process look like?',
					description: 'You submit the form, prepay and get the result in 48 hours.'
				}
			];
		} else if (type === 'testimonials') {
			newSection.renderType = 'testimonials';
			newSection.title = `Don't just trust our words...`;
			newSection.description = `Here's what people say about ${page.name}!`;

			newSection.items = [
				{
					title: 'Igor Krasnik, Momentum',
					description: `${page.name} is awesome!`,
					imageUrl:
						'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1684156297060-image.png'
				},
				{
					title: 'Elon Musk, X',
					description: `${page.name} is the future, to the moon 🚀`,
					imageUrl:
						'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1684156478852-image.png'
				}
			];
		} else if (type === 'interactive-question') {
			newSection.title = 'A radically transparent question to you..';
			newSection.description = 'How likely would you switch to our product?';
			newSection.interactiveRenderType = 'single_choice';
			newSection.interactiveAnswers = [{ emoji: '💯' }, { emoji: '🤔' }, { emoji: '👎' }];
		} else if (type === 'carousel') {
			newSection.title = 'Nice images!';
			newSection.columns = 4;
			newSection.items = [
				{
					title: 'Image',
					description: '',
					colSpan: 2,
					imageUrl:
						'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1684243151802-image.png'
				},
				{
					title: 'GIF',
					description: '',
					imageUrl:
						'https://www.youtube.com/watch?v=2zE7uWxA95s&pp=ygUac3RhcnR1cCBpcyBhIG1lZGlhIGNvbXBhbnk%3D'
				},
				{
					title: 'Video',
					description: '',
					imageUrl:
						'https://media3.giphy.com/media/MuOGhW5GtDazUSJcL3/giphy.gif?cid=54dcf3bfdsjg51xsczxm9lgxtmf2bprs055i37ma5kxfk0s1&ep=v1_gifs_search&rid=giphy.gif&ct=g'
				}
			];

			newSection.carousel = { is: true };
		} else if (type === 'form') {
			newSection.renderType = 'form';

			newSection.items = [
				{
					title: `What's your email?`,
					interactiveRenderType: 'email'
				},
				{
					title: `What's your name?`,
					description: '',
					interactiveRenderType: 'text',
					varName: 'user.name'
				},
				{
					title: `Your message`,
					description: '',
					interactiveRenderType: 'textarea',
					varName: 'user.request'
				}
			];
		}

		$sectionToEdit = newSection;

		page.sections = [...(page.sections || []), newSection];
	};

	$: if (page) {
		if (
			!$pageDraft[page._id] ||
			!_.isEqual(
				_.omit(page, ['welcomeEmail', 'totalSignupsCount']),
				_.omit($pageDraft[page._id], ['welcomeEmail', 'totalSignupsCount'])
			)
		) {
			if (page.isDirty === false) {
				delete page.isDirty;
			} else {
				page.isDirty = true;
			}
			if (!$pageDraft[page._id]) {
				$pageDraft = {
					..._.cloneDeep($pageDraft),
					[page.slug || '_new']: { ..._.cloneDeep(page) },
					[page._id || '_new']: { ..._.cloneDeep(page), updatedOn: new Date().toISOString() }
				};
			} else {
				$pageDraft = {
					..._.cloneDeep($pageDraft),
					[page.slug || '_new']: { ..._.cloneDeep(page), updatedOn: new Date().toISOString() },
					[page._id || '_new']: { ..._.cloneDeep(page), updatedOn: new Date().toISOString() }
				};
			}
		}
	}

	let getConversionColor = (conversion) => {
		if (conversion < 5) {
			return 'border-red-300';
		} else if (conversion < 10) {
			return 'border-orange-300';
		} else {
			return 'border-green-300';
		}
	};

	let focuses = {
		title: false,
		subtitle: false
	};

	let isSettingsModalShown = false;

	let subscribe = async () => {
		let { url } = await get('stripe/subscribe', { pageId: page._id });
		window.location.href = url;
	};

	let isNewSubPage;

	let addSubpage = () => {
		let heros = [
			{
				title: '',
				subtitle: ''
			}
		];

		page = {
			_id: null,
			slug: '_new',
			heros,
			activeHero: heros[0],
			name: '',
			title: '',
			subtitle: '',
			ctaExplainer: '',
			parentPage: { ...page },
			variablesValues: page.variablesValues
		};

		pageSlug = page.slug;
	};

	let createSubPage = () => {};
	let selectedStreamSlug;

	let selectedCustomer;
	let selectedSubmission;
	let selectedTrigger;
	let selectedChatRoom;

	let onlineUsersCount = -1;

	let getOnlineCount = async () => {
		if (page) {
			onlineUsersCount = await get(`waveActions/page.mmntm.build/online-users`, {
				subProjectId: page?.parentPage?._id || page?._id
			});
		}
	};

	let onlineInterval;

	getOnlineCount();

	onlineInterval = setInterval(() => {
		getOnlineCount();
	}, 30000);

	onDestroy(() => {
		clearInterval(onlineInterval);
	});

	let newStreamName = '';

	if (page.renderType === 'article') {
		page.interactiveRenderType = 'multiple_choice';
	}
</script>

{#if isSettingsModalShown}
	<Modal
		isShown
		maxWidth={600}
		onClosed={() => {
			isSettingsModalShown = false;
		}}
	>
		<div class="p-4 sm:p-8">
			<Settings bind:page />
		</div>
	</Modal>
{/if}

<!-- <svelte:head>
	<script type="text/javascript">
		window.$crisp = [];
		window.CRISP_WEBSITE_ID = '33f4a015-8ff6-44c4-bbc9-2d5c30825fdc';
		(function () {
			d = document;
			s = d.createElement('script');
			s.src = 'https://client.crisp.chat/l.js';
			s.async = 1;
			d.getElementsByTagName('head')[0].appendChild(s);
		})();
	</script>
</svelte:head> -->

{#if isTutorialShown}
	<Modal isShown>
		<div class="p-8 bg-[#fafafa]">
			<h1 class="text-xl mb-4 font-bold">Get started with Momentum IDE ✨</h1>
			<div class="text-lg">
				Congrats! You just published your first page 🥳<br />

				<div class="mt-2">
					Momentum IDE is a super-simple landing page builder that helps you get to product-market
					fit faster.<br />

					Check out this video to learn how to see views analytics, collect emails and edit
					above-the-fold section
					<br />
				</div>
			</div>
		</div>
		<RenderUrl url="https://www.loom.com/share/3d07c9c324254702a28dced5545046ce" />
		<div class="p-4 text-center">
			Reach out to <a
				class="text-blue-800 cursor-pointer"
				href="https://twitter.com/that_igor_"
				target="_blank">Igor</a
			> for any help with Page. Let's make your page converting and beautiful.
		</div>
	</Modal>
{/if}

{#if !$sveltePage.data.pageSlug}
	{#if !$currentUser || $allPages}
		<div class="fixed w-full" />

		<!-- {#if isSignupFormShown}
		<SignupForm />
	{/if} -->

		<div class="xl:max-w-[1600px] mx-auto relative px-16 sm:px-0">
			<div class="flex relative ml-4">
				<!-- EDITOR-->
				<div class="_editor fixed mt-[70px] min-w-[426px] pt-0 h-screen overflow-y-scroll bg-white">
					<div class="fixed top-0 z-10 w-[426px] mb-[70px]  bg-white">
						<div
							class="flex items-center justify-between w-full py-4 pr-4"
							class:justify-between={!$currentUser}
						>
							<a on:click={() => (isSignupFormShown = false)}>
								<h2
									class="font-bold flex items-center"
									style="font-family: Archivo; font-size: 20px;"
								>
									<svg
										width="35"
										height="35"
										viewBox="0 0 35 35"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M1.16977 4.12405C0 6.10202 0 8.77201 0 14.112V20.888C0 26.228 0 28.898 1.16977 30.8759C1.89 32.0938 2.9062 33.11 4.12405 33.8302C6.10202 35 8.77201 35 14.112 35H20.888C26.228 35 28.898 35 30.8759 33.8302C32.0938 33.11 33.11 32.0938 33.8302 30.8759C35 28.898 35 26.228 35 20.888V14.112C35 8.77201 35 6.10202 33.8302 4.12405C33.11 2.9062 32.0938 1.89 30.8759 1.16977C28.898 0 26.228 0 20.888 0H14.112C8.77201 0 6.10202 0 4.12405 1.16977C2.9062 1.89 1.89 2.9062 1.16977 4.12405Z"
											fill="#0C120C"
										/>
										<path
											d="M12.5 14.4696C12.5 13.8984 11.9054 13.4696 11.2273 13.4696C10.9016 13.4696 10.5758 13.5673 10.3276 13.7626L5.87307 17.2626C5.62429 17.4852 5.5 17.7415 5.5 17.9696C5.5 18.1977 5.62429 18.5102 5.87287 18.704L10.3274 22.204C10.575 22.4009 10.9011 22.4696 11.2273 22.4696C11.9054 22.4696 12.5 22.0405 12.5 21.4696C12.5 21.2137 12.3757 20.9577 12.1271 20.7624L8.57244 17.9696L12.1273 15.1765C12.3767 15.0071 12.5 14.754 12.5 14.4696Z"
											fill="white"
										/>
										<path
											d="M29.5 15.9696C29.5 15.7137 29.3757 15.4577 29.1271 15.2624L24.6726 11.7624C24.425 11.5946 24.0989 11.4696 23.7727 11.4696C23.0946 11.4696 22.5 11.8987 22.5 12.4696C22.5 12.7255 22.6243 12.9815 22.8729 13.1768L26.4278 15.9699L22.8729 18.763C22.6233 18.9852 22.5 19.2415 22.5 19.4696C22.5 20.0408 23.0946 20.4696 23.7727 20.4696C24.0984 20.4696 24.4242 20.3719 24.6724 20.1766L29.1269 16.6766C29.3767 16.5102 29.5 16.254 29.5 15.9696Z"
											fill="white"
										/>
										<path
											d="M21.2544 6.76439C21.2251 6.30505 20.8063 5.34737 19.7245 5.41647C19.0943 5.45672 18.5394 5.90278 18.3988 6.5503L13.9188 27.1133C13.8894 27.248 13.8798 27.3825 13.8882 27.5136C13.8787 27.9813 14.3424 28.9338 15.4243 28.8647C16.0517 28.8246 16.6028 28.375 16.7435 27.7295L21.2235 7.16647C21.2533 7.03014 21.2628 6.89556 21.2544 6.76439Z"
											fill="white"
										/>
									</svg>

									<div class="ml-2">IDE</div>
								</h2>
							</a>

							{#if $currentUser}
								{#if $allPages}
									<select
										class="ml-8 w-[275px]"
										bind:value={pageSlug}
										on:change={(evt) => {
											let slug = evt.target.value;

											if (slug === '_new') {
												page = { ..._.cloneDeep($pageDraft['_new'] || defaultPage) };
												pageSlug = page.slug;
											} else {
												setPageAndDraft({
													..._.cloneDeep($allPages.find((p) => p.slug === evt.target.value))
												});
												// refreshData();
											}
										}}
									>
										{#each $allPages as page}
											<option value={page.slug}>{page.name}</option>
										{/each}
										<option value="_new">⬜️ Create New Page</option>
									</select>
								{:else}
									<Loader />
								{/if}
							{:else}
								<button class="_primary" on:click={loginWithGoogle}> Log In </button>
							{/if}
						</div>

						<div>
							<hr class="w-full" />
						</div>
					</div>

					{#if !page._id}
						<div class="mt-8">Launch your landing page in seconds 👇</div>
					{:else if page.sections}
						{addGuids(page.sections) && ''}
					{/if}

					<div class="w-[426px] px-4 pl-0 mr-4">
						{#if $sectionToEdit}
							<div class="bg-white p-4 pl-0 z-40 fixed pb-32 h-screen overflow-y-scroll w-[426px]">
								<div
									class="flex items-center cursor-pointer text-[#8B786D] mb-4"
									on:click={() => {
										page.sections = page.sections.map((s) => {
											if (s.id === $sectionToEdit.id) {
												return { ...$sectionToEdit };
											} else {
												return s;
											}
										});

										$sectionToEdit = null;
									}}
								>
									<BackArrowSvg />
									Back
								</div>

								<div in:fly={{ y: 50, duration: 150 }}>
									<EditSection
										isShort={false}
										bind:page
										bind:section={$sectionToEdit}
										onRemove={() => {
											page.sections = page.sections.filter((s) => s.id !== $sectionToEdit.id);
											$sectionToEdit = null;
										}}
									/>
								</div>
							</div>
						{/if}

						{#if $sectionToEdit}
							<div
								class="bg-white p-4 pl-0 z-40 fixed pb-[1000px] h-screen overflow-y-scroll w-[426px]"
							>
								<div
									class="flex items-center cursor-pointer text-[#8B786D] mb-4"
									on:click={() => {
										page.sections = page.sections.map((s) => {
											if (s.id === $sectionToEdit.id) {
												return { ...$sectionToEdit };
											} else {
												return s;
											}
										});

										$sectionToEdit = null;
									}}
								>
									<BackArrowSvg />
									Back
								</div>

								<div in:fly={{ y: 50, duration: 150 }}>
									<EditSection
										isShort={false}
										bind:section={$sectionToEdit}
										bind:page
										onRemove={() => {
											page.sections = page.sections.filter((s) => s.id !== $sectionToEdit.id);
											$sectionToEdit = null;
										}}
									/>
								</div>
							</div>
						{/if}

						<!-- {#if isOrdering}
						<div class="bg-white p-4 z-30 fixed h-screen overflow-y-scroll pb-32 w-[426px]">
							<div
								class="flex items-center cursor-pointer text-[#8B786D] mb-4"
								on:click={() => (isOrdering = false)}
							>
								<BackArrowSvg />
								Back
							</div>
							{#if page._id}
								<div
									use:dndzone={{ items: page.sections, flipDurationMs }}
									on:consider={handleDndConsider}
									on:finalize={handleDndFinalize}
								>
									{#each page.sections || [] as section (section.id)}
										<div animate:flip={{ duration: flipDurationMs }}>
											<EditSection
												isShort
												bind:section
												onRemove={() => {
													page.sections = page.sections.filter((s) => s !== section);
												}}
											/>
										</div>
									{/each}
								</div>
								<div class="text-center py-4 text-sm">Drag & Drop sections to reorder</div>
							{/if}
						</div>
					{/if} -->

						<div class="py-4">
							<!-- <div class="my-4">
								<ABToggle></ABToggle>
								</div> -->

							{#if page._id && onlineUsersCount !== -1}
								<div
									class="flex shrink-0 items-center justify-between mb-8 flex border {onlineUsersCount
										? 'border-green-300'
										: 'border-gray-300'} {onlineUsersCount
										? 'bg-green-300/10'
										: 'bg-gray-300/10'} transition px-4 py-2 rounded-lg"
								>
									<div class="flex justify-between items-center w-full">
										<div class="flex items-center">
											<div
												class="{onlineUsersCount
													? 'bg-green-400'
													: 'bg-gray-600 opacity-30'} w-[10px] h-[10px] rounded-full mr-2"
											/>
											{onlineUsersCount} users online
										</div>
										<div
											class="ml-2 opacity-30 hover:opacity-100 transition cursor-pointer _bare"
											on:click={getOnlineCount}
										>
											<FeatherIcon name="refresh-cw" theme="light" size="15" />
										</div>
									</div>
								</div>
							{/if}

							{#if $postDraft}
								<BackTo to={'Editor'} onClick={() => ($postDraft = null)} />
								<EditPost class="none" bind:blog={page.blog} bind:post={$postDraft} />
							{:else if selectedTab === 'editor'}
								{#if !page._id || isBrandNameEdit}
									<div class="_section">
										<div class="flex justify-between">
											<div class="_title">Page Name</div>
										</div>
										<div class="w-full flex justify-between items-center">
											{#if page.isInDir}
												<input
													class="w-full"
													bind:value={page.dirName}
													placeholder="Resources"
													use:autofocus
												/>

												<div class="p-4">/</div>
											{/if}
											<input
												class="w-full"
												bind:value={page.name}
												placeholder="Momentum"
												use:autofocus
											/>
										</div>

										{#if page.parentPage}
											<div class="my-2 _section opacity-50 hover:opacity-100 mt-4">
												{#if page.parentPage}
													<div class="font-bold mb-2">⚙️ Advanced</div>
													<div class="flex items-center">
														{#if !page.isInDir}
															<div class="mr-2">
																<input type="checkbox" bind:checked={page.isUseDatabase} /> Attach to
																Database
															</div>
														{/if}
														{#if !page.isUseDatabase}
															<div>
																<input type="checkbox" bind:checked={page.isInDir} /> Sub-directory
															</div>
														{/if}
													</div>
												{/if}
											</div>
										{/if}
										{#if page.isUseDatabase}
											<div class="mt-2">
												Page url: /{page.name.toLowerCase().replace(' ', '-')}/$data.slug
											</div>
										{/if}
										{#if page.isInDir}
											<div class="mt-2">
												Page url: /{(page.dirName || '').toLowerCase()}/{page.name
													.toLowerCase()
													.replace(' ', '-')}
											</div>
										{/if}
									</div>

									{#if page.isUseDatabase}
										<div class="_section">
											<div class="_title">Database</div>

											{#if childStreams?.length}
												<select class="w-full">
													{#each $childStreams as childStream}
														{childStream.name}
													{/each}
												</select>
											{:else}
												<input
													class="w-full"
													placeholder="templates"
													type="text"
													bind:value={newStreamName}
												/>
											{/if}
										</div>
									{/if}

									{#if page.name && page.activeHero && !page.parentPage}
										<div class="_section" in:fade>
											<div class="_title">Tagline</div>

											<div
												class="w-full bg-[#f5f5f5] p-2 rounded-lg block"
												contenteditable
												use:contenteditable
												data-placeholder="Build a better product in public."
												bind:innerHTML={page.activeHero.title}
												on:focus={() => (focuses.title = true)}
												on:blur={() => (focuses.title = false)}
											/>
										</div>

										<div
											class="p-4 bg-green-600 mt-4 rounded-xl text-white font-bold"
											in:fly={{ y: 50, duration: 150 }}
										>
											Start with a bold tagline

											<div class="font-normal mt-2">
												Make a big promise to your customer. Start with a verb. Spark curiosity and
												hook their attention.
											</div>
										</div>
									{/if}
								{:else}
									<div class="flex justify-between items-center mb-4 ">
										<div
											class="w-full mr-2 text-lg font-bold block cursor-pointer transition hover:px-4 hover:py-2 rounded-lg hover:bg-[#f5f5f5]"
											on:click={() => (isBrandNameEdit = true)}
										>
											{page.name}
										</div>
									</div>
								{/if}

								{#if page._id}
									<div class="w-full flex justify-between items-center mb-4">
										<div class="flex items-center">
											<div class="mr-4">
												<EmojiPicker bind:icon={page.logo} />
											</div>
											<ColorPicker bind:page />

											<div
												class="text-2xl ml-4 cursor-pointer"
												on:click={() => {
													isSettingsModalShown = true;
												}}
											>
												⚙️
											</div>
										</div>

										<div class="flex">
											<input
												class="mr-2"
												type="checkbox"
												bind:checked={isShowHeatmap}
												on:change={() => {
													if (isShowHeatmap) {
														refreshHeatmap();
													} else {
														$heatmap = null;
													}
												}}
											/> Heatmap 🔥
										</div>
									</div>
								{/if}

								<div>
									{#if page.name}
										{#if page._id}
											<div class="_section  mb-4">
												{#if !page?.parentPage}
													<div class="flex justify-between items-center ">
														<select
															class="w-full"
															bind:value={page._id}
															on:change={async (evt) => {
																setPageAndDraft(
																	await get(`pages/${evt.target.value}`, {
																		parentPageSlug: page.slug
																	}),
																	{ force: true }
																);
																evt.preventDefault();
															}}
														>
															<option value={page._id}>Home</option>
															{#if $subPages?.length}
																{#each $subPages as subpage (subpage._id)}
																	<option value={subpage._id}>/{subpage.slug}</option>
																{/each}
															{/if}
														</select>

														{#if !page.parentPage}
															<Button
																class="_secondary _small shrink-0 ml-4 opacity-50 transition hover:opacity-100"
																onClick={addSubpage}>Add Subpage</Button
															>
														{/if}
													</div>
												{:else}
													<button
														class="_secondary _small w-full mb-2"
														on:click={() => {
															setPageAndDraft(
																$allPages.find((p) => p.slug === page.parentPage.slug),
																{ force: true }
															);
														}}>Back to the Home page</button
													>
												{/if}
												<div
													class="flex w-full shrink-0 justify-between items-center bg-gray-300/10  border-gray-300 border px-4 py-2 rounded-lg mt-4 cursor-pointer "
													on:click={() => (selectedTab = 'analytics')}
												>
													<div class="border-gray-300 text-sm font-semibold opacity-300">
														Unique Views
													</div>
													<div class="ml-2 font-bold">
														{page.totalUniqueViews || 0}
													</div>
												</div>

												{#if conversions?.forms}
													<div
														class="flex w-full shrink-0 justify-between items-center bg-gray-300/10 border px-4 py-2 rounded-lg mt-4 cursor-pointer  {getConversionColor(
															conversions.forms
														)}"
														on:click={() => (selectedTab = 'audience')}
													>
														<div class="border-gray-300 text-sm font-semibold opacity-300">
															Forms Conversion Rate
														</div>
														<div class="ml-2 font-bold">
															{conversions.forms}%
														</div>
													</div>
													<div class="text-sm semibold text-right mt-2">Target: 10%</div>
												{/if}
												{#if conversions?.clicks && !conversions?.forms}
													<div
														class="flex w-full shrink-0 justify-between items-center bg-gray-300/10 border px-4 py-2 rounded-lg mt-4 cursor-pointer {getConversionColor(
															conversions.clicks
														)}"
														on:click={() => (selectedTab = 'analytics')}
													>
														<div class="text-sm font-semibold">Clicks Conversion Rate</div>
														<div class="ml-2 font-bold">
															{conversions.clicks}%
														</div>
													</div>
													<div class="text-sm semibold text-right mt-2">Target: 30%</div>
												{/if}

												{#if !conversions?.clicks && !conversions?.forms}
													<div
														class="flex justify-between items-center border-gray-300 bg-gray-300/10 text-sm font-semibold opacity-300 px-4 py-2 mt-4 border border-gray-300 rounded-lg"
													>
														<div class="">Conversion Rate</div>
														<div class="ml-2 font-bold opacity-30">N/A%</div>
													</div>
												{/if}
											</div>
										{/if}
									{/if}

									{#if !page._id && page.parentPage}
										<button
											class="_secondary _small w-full mb-2 opacity-50 hover:opacity-100"
											on:click={() => {
												setPageAndDraft(
													$allPages.find((p) => p.slug === page.parentPage.slug),
													{ force: true }
												);
											}}>Back to the Home page</button
										>
									{/if}

									{#if page._id}
										<div class="font-bold mr-2 py-4 my-4">🤩 Hero Section</div>
										{#each page.heros as hero}
											<EditHero
												class="my-4"
												bind:hero
												bind:page
												bind:focuses
												isShowTips={page.hero?.length < 2}
												isCollapsedDefault={!!page.title}
											/>
										{/each}

										{#if !page.heros?.length}
											<button class="_secondary" on:click={addDefaultHero}>Add Hero Section</button>
										{/if}
									{/if}

									{#if page._id && page.renderType === 'article'}
										<!-- <div class="font-bold mr-2 py-4 my-4">🕹 Audience Interacton</div>

										{#each page.interactiveAnswers as answer}
											<div class="flex justify-between">
												<EmojiPicker
													isNoCustom
													class="w-full p-2 bg-[#fafafa] my-2 text-center"
													bind:icon={answer.emoji}
												/>

												<button on:click={() => removeAnswerFromItem(sectionItem, answer)}>🗑</button
												>
											</div>
										{/each}
										{#if page.interactiveAnswers.length === 3}
											<div class="text-sm">You can add up to 3 answers</div>
										{:else}
											<button
												class="_small _secondary w-full"
												on:click={() => addAnswer(sectionItem)}
												>Add another interactive answer</button
											>
										{/if} -->
										<EditInteractiveOptions
											section={page}
											sectionItem={page}
											isWithButton={false}
										/>
									{/if}
									<!-- 
									{#if page?._id}
										<div class="opacity-70 hover:opacity-100 my-4">
											<button
												class="_secondary _small w-full flex items-center justify-between"
												on:click={addNewHero}
												>Add Alternative Hero Section
												<div class="text-xs">Run A/B tests</div>
											</button>
										</div>
									{/if} -->

									<!-- <EditTestimonials bind:page /> -->

									{#if page._id}
										<div
											class="bg-white rounded-xl w-[426px] flex top-[0px] w-full my-8 justify-between items-center"
										>
											<div class="flex items-center">
												<div class="font-bold">🧱 Sections</div>

												{#if page.sections?.length}
													<div class="ml-4 number-tag">
														{page.sections?.length || 0}
													</div>
												{/if}
											</div>

											{#if !page.sections?.length}
												<div>
													<!-- <button
													class="_primary _small w-full text-center cursor-pointer text-[#8B786D]"
													on:click={addNewSection}
												>
													Add Empty Section
												</button> -->
												</div>

												{#if page.sections?.length > 1}
													<div
														class="ml-5 font-normal text-sm cursor-pointer opacity-70 text-center my-2 mb-4"
														on:click={() => (isOrdering = true)}
													>
														💫 Reorder Sections
													</div>
												{/if}
											{/if}
										</div>
									{/if}

									{#if page.sections?.length}
										<div>
											<div
												use:dndzone={{ items: page.sections, flipDurationMs }}
												on:consider={handleDndConsider}
												on:finalize={handleDndFinalize}
											>
												{#each page.sections || [] as section (section.id)}
													<div animate:flip={{ duration: flipDurationMs }}>
														<EditSection
															bind:page
															bind:section
															onRemove={() => {
																page.sections = page.sections.filter((s) => s !== section);
															}}
														/>
													</div>
												{/each}
											</div>
										</div>
									{/if}

									{#if page?._id}
										<button
											class="_primary _small _inverted w-full my-8 flex justify-center cursor-pointer text-[#8B786D]"
											on:click={addNewSection}>🧱 Add Empty Section</button
										>
										<div class="text-sm mb-2">or use templates</div>
										<div class="flex flex-wrap">
											<button
												class="_primary _small _inverted mt-4 mr-4 p-4 flex justify-center cursor-pointer text-[#8B786D]"
												on:click={() => addNewSection({ type: 'benefits' })}>🙌 Add Benefits</button
											>

											<button
												class="_primary _small _inverted mt-4 mr-4 p-4 flex justify-center cursor-pointer text-[#8B786D]"
												on:click={() => addNewSection({ type: 'testimonials' })}
												>💚 Add Testimonials</button
											>

											<button
												class="_primary _small _inverted mt-4 mr-4 p-4 flex justify-center cursor-pointer text-[#8B786D]"
												on:click={() => addNewSection({ type: 'pricing' })}>💰Add Pricing</button
											>

											<button
												class="_primary _small _inverted mt-4 mr-4 p-4 flex justify-center cursor-pointer text-[#8B786D]"
												on:click={() => addNewSection({ type: 'faq' })}>🙋‍♀️ Add FAQ</button
											>

											<button
												class="_primary _small _inverted mt-4 mr-4 p-4 flex justify-center cursor-pointer text-[#8B786D]"
												on:click={() => addNewSection({ type: 'stepper' })}
												>💡 Add 1-2-3 stepper</button
											>
											<!-- 
											<button
												class="_primary _small _inverted mt-4 mr-4 p-4 flex justify-center cursor-pointer text-[#8B786D]"
												on:click={() => addNewSection({ type: 'carousel' })}
												>🎠 Add Carousel with Menu</button
											> -->

											<!-- <button
												class="_primary _small _inverted mt-4 mr-4 p-4 flex justify-center cursor-pointer text-[#8B786D]"
												on:click={() => addNewSection({ type: 'interactive-question' })}
												>🤩 Ask Interactive Question</button
											>
											<button
												class="_primary _small _inverted mt-4 mr-4 p-4 flex justify-center cursor-pointer text-[#8B786D]"
												on:click={() => addNewSection({ type: 'service_chat' })}
											>
												🧑‍💻 Service Chat</button
											>

											<button
												class="_primary _small _inverted mt-4 mr-4 p-4 flex justify-center cursor-pointer text-[#8B786D]"
												on:click={() => addNewSection({ type: 'form' })}
											>
												🔤 Form
											</button> -->

											<!--
											<button
												class="_primary _small _inverted mt-4 mr-4 p-4 flex justify-center cursor-pointer text-[#8B786D]"
												on:click={() => addNewSection({ type: 'newsletter' })}
											>
												✉️ Newsletter</button
											> -->

											<!-- <button
												class="_primary _small _inverted mt-4 mr-4 p-4 flex justify-center cursor-pointer text-[#8B786D]"
												on:click={() => addNewSection({ type: 'community_chat' })}
											>
												💫 Community Chat</button
											> -->
										</div>
									{/if}

									{#if page._id && !page.parentPage}
										<div class="_section my-8">
											<div class="_title flex justify-between w-full">
												Social Links

												<!-- <div class="flex font-normal items-center">
													Hide Hero <input
														bind:checked={page.isHeroHidden}
														class="ml-2"
														type="checkbox"
													/> -->
												<!-- </div> -->
											</div>

											<div class="font-normal text-sm opacity-70 mb-4">
												Add your social links: Twitter, LinkedIn, Instagram etc.
											</div>

											{#each page.links || [] as link}
												<div class="flex gap-4 justify-between text-sm mb-2">
													<input
														placeholder="https://twitter.com/_that_igor"
														type="url"
														class="w-full"
														theme="light"
														bind:value={link.url}
													/>
													<button
														on:click={() => {
															page.links = page.links.filter((l) => l === link);
														}}>🗑</button
													>
												</div>
											{/each}
											<div class="mt-4 w-full">
												<button
													class="_secondary _small w-full text-center"
													on:click={() => {
														page.links = page.links || [];
														page.links.push({
															url: ''
														});
													}}>🔗 Add Social Link</button
												>
											</div>
										</div>
									{/if}

									{#if page._id && page.name && page.title}
										<hr class="my-8 border-[#8B786D] opacity-30" />
									{/if}
								</div>

								<div class="flex items-center w-full justify-between mt-8">
									{#if page.name}
										{#if page.renderType === 'article'}
											<Button class="_primary" onClick={publishPage}>Publish Article</Button>
										{:else}
											<Button class="_primary" onClick={publishPage}>Publish Page</Button>
										{/if}
									{/if}
									<hr class="my-8 border-[#8B786D] opacity-30" />

									{#if page._id && page.isDirty}
										<div
											class="cursor-pointer text-sm opacity-70"
											on:click={async () => {
												setPageAndDraft(
													await get(`pages/${page._id}`, {
														...(page.parentPage ? { parentPageSlug: page.parentPage?.slug } : {})
													}),
													{ force: true }
												);
											}}
										>
											Reset Page
										</div>
									{/if}
								</div>
								{#if page?._id}
									<hr class="my-16" />
									<div class="mb-32">
										<div class="_section bg-[#e8ffef] mt-16" style="border: none;">
											<div class="flex items-center justify-between w-full">
												<div class="">
													<div class="font-bold">Design your product with Momentum team</div>

													<div class="text-sm">Working with us is as easy as using Momentum</div>
												</div>
											</div>
											<a
												href="https://studio.saltnbold.com/new"
												class="w-full"
												class:hidden={!page._id}
												target="_blank"
											>
												<button class="_small _secondary _promo mt-4">Design My Product 🧂</button>
											</a>
										</div>
									</div>
								{/if}
							{:else}
								<BackTo to={'Editor'} onClick={() => (selectedTab = 'editor')} />

								<div>
									{#if selectedTab === 'database'}
										<EditDatabase bind:page bind:selectedStreamSlug />
									{:else if selectedTab === 'analytics'}
										<EditCustomers bind:page bind:selectedCustomer />
									{:else if selectedTab === 'messaging'}
										<EditMessaging bind:page bind:selectedTrigger bind:selectedChatRoom />
									{:else if selectedTab === 'audience'}
										<EditSubmissions bind:page bind:selectedSubmission />
									{:else if selectedTab === 'newsletter'}
										<EditNewsletter bind:page />
										<EditWelcomeEmail bind:page />
									{:else if selectedTab === 'blog'}{/if}
								</div>
							{/if}
						</div>

						<!-- {#if page._id}
							<div class="pb-16">
								<MomentumHub bind:page />
							</div>
						{/if} -->
					</div>
				</div>
				<!-- END EDITOR -->

				<!-- PREVIEW -->

				{#if page.name || page.title}
					<div class="relative ml-[426px] _preview p-4 mx-4 2xl:pl-[75px]" in:fade={{ delay: 150 }}>
						<!-- {#if conversions}
							<div
								class="flex items-center justify-center mt-1 absolute left-[160px] top-[20px] cursor-pointer"
								style="z-index: 10;"
								on:click={() => {
									selectedTab = 'analytics';
								}}
							>
								{#if page.totalUniqueClicksCount}
									<div
										class="flex items-center mr-4 opacity-90 text-center px-4 rounded-xl "
										style="background-color: {getConversionColor(
											conversions.clicks
										)}; color:white; left:50%;"
										use:tooltip
										title="Clicks conversion rate. Target 10+%"
									>
										<FeatherIcon name="mouse-pointer" theme="dark" class="mr-1" size="15px" />
										{conversions.clicks.toFixed(2)}%
									</div>
								{/if}

								{#if page.totalSignupsCount}
									<div
										class="flex items-center mr-4 opacity-80 text-center px-4 rounded-xl"
										style="background-color: {getConversionColor(
											conversions.forms
										)}; color:white; left:50%;"
										use:tooltip
										title="Form conversion rate. Target 10+%"
									>
										<FeatherIcon name="clipboard" theme="dark" class="mr-1" size="15px" />
										{conversions.forms.toFixed(2)}%
									</div>
								{/if}
							</div>
						{/if} -->

						{#if page._id && !$sectionToEdit && selectedTab === 'editor' && !$postDraft}
							<div class="sticky top-[20px] w-full z-50 h-[0px]">
								<div class="mx-auto">
									{#if isJustCreated || isJustPaid}
										<ConfettiExplosion particleCount={200} force={0.3} />
									{/if}
								</div>

								<div class="max-w-[400px] mx-auto">
									<div
										class="relative _published-label flex justify-between items-center mt-4"
										style="padding: 6px 10px;"
									>
										<a
											href={page.domains?.length &&
											page.domains.filter((d) => d.isConfigured).length
												? `//${page.domains.filter((d) => d.isConfigured)[0].url}`
												: `${PAGE_URL}/${page.slug}`}
											class="flex justify-center {page.isDirty ? 'max-w-[240px] ml-4' : 'w-full'}"
											style="color: #5375F0; overflow: hidden; text-overflow: ellipsis;"
											target="_blank"
											rel="noreferrer"
										>
											<div
												class="mr-2 z-20"
												use:tooltip
												title={page.isDirty ? 'Pending Changes' : 'Published'}
											>
												{#if !page.isDirty}
													✅
												{:else}
													🌝
												{/if}
											</div>

											<div
												class="line-clamp-1 whitespace-nowrap overflow-hidden mx-2 text-ellipsis"
											>
												{#if page.domains?.length && page.domains.filter((d) => d.isConfigured).length}
													{page.domains.filter((d) => d.isConfigured)[0].url}
												{:else}
													/{page.slug}
												{/if}
											</div>
										</a>

										{#if page.isDirty}
											<div transition:fly={{ x: 50, duration: 150 }}>
												<Button
													class="bg-yellow-500 right-0 _primary flex justify-center w-full"
													onClick={publishPage}
													style="margin-left: 78px;
										border-radius: 30px;
										padding: 4px 45px;
										right: 3px;
										width: auto;
										margin: -4px -10px -4px 0px;
										"
												>
													Publish
												</Button>
											</div>
										{/if}
									</div>
								</div>
							</div>
						{/if}

						<!-- {#if page}
						<div class="w-full flex justify-center">
							<a href="{PAGE_URL}/explore">Explore</a>
						</div>
					{/if} -->
						<!-- frameBgColor={page._id ? (page.isDirty ? '#fb923c' : '#494949') : '#494949'} -->

						{#if page}
							{#key page._id}
								<div class="sticky top-[20px] pb-16" in:fly={{ y: 50, duration: 300 }}>
									<BrowserFrame
										class="max-h-screen overflow-y-scroll"
										links={[
											{
												action: () => {
													selectedTab = 'editor';
												},
												title: 'Editor',
												featherIcon: 'file-text'
											},
											{
												action: () => {
													selectedTab = 'analytics';
													selectedCustomer = null;
												},
												title: `Customers`,
												featherIcon: 'activity'
											},
											{
												action: () => {
													selectedTab = 'audience';
													selectedSubmission = null;
												},
												title: `Submissions`,
												featherIcon: 'check-square'
											},
											{
												action: () => {
													selectedTab = 'messaging';
													selectedTrigger = null;
													selectedChatRoom = null;
												},
												title: 'Messaging',
												featherIcon: 'message-square'
											},
											{
												action: () => {
													selectedTab = 'database';
												},
												title: 'Databases',
												featherIcon: 'database'
											},
											{
												action: () => {
													selectedTab = 'blog';
												},
												title: 'Blog',
												featherIcon: 'book-open'
											},
											{
												action: () => {
													selectedTab = 'newsletter';
												},
												title: 'Newsletter',
												featherIcon: 'mail'
											}
										]}
										frameBgColor="#494949"
									>
										<div class="flex cursor-pointer" slot="header">
											<div
												class="px-4 mr-4 text-white rounded-xl opacity-90 bg-zinc-900 z-100 flex items-center"
												use:tooltip
												title="Free plan includes 300 subscribers"
											>
												<FeatherIcon class="mr-2" color="#fff" name="clipboard" size="15" />
												{page.totalSignupsCount || 0}/300
											</div>

											<button
												class="px-4 mr-4 text-white bg-green-700"
												style="padding-top: 0px; padding-bottom: 0px;"
												on:click={subscribe}
												use:tooltip
												title="Upgrade to increase number of subscribers and emails, hide Momentum badge and analytics."
											>
												🚀 Upgrade
											</button>

											{#if page}
												{#if $postDraft}
													<PostPreview bind:post={$postDraft} bind:blog={page.blog} isNoHeader />
												{:else if selectedTab === 'editor'}
													<SitePreview
														class="p-4"
														isNoVars
														isEmbed
														noStickyHeader={true}
														isNoBadge={true}
														isEdit
														bind:page
													/>
												{:else if selectedTab === 'database'}
													<DatabaseTab bind:page bind:streamSlug={selectedStreamSlug} />
												{:else if selectedTab === 'analytics'}
													<AnalyticsTab bind:page bind:customer={selectedCustomer} />
												{:else if selectedTab === 'messaging'}
													<MessagingTab
														bind:page
														bind:trigger={selectedTrigger}
														bind:chatRoom={selectedChatRoom}
													/>
												{:else if selectedTab === 'audience'}
													<AudienceTab bind:page bind:selectedSubmission />
												{:else if selectedTab === 'database'}
													<DatabaseTab bind:page />
												{:else if selectedTab === 'blog'}
													<BlogTab bind:page bind:setPageAndDraft />
												{:else if selectedTab === 'newsletter'}
													<NewsletterTab bind:page />
												{/if}
											{/if}
										</div></BrowserFrame
									>
								</div>
							{/key}
						{/if}

						{#if page._id && !$sectionToEdit}
							<MomentumWidget bind:page />
						{/if}
					</div>
				{:else}
					<div
						class="w-full h-screen ml-[426px] self-stretch flex-col flex items-center justify-center"
						in:slide
					>
						<svg
							width="190"
							height="114"
							viewBox="0 0 190 114"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<rect width="190" height="114" rx="7" fill="#F5F5F5" />
							<path
								d="M67 44C67 50.0751 62.0751 55 56 55C49.9249 55 45 50.0751 45 44"
								stroke="#828282"
								stroke-width="3"
								stroke-linecap="round"
							/>
							<path
								d="M144 44C144 50.0751 139.075 55 133 55C126.925 55 122 50.0751 122 44"
								stroke="#828282"
								stroke-width="3"
								stroke-linecap="round"
							/>
							<line
								x1="89.5"
								y1="84.5"
								x2="100.5"
								y2="84.5"
								stroke="#828282"
								stroke-width="3"
								stroke-linecap="round"
							/>
						</svg>

						<div class="text-[#828282] mt-4">Your design will appear here</div>
					</div>
				{/if}

				<!-- END PREVIEW -->
			</div>
		</div>
	{/if}
{/if}

<style>
	._preview {
		width: 100%;
		height: 100%;
		border-left: 1px #e0dede solid;
	}

	._published-label {
		max-width: 400px;
		margin: 0 auto;
		/* left: 50%; */
		/* transform: translateX(-50%); */
		font-size: 14px;
		text-align: center;
		border-radius: 30px;
		background-color: #f5f5f5;
		padding: 3px 10px;
		color: #828282;
	}
</style>
