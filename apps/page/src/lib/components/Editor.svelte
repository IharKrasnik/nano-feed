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
	import addDefaultHero from 'lib-render/helpers/addDefaultHero';
	import getPageUrl from 'lib-render/helpers/getPageUrl';

	import EditHero from '$lib/components/edit/Hero.svelte';
	import EditSection from '$lib/components/edit/Section.svelte';
	import EditFAQ from '$lib/components/edit/FAQ.svelte';
	import EditPricing from '$lib/components/edit/Pricing.svelte';
	import EditWelcomeEmail from '$lib/components/edit/WelcomeEmail.svelte';
	import EditNewsletter from '$lib/components/edit/Newsletter.svelte';
	import EditTestimonials from '$lib/components/edit/Testimonials.svelte';
	import EditPost from 'lib/components/post/EditPost.svelte';
	import EditInteractiveOptions from '$lib/components/edit/InteractiveOptions.svelte';
	import EditCTA from '$lib/components/edit/CallToAction.svelte';
	import EditSectionSettings from '$lib/components/edit/SectionSettings.svelte';
	import Insert from '$lib/components/edit/Insert.svelte';

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

	import SitePreview from 'lib-render/components/SitePreview.svelte';

	import AnalyticsTab from '$lib/components/tabs/AnalyticsTab.svelte';
	import MessagingTab from '$lib/components/tabs/MessagingTab.svelte';
	import AudienceTab from '$lib/components/tabs/AudienceTab.svelte';
	import NewsletterTab from '$lib/components/tabs/NewsletterTab.svelte';
	import InsertTab from '$lib/components/tabs/InsertTab.svelte';
	import DatabaseTab from '$lib/components/tabs/DatabaseTab.svelte';
	import BlogTab from '$lib/components/tabs/BlogTab.svelte';
	import GrowthTab from '$lib/components/tabs/GrowthTab.svelte';
	import EditWebsiteSettingsTab from '$lib/components/tabs/WebsiteSettingsTab.svelte';

	import SignupForm from '$lib/components/signup-form.svelte';

	import EmojiPicker from 'lib/components/EmojiPicker.svelte';
	import ColorPicker from '$lib/components/ColorPicker.svelte';
	import BrowserFrame from 'lib/components/BrowserFrame.svelte';
	import MomentumWidget from '$lib/components/MomentumWidget.svelte';
	import Settings from '$lib/components/Settings.svelte';
	import EditDatabase from '$lib/components/edit/Database.svelte';
	import EditGrowth from '$lib/components/edit/Growth.svelte';
	import EditBlog from '$lib/components/edit/Blog.svelte';
	import EditCustomers from '$lib/components/edit/Customers.svelte';
	import EditSubmissions from '$lib/components/edit/Submissions.svelte';
	import EditMessaging from '$lib/components/edit/Messaging.svelte';
	import EditWebsiteSettings from '$lib/components/edit/WebsiteSettings.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import EditService from '$lib/components/edit/Service.svelte';

	import { showSuccessMessage, showErrorMessage } from 'lib/services/toast';

	import tooltip from 'lib/use/tooltip';
	import clickOutside from 'lib/use/clickOutside';

	import currentUser from 'lib/stores/currentUser';
	import allPages from 'lib-render/stores/allPages';
	import isPageSet from 'lib-render/stores/isPageSet';
	import pageDraft from 'lib-render/stores/pageDraft';
	import sectionToEdit from 'lib-render/stores/sectionToEdit';
	import sectionToPreview from 'lib-render/stores/sectionToPreview';
	import aboveTheFoldEl from 'lib-render/stores/aboveTheFoldEl';
	import ctaFooterEl from 'lib-render/stores/ctaFooterEl';
	import subPages, { refreshSubPages } from 'lib/stores/subPages';
	import childStreams, { refreshChildStreams } from 'lib/stores/childStreams';
	import heatmap from 'lib-render/stores/heatmap';
	import isInsertPopupShown from 'lib-render/stores/isInsertPopupShown';
	import selectedTemplatePage from 'lib-render/stores/selectedTemplatePage';
	import selectedSettingsPage from '$lib/stores/selectedSettingsPage';
	import selectedSettingsTab from '$lib/stores/selectedSettingsTab';

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
		slug: '_new',
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
		theme: {
			// titleFont: 'Inter',
			// textFont: 'Inter',
			// accentColor: '#0055FF'
		},
		sections: [],
		welcomeEmail: null
	};

	let page = { ..._.cloneDeep($pageDraft['_new'] || defaultPage) };

	let prevSlug;
	$: if (page.slug && $aboveTheFoldEl && prevSlug !== page.slug) {
		prevSlug = page.slug;
		$aboveTheFoldEl.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
	}

	let pageSlug = '_new';
	let selectedTab = 'editor';

	let conversions;

	let isShowHeatmap = false;

	let refreshHeatmap = async () => {
		$heatmap = await get(`pages/${page._id}/heatmap`);
		isShowHeatmap = true;
	};

	let refreshPageConversionStats = async () => {
		try {
			if (!page._id || !$currentUser) {
				return;
			}

			let [parentPageStats, pageStats] = await Promise.all([
				page.parentPage
					? (async function () {
							let parentPageStats = await get(
								isDev
									? `pages/${page.parentPage._id}/conversions`
									: `pages/${page.parentPage._id}/conversions-optimised`,
								{},
								{
									isNoNotifications: true
								}
							);

							page.parentPage.totalUniqueViews = page.parentPage.totalUniqueViews =
								parentPageStats.totalVisitorsCount;
							page.parentPage.totalUniqueClicksCount = parentPageStats.uniqueClicksCount;
							page.parentPage.totalSignupsCount = parentPageStats.totalSubmissionsCount;
					  })()
					: null,
				(async function () {
					let stats = await get(
						isDev ? `pages/${page._id}/conversions` : `pages/${page._id}/conversions-optimised`,
						{
							...(page.parentPage ? { parentPageId: page.parentPage._id } : {})
						},
						{
							isNoNotifications: true
						}
					);

					page.totalUniqueViews = page.parentPage.totalUniqueViews = stats.totalVisitorsCount;
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
				})()
			]);
		} catch (err) {}
	};

	//

	let refreshPage = async () => {
		if (page._id) {
			let updatedPage = await get(`pages/${page._id}`);
			page = { ...updatedPage, ..._.pick(page, editableFields), activeHero: page.activeHero };
		}
	};

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
				[page.slug || '_new']: { ..._.cloneDeep(page) },
				[page._id || '_new']: { ..._.cloneDeep(page) }
			};
		}

		pageSlug = page.parentPage?.slug || page.slug;

		$pageDraft = { ...$pageDraft, lastPageSlug: page.slug, lastPageId: page._id };

		selectedTab = 'editor';

		if (!page.heros) {
			page.heros = [];
		}

		if (!page.parentPage && !page.heros?.length) {
			addDefaultHero(page);
		}

		page.activeHero = page.heros[0];

		if ($currentUser) {
			refreshPageConversionStats();
			refreshSubPages({ page });
			refreshChildStreams({ page });
		}

		refreshPage({ page });
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

	const publishPage = async ({ isDraft = false } = {}) => {
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
					const { stream: newStream } = await put(
						`pages/${page.parentPage?._id || page._id}/embed-stream`,
						{
							title: newStreamName
						}
					);

					$childStreams = [newStream, ...$childStreams];
					newStreamName = '';
					page.streamSlug = stream.slug;
				}

				page.slug = `${page.name.trim().toLowerCase().replace(' ', '-')}/$data.slug`;
			} else if (page.isInDir) {
				page.slug = `${page.dirName.trim().toLowerCase().replace(' ', '-')}/${page.name
					.trim()
					.replace(' ', '-')
					.toLowerCase()}`;
			}
		}

		page.isDraft = isDraft;

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

			if ($sectionToEdit) {
				page.sections = page.sections.map((s) => {
					if (s.id === $sectionToEdit.id) {
						return { ...$sectionToEdit };
					} else {
						return s;
					}
				});
			}

			page = await (isNewPage ? post : put)(`pages${page._id ? `/${page._id}` : ''}`, page);

			page.isDirty = false;
			pageSlug = page.parentPage?.slug || page.slug;

			if (!page.heros) {
				addDefaultHero(page);
			}

			page.activeHero = page.heros && page.heros[0];

			$pageDraft = {
				..._.cloneDeep($pageDraft),

				[isNewPage ? '_new' : page.slug]: null
			};

			if (isNewPage) {
				if (!page.parentPage) {
					$allPages = [{ ...page }, ...($allPages || [])];
				} else {
					$subPages = [{ ...page }, ...($subPages || [])];
				}

				isJustCreated = true;

				setTimeout(() => {
					isJustCreated = false;
				}, 5000);

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
		} else if (type === 'interactive-question') {
			newSection.title = 'A radically transparent question to you..';
			newSection.description = 'How likely would you switch to our product?';
			newSection.interactiveRenderType = 'single_choice';
			newSection.interactiveAnswers = [{ emoji: '💯' }, { emoji: '🤔' }, { emoji: '👎' }];
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

	let editableFields = [
		'heros',
		'sections',
		'ctaFooter',
		'theme',
		'renderType',
		'layoutType',
		'interactiveAnswers',
		'isInDir',
		'isUseDatabase',
		'dirName',
		'links'
	];

	$: if (page) {
		if (
			!$pageDraft[page._id] ||
			!_.isEqual(_.pick(page, editableFields), _.pick($pageDraft[page._id], editableFields))
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
	let isPageLinksModalShown = false;

	let subscribe = async () => {
		let { url } = await get('stripe/subscribe', { pageId: page._id });
		window.location.href = url;
	};

	let isNewSubPage;

	let addSubpage = () => {
		let heros = [
			{
				id: uuidv4(),
				title: '',
				subtitle: ''
			}
		];

		page = {
			_id: null,
			slug: '_new',
			name: '',
			parentPage: {
				..._.cloneDeep(
					page.parentPage ? $allPages.find((p) => p._id === page.parentPage._id) : page
				)
			},
			heros,
			activeHero: heros[0],
			title: '',
			subtitle: '',
			ctaExplainer: '',
			variablesValues: page.variablesValues
		};

		selectedTab = 'editor';

		// page = { ...$allPages[0], parentPage: page, _id: null, slug: '_new' };
		setPageAndDraft(page, { force: true });
	};

	let selectedStreamSlug;

	let selectedCustomer;
	let selectedSubmission;
	let selectedTrigger;
	let selectedChatRoom;
	let selectedNewsletter;

	let onlineUsersCount = -1;

	let getOnlineCount = async () => {
		if (page?._id) {
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

	let isPasteSectionModalOpen = false;
	let newSectionCode = '';

	let selectedGrowthTab = 'dashboard';
</script>

{#if isPasteSectionModalOpen}
	<Modal bind:isShown={isPasteSectionModalOpen} maxWidth={600} onClosed={() => {}}>
		<div class="_editor p-4 sm:p-8">
			<textarea
				rows="8"
				class="w-full"
				placeholder="JSON section code"
				bind:value={newSectionCode}
			/>

			<button
				class="_primary _small mt-4"
				on:click={() => {
					try {
						let newSection = JSON.parse(newSectionCode);
						newSection.id = uuidv4();
						if (newSection.items) {
							_.each(newSection.items, (i) => {
								i.id = uuidv4();
							});
						}

						if (newSection._isHero) {
							if (confirm('You pasted hero section. Do you want to replace your current hero?')) {
								page.heros = [newSection];
								page.activeHero = newSection;
								page.activeHero.isCollapsed = false;

								setTimeout(() => {
									if ($aboveTheFoldEl) {
										$aboveTheFoldEl.scrollIntoView({
											behavior: 'smooth',
											block: 'start',
											inline: 'nearest'
										});
									}
								}, 300);
							} else {
								return;
							}
						} else if (newSection._isCtaFooter) {
							if (
								confirm(
									'You pasted call-to-action section. Do you want to replace your current CTA?'
								)
							) {
								page.ctaFooter = newSection;

								setTimeout(() => {
									if ($ctaFooterEl) {
										$ctaFooterEl.scrollIntoView({
											behavior: 'smooth',
											block: 'center',
											inline: 'nearest'
										});
									}
								}, 700);
							} else {
								return;
							}
						} else {
							page.sections = [...page.sections, newSection];
							$sectionToEdit = newSection;
						}
					} catch (err) {
						showErrorMessage('Invalid JSON');
					}

					newSectionCode = '';
					isPasteSectionModalOpen = false;
				}}>Save</button
			>
		</div>
	</Modal>
{/if}
<!-- 
<svelte:head>
	{#if page.subscription}
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
	{/if}
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

{#if !$sveltePage.data.pageSlug || $sveltePage.url.href.includes('/page-templates') || $sveltePage.url.href.includes('/ide')}
	{#if !$currentUser || $allPages}
		<div
			class="fixed w-full h-[60px] bg-white flex items-center justify-between px-6 border-b "
			style="z-index: 100"
		>
			{#if $isInsertPopupShown}
				<Insert bind:page />
			{/if}
			<div
				class="relative z-10 flex gap-1 items-center font-semibold _header-menu"
				style="color: #333; font-size: 12px;"
			>
				<svg
					width="20"
					height="20"
					viewBox="0 0 35 35"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="relative logo cursor-pointer"
					class:_selected={selectedTab === 'editor'}
					on:click={() => {
						selectedTab = 'editor';
					}}
				>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M1.16977 4.12405C0 6.10202 0 8.77201 0 14.112V20.888C0 26.228 0 28.898 1.16977 30.8759C1.89 32.0938 2.9062 33.11 4.12405 33.8302C6.10202 35 8.77201 35 14.112 35H20.888C26.228 35 28.898 35 30.8759 33.8302C32.0938 33.11 33.11 32.0938 33.8302 30.8759C35 28.898 35 26.228 35 20.888V14.112C35 8.77201 35 6.10202 33.8302 4.12405C33.11 2.9062 32.0938 1.89 30.8759 1.16977C28.898 0 26.228 0 20.888 0H14.112C8.77201 0 6.10202 0 4.12405 1.16977C2.9062 1.89 1.89 2.9062 1.16977 4.12405Z"
						class="fill"
						fill="currentColor"
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

				{#if !page._id}
					<div class="ml-2">Momentum IDE</div>
				{/if}

				{#if selectedTab === 'editor' || !page._id}
					<a
						href="/ide"
						in:fade={{ delay: 0 }}
						class:_selected={$isInsertPopupShown}
						class="relative ml-4 flex items-center p-1 cursor-pointer p-2  {$isInsertPopupShown
							? ''
							: 'opacity-70 hover:opacity-100'}"
						on:click={() => {
							if ($isInsertPopupShown) {
								$isInsertPopupShown = false;
							} else {
								$isInsertPopupShown = true;
								selectedTab = 'editor';
							}
						}}
					>
						<FeatherIcon color="#f6f5f4" class="mr-2 _header-icon" size="20" name="plus" />
						Insert
					</a>
				{:else if page._id || (!page._id && $allPages.length > 0)}
					<div
						in:fly={{ delay: 75 }}
						class="relative ml-4 flex items-center p-1 cursor-pointer p-2  opacity-70 hover:opacity-100"
						on:click={() => {
							if (!page._id) {
								setPageAndDraft({ ...$allPages[0] });
							}
							selectedTab = 'editor';
						}}
					>
						<FeatherIcon color="#f6f5f4" class="mr-2 _header-icon" size="20" name="arrow-left" />
						Editor
					</div>
				{/if}

				{#if page._id}
					<div
						in:fade={{ delay: 75 }}
						class="relative flex items-center p-1 cursor-pointer p-2  opacity-70 hover:opacity-100 transition _growth"
						class:_selected={selectedTab === 'growth'}
						on:click={() => {
							selectedTab = 'growth';
						}}
					>
						<FeatherIcon color="#f6f5f4" class="mr-2 _header-icon" size="20" name="bar-chart" />
						Growth
					</div>
					<div
						in:fade={{ delay: 75 }}
						class="relative flex items-center p-1 cursor-pointer p-2  opacity-70 hover:opacity-100"
						class:_selected={selectedTab === 'analytics'}
						on:click={() => {
							selectedTab = 'analytics';
							selectedCustomer = null;
						}}
					>
						<FeatherIcon color="#f6f5f4" class="mr-2 _header-icon" size="20" name="activity" />
						Analytics
					</div>

					<div
						in:fade={{ delay: 150 }}
						class="relative flex items-center p-1  cursor-pointer p-2  opacity-70 hover:opacity-100"
						class:_selected={selectedTab === 'blog'}
						on:click={() => {
							selectedTab = 'blog';
						}}
					>
						<FeatherIcon class="mr-2 _header-icon" size="20" name="edit-3" color="#f6f5f4" />
						Blog
					</div>

					<div
						in:fade={{ delay: 225 }}
						class="relative flex items-center p-1  cursor-pointer p-2  opacity-70 hover:opacity-100"
						class:_selected={selectedTab === 'database'}
						on:click={() => {
							selectedTab = 'database';
						}}
					>
						<FeatherIcon class="mr-2 _header-icon" size="20" name="database" color="#f6f5f4" />
						Data
					</div>

					<div
						in:fade={{ delay: 375 }}
						class="relative flex items-center p-1  cursor-pointer p-2 opacity-70 hover:opacity-100"
						class:_selected={selectedTab === 'messaging'}
						on:click={() => {
							selectedTab = 'messaging';
							selectedTrigger = null;
							selectedChatRoom = null;
						}}
					>
						<FeatherIcon
							class="mr-2 _header-icon"
							size="20"
							name="message-square"
							color="#f6f5f4"
						/>
						Engage
					</div>

					<!-- 
					<div
						in:fade={{ delay: 300 }}
						class="relative flex items-center p-1  cursor-pointer p-2 opacity-70 hover:opacity-100"
						class:_selected={selectedTab === 'audience'}
						on:click={() => {
							selectedTab = 'audience';
							selectedSubmission = null;
						}}
					>
						<FeatherIcon color="#f6f5f4" class="mr-2" size="20" name="check-square" />
						Submissions
					</div>


					<div
						in:fade={{ delay: 450 }}
						class="relative flex items-center p-1 cursor-pointer p-2 opacity-70 hover:opacity-100"
						class:_selected={selectedTab === 'newsletter'}
						on:click={() => {
							selectedTab = 'newsletter';
						}}
					>
						<FeatherIcon class="mr-2" size="20" name="mail" color="#f6f5f4" />
						Newsletter
					</div> -->
				{/if}
				<!-- {
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
				} -->
			</div>

			<div class="2xl:absolute w-full flex items-center justify-center">
				{#if $currentUser}
					{#if $allPages}
						<div>
							<div class="flex items-center">
								<!-- <select
								class="w-full max-w-[200px] bg-[#f1f1f1]"
								bind:value={pageSlug}
								on:change={(evt) => {
									let slug = evt.target.value;

									if (slug === '_new') {
										setPageAndDraft({ ...defaultPage });
										// page = { ..._.cloneDeep($pageDraft['_new'] || defaultPage) };
										// pageSlug = page.slug;
									} else {
										setPageAndDraft({
											..._.cloneDeep($allPages.find((p) => p.slug === evt.target.value))
										});
										// refreshData();
									}
								}}
							>
								<option value="_new">📄 Create Page</option>
								{#each $allPages as page}
									<option value={page.slug}>{page.name}</option>
								{/each}
							</select> -->

								{#if selectedTab === 'editor' && page._id}
									<select
										in:fade={{}}
										class="ml-2 w-full bg-[#f1f1f1]"
										bind:value={page._id}
										on:change={async (evt) => {
											if (evt.target.value === '') {
												evt.preventDefault();
												return addSubpage();
											}

											if (page.parentPage && evt.target.value === page.parentPage._id) {
												setPageAndDraft(
													{ ...$allPages.find((p) => p._id === page.parentPage._id) },
													{
														force: true
													}
												);
											} else {
												setPageAndDraft(
													await get(`pages/${evt.target.value}`, {
														parentPageSlug: page.parentPage?.slug || page.slug
													}),
													{ force: true }
												);
											}
											evt.preventDefault();
										}}
									>
										<option value={page.parentPage?._id || page._id}>Home</option>
										{#if $subPages?.length}
											{#each $subPages as subpage (subpage._id)}
												<option value={subpage._id}>/{subpage.slug}</option>
											{/each}
										{/if}
									</select>

									<button
										class="ml-4 shrink-0 _secondary _small opacity-50 hover:opacity-100"
										style="padding: 4px 12px;"
										on:click={() => {
											addSubpage();
										}}
									>
										Add Subpage</button
									>
								{/if}
							</div>
						</div>
					{:else}
						<Loader />
					{/if}
				{:else}
					<div
						on:click={loginWithGoogle}
						class="flex cursor-pointer items-center  p-2 px-6 rounded-full  {page.name
							? 'border border-green-500 bg-[#758b6c] text-white shadow-green-800/30'
							: ''}"
					>
						{#if page.name?.length}
							<div in:fade>Log In to save your changes →</div>
						{:else}
							<button
								class="_primary {page.name?.length ? '_green' : ''}"
								style="padding: 4px 12px;"
							>
								Log In
							</button>
						{/if}
					</div>
				{/if}
			</div>

			<div class="relative flex items-center shrink-0" transition:fly={{ x: 50, duration: 150 }}>
				{#if page._id && onlineUsersCount !== -1}
					<div
						class="flex mr-8 shrink-0 items-center justify-between flex border {onlineUsersCount
							? 'border-green-300'
							: 'border-gray-300'} {onlineUsersCount
							? 'bg-green-300/10'
							: 'bg-gray-300/10'} transition px-2 py-1 rounded-lg"
					>
						<div class="flex justify-between items-center w-full">
							<div class="flex items-center">
								<div
									class="{onlineUsersCount
										? 'bg-green-400'
										: 'bg-gray-600 opacity-30'} w-[8px] h-[8px] rounded-full mr-2"
								/>
								{onlineUsersCount || 0} users online
							</div>
							<div
								class="ml-2 opacity-80 hover:opacity-100 transition cursor-pointer _bare "
								on:click={getOnlineCount}
							>
								<FeatherIcon name="refresh-cw" class="opacity-50" color="#333" size="15" />
							</div>
						</div>
					</div>
				{/if}

				{#if page._id}
					<div
						class="text-2xl mr-4 cursor-pointer bg-[#f3f3f3] p-2 rounded {selectedTab === 'settings'
							? 'bg-green-800'
							: 'bg-[#f3f3f3]'}"
						on:click={() => {
							$selectedSettingsTab = 'settings';

							if (selectedTab !== 'settings') {
								selectedTab = 'settings';

								$selectedSettingsPage = null;
							} else {
								selectedTab = 'editor';
								$selectedSettingsPage = null;
							}
						}}
					>
						<FeatherIcon
							color={selectedTab === 'settings' ? '#f6f5f4' : '#333333'}
							size="15"
							name="settings"
						/>
					</div>
					<div class:opacity-70={!page?._id || !page?.isDirty}>
						<Button
							class="bg-yellow-500 right-0 _primary flex justify-center w-full"
							onClick={publishPage}
							style="margin-left: 78px;
										padding: 4px 12px;
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

		<!-- {#if isSignupFormShown}
		<SignupForm />
	{/if} -->

		<div class="relative pt-[60px]">
			<div class="flex relative">
				<!-- EDITOR-->
				{#key $sectionToEdit?.id}
					<div
						class="_editor fixed left-0 top-[60px] sm:left-auto w-screen min:w-auto sm:max-w-[400px] overflow-x-hidden pt-0 h-screen overflow-y-scroll bg-white"
					>
						<div class="w-full mr-4" style="max-width: 100vw;">
							<div class="px-6 py-6 {selectedTab === 'growth' ? 'border-green-300 border-r' : ''}">
								{#if !page._id}
									{#if page.parentPage}
										<div class="pt-4 text-lg font-bold">{page.parentPage?.name || ''}</div>
									{:else}
										<div class="pt-4 pb-2">Launch your landing page in seconds 👇</div>
									{/if}
								{:else if page.sections}
									{addGuids(page.sections) && ''}
								{/if}

								{#if $sectionToEdit && selectedTab === 'editor'}
									<div class="bg-white pl-0 z-40 min-h-screen">
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
													page.sections = page.sections.filter((s) => s.id !== $sectionToEdit?.id);
													$sectionToEdit = null;
												}}
											/>
										</div>
									</div>
								{/if}

								{#if !$sectionToEdit}
									<div>
										{#if selectedTab === 'editor' && page.name && !$sectionToEdit}
											{#if page._id}
												<div class="flex items-center mb-4">
													<div class="mr-2 flex items-center">
														<div>
															<EmojiPicker bind:icon={page.logo} />
														</div>
													</div>

													<select
														class="w-full bg-[#f1f1f1]"
														bind:value={pageSlug}
														on:change={(evt) => {
															let slug = evt.target.value;

															if (slug === '_new') {
																setPageAndDraft({ ...defaultPage });
																// page = { ..._.cloneDeep($pageDraft['_new'] || defaultPage) };
																// pageSlug = page.slug;
															} else {
																setPageAndDraft({
																	..._.cloneDeep($allPages.find((p) => p.slug === evt.target.value))
																});
																// refreshData();
															}
														}}
													>
														<option value="_new">📄 Create Website</option>
														{#each $allPages as page}
															<option value={page.slug}>{page.name}</option>
														{/each}
													</select>
												</div>

												<div class="_section mb-8">
													<div class="flex justify-between items-center ">
														<select
															class="w-full"
															bind:value={page._id}
															on:change={async (evt) => {
																if (page.parentPage && evt.target.value === page.parentPage._id) {
																	setPageAndDraft(
																		{ ...$allPages.find((p) => p._id === page.parentPage._id) },
																		{
																			force: true
																		}
																	);
																} else {
																	setPageAndDraft(
																		await get(`pages/${evt.target.value}`, {
																			parentPageSlug: page.parentPage?.slug || page.slug
																		}),
																		{ force: true }
																	);
																}
																evt.preventDefault();
															}}
														>
															<option value={page.parentPage?._id || page._id}>Home</option>
															{#if $subPages?.length}
																{#each $subPages as subpage (subpage._id)}
																	<option value={subpage._id}>/{subpage.slug}</option>
																{/each}
															{/if}
														</select>
														<div class="flex items-center shrink-0 ml-4">
															<ColorPicker bind:page />
															<div
																class="text-2xl ml-2 cursor-pointer {selectedTab === 'settings'
																	? 'bg-green-800'
																	: 'bg-[#f3f3f3]'} p-2 rounded-full"
																on:click={() => {
																	selectedTab = 'settings';
																	$selectedSettingsTab = 'settings';
																	$selectedSettingsPage = page;
																}}
															>
																<FeatherIcon
																	size="15"
																	color={selectedTab === 'settings' ? '#f6f5f4' : '#333333'}
																	name="settings"
																/>
															</div>
														</div>

														<!-- <Button
													class="_secondary _small shrink-0 ml-4 opacity-70 transition hover:opacity-100"
													onClick={addSubpage}>Add Subpage</Button
												> -->
													</div>
													{#if page._id}
														<div class="_section mt-4" style="margin-bottom: 0;">
															<div class="font-bold mb-2 opacity-80">Page performance</div>
															<div
																class="flex w-full shrink-0 justify-between items-center bg-gray-300/10 border-gray-300 border px-4 py-2 rounded-lg mt-4 cursor-pointer hover:bg-[#f1f1f1]"
																on:click={() => (selectedTab = 'growth')}
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
																	class="flex w-full shrink-0 justify-between items-center bg-gray-300/10 border px-4 py-2 rounded-lg mt-4 cursor-pointer  hover:bg-[#f1f1f1]  {getConversionColor(
																		conversions.forms
																	)}"
																	on:click={() => (selectedTab = 'analytics')}
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
																	class="flex w-full shrink-0 justify-between items-center bg-gray-300/10 border px-4 py-2 rounded-lg mt-4 cursor-pointer hover:bg-[#f1f1f1] {getConversionColor(
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
																	on:click={() => (selectedTab = 'analytics')}
																	class="flex justify-between items-center border-gray-300 bg-gray-300/10 text-sm font-semibold opacity-300 px-4 py-2 mt-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-[#f1f1f1]"
																>
																	<div class="">Conversion Rate</div>
																	<div class="ml-2 font-bold opacity-30">N/A%</div>
																</div>
															{/if}
														</div>
													{/if}
												</div>
											{/if}
										{/if}

										{#if selectedTab === 'editor'}
											{#if !page._id || isBrandNameEdit}
												<div class="_section">
													<div class="flex justify-between">
														{#if page.parentPage}
															<div class="_title">Subpage Name</div>
														{:else}
															<div class="_title">Page Name</div>
														{/if}
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
															placeholder={page.parentPage ? 'About' : 'Momentum'}
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
																			<input type="checkbox" bind:checked={page.isUseDatabase} /> Attach
																			Database
																		</div>
																	{/if}
																	{#if !page.isUseDatabase}
																		<div>
																			<input type="checkbox" bind:checked={page.isInDir} /> In sub-directory
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

												{#if !page._id && page.name && page.activeHero && !page.parentPage}
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

														{#if (focuses.title || page.activeHero.title) && !page._id}
															<div
																class="p-4  mt-4 rounded-xl font-bold bg-[#fafafa] opacity-70 _section"
																in:fly={{ y: 50, duration: 150 }}
															>
																<div class="flex items-center mb-4">
																	<div class="mr-2">
																		<FeatherIcon size="20" name="arrow-right-circle" color="#111" />
																	</div>

																	Start with a bold tagline
																</div>
																<div class="font-normal mt-2">
																	Make a big promise to your customer. Start with a verb. Spark
																	curiosity and hook their attention.
																</div>
															</div>
														{/if}
													</div>
												{/if}

												{#if !page._id && page.activeHero?.title}
													<div class="_section">
														<div class="_title flex justify-between w-full">Call To Action</div>

														<EditInteractiveOptions
															class=" mt-4"
															options={[
																{ value: 'email', text: 'Collect emails' },
																{ value: 'link', text: 'Button' }
															]}
															bind:section={page.activeHero}
															bind:sectionItem={page.activeHero}
															isWithButton={false}
														/>
													</div>
												{/if}
											{:else}
												<!-- <div class="flex justify-between items-center mb-4 ">
										<div
											class="w-full mr-2  _editor-title text-lg font-bold block cursor-pointer transition hover:px-4 rounded-lg hover:bg-[#f5f5f5]"
											on:click={() => (isBrandNameEdit = true)}
										>
											{page.name}
										</div>
									</div> -->
											{/if}

											{#if page.renderType === 'service'}
												<EditService bind:page bind:setPageAndDraft />
											{:else}
												{#if page?._id && !page.renderType}
													<div
														class="_section cursor-pointer"
														on:click={() => {
															selectedTab = 'growth';
														}}
													>
														<div class="flex">
															<div
																class="w-[40px] h-[40px] shrink-0 flex items-center justify-center rounded-full  shadow-md bg-green-300 shadow-md shadow-green-300/50 mr-4"
															>
																<svg
																	width="20"
																	height="20"
																	viewBox="0 0 15 15"
																	fill="none"
																	xmlns="http://www.w3.org/2000/svg"
																	><path
																		d="M11.1464 6.85355C11.3417 7.04882 11.6583 7.04882 11.8536 6.85355C12.0488 6.65829 12.0488 6.34171 11.8536 6.14645L7.85355 2.14645C7.65829 1.95118 7.34171 1.95118 7.14645 2.14645L3.14645 6.14645C2.95118 6.34171 2.95118 6.65829 3.14645 6.85355C3.34171 7.04882 3.65829 7.04882 3.85355 6.85355L7.5 3.20711L11.1464 6.85355ZM11.1464 12.8536C11.3417 13.0488 11.6583 13.0488 11.8536 12.8536C12.0488 12.6583 12.0488 12.3417 11.8536 12.1464L7.85355 8.14645C7.65829 7.95118 7.34171 7.95118 7.14645 8.14645L3.14645 12.1464C2.95118 12.3417 2.95118 12.6583 3.14645 12.8536C3.34171 13.0488 3.65829 13.0488 3.85355 12.8536L7.5 9.20711L11.1464 12.8536Z"
																		fill="currentColor"
																		fill-rule="evenodd"
																		clip-rule="evenodd"
																	/></svg
																>
															</div>
															<div>
																<div class="font-bold mb-2">Boost Your Product</div>
																<div>
																	Get free marketing assets, $165k in discounts, record a podcast
																	and more.
																</div>
															</div>
														</div>
													</div>
												{/if}

												<div>
													{#if page._id && page.renderType === 'article'}
														<div class="mt-4">
															<div class="_section">
																<EditInteractiveOptions
																	class=""
																	options={[
																		{ value: '', text: 'No interaction' },
																		{
																			value: 'multiple_choice',
																			text: 'Reactions — multiple choice'
																		}
																	]}
																	section={page}
																	sectionItem={page}
																	isWithButton={false}
																/>
															</div>
														</div>
													{/if}

													{#if page._id}
														{#each page.heros as hero}
															<EditHero
																class="my-4"
																bind:hero
																bind:page
																bind:focuses
																isShowTips={page.heros?.length < 2}
															/>
														{/each}

														{#if !page.heros?.length}
															<button class="_secondary" on:click={addDefaultHero}
																>Add Hero Section</button
															>
														{/if}
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
															class="bg-white rounded-xl sm:w-[400px] flex top-[0px] w-full my-8 mt-12 justify-between items-center"
														>
															<div class="flex items-center">
																<div class="text-lg font-bold  _editor-title">
																	{page.renderType === 'article' ? 'Paragraphs' : 'Sections'}
																</div>

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
															on:click={() => {
																if (page.renderType === 'article') {
																	addNewSection();
																} else {
																	$isInsertPopupShown = true;
																}
															}}
															>Add {page.renderType === 'article' ? 'Paragraph' : 'Section'}</button
														>
														<!-- <div class="text-sm mb-2">or use templates</div> -->
														<!-- <div class="flex flex-wrap gap-4 p-4 bg-[#fafafa] _section rounded"> -->
														<!-- <button
												class="_primary _small _inverted p-4 flex justify-center cursor-pointer text-[#8B786D]"
												on:click={() => addNewSection({ type: 'benefits' })}>🙌 Add Benefits</button
											>

											<button
												class="_primary _small _inverted p-4 flex justify-center cursor-pointer text-[#8B786D]"
												on:click={() => addNewSection({ type: 'testimonials' })}
												>💚 Add Testimonials</button
											>

											<button
												class="_primary _small _inverted p-4 flex justify-center cursor-pointer text-[#8B786D]"
												on:click={() => addNewSection({ type: 'pricing' })}>💰Add Pricing</button
											>

											<button
												class="_primary _small _inverted  p-4 flex justify-center cursor-pointer text-[#8B786D]"
												on:click={() => addNewSection({ type: 'faq' })}>🙋‍♀️ Add FAQ</button
											>

											<button
												class="_primary _small _inverted  p-4 flex justify-center cursor-pointer text-[#8B786D]"
												on:click={() => addNewSection({ type: 'stepper' })}
												>💡 Add 1-2-3 stepper</button
											>
											<button
												class="_primary _small _inverted  p-4 flex justify-center cursor-pointer text-[#8B786D]"
												on:click={() => {
													isPasteSectionModalOpen = true;
												}}>⌨️ Paste section</button
											> -->
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
														<!-- </div> -->
													{/if}

													<!-- {#if page._id && !page.parentPage}
										<div class="_section my-8">
											<div class="_title flex justify-between w-full">
												Social Links

											
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
									{/if} -->

													{#if page._id && page.sections?.length}
														<div class="relative flex items-center my-4  mt-12">
															<div class="font-bold text-lg mr-2 py-4">Call-To-Action</div>

															<div
																class="w-[35px] h-[35px] bg-[#f1f1f1] rounded-xl flex items-center justify-center cursor-pointer"
															>
																{#if page.ctaFooter}
																	<EditSectionSettings
																		bind:page
																		bind:section={page.ctaFooter}
																		bind:sectionItem={page.ctaFooter}
																	/>
																{/if}
															</div>
														</div>

														<EditCTA class="my-4" bind:page />
													{/if}

													<!-- {#if page._id && page.name && page.title}
										<hr class="my-8 border-[#8B786D] opacity-30" />
									{/if} -->
												</div>
											{/if}

											{#if page.name}
												<div class="font-bold text-lg mb-4 mt-16  _editor-title">Publish Page</div>

												{#if (!page._id && page.parentPage) || page.isDraft}
													<div
														class="py-16 mb-8 _section _borderless bg-[#f1f1f1] shadow shadow-black/30"
													>
														<div class="flex items-center w-full justify-between">
															<div class=" w-full">
																<div>
																	<Button
																		class="_primary mr-2"
																		onClick={() => publishPage({ isDraft: true })}
																		>Save As Draft</Button
																	>
																	<div class="text-sm mt-2">Save page but don't publish yet</div>
																</div>
															</div>
														</div>
													</div>
												{/if}

												{#if page._id || !page.parentPage}
													<div
														class="py-16 mb-32 _section _borderless bg-[#f1f1f1] shadow shadow-black/30"
													>
														<div>
															<div>
																{#if page._id || !page.parentPage}
																	<div>
																		{#if page.name}
																			{#if page.renderType === 'article'}
																				<Button class="_primary" onClick={publishPage}>
																					Publish Article</Button
																				>
																			{:else}
																				<Button class="_primary" onClick={publishPage}
																					>Publish Page</Button
																				>
																			{/if}
																		{/if}
																		<div class="text-sm mt-2">
																			The changes will appear on your page live URL
																		</div>
																	</div>
																{/if}
															</div>

															{#if page._id && page.isDirty}
																<div
																	class="cursor-pointer text-sm text-orange-500 mt-4"
																	on:click={async () => {
																		setPageAndDraft(
																			await get(`pages/${page._id}`, {
																				...(page.parentPage
																					? { parentPageSlug: page.parentPage?.slug }
																					: {})
																			}),
																			{ force: true }
																		);

																		showSuccessMessage('Page changes were reset');
																	}}
																>
																	Reset changes
																</div>
															{/if}
														</div>
														{#if !page._id || page.isDraft}{:else}

														{/if}
													</div>
												{/if}
											{/if}
											<hr class="my-8" />
										{:else}
											<div class="mb-[70px]">
												{#if selectedTab === 'database'}
													<EditDatabase
														bind:page
														bind:selectedStreamSlug
														bind:selectedTab
														bind:setPageAndDraft
													/>
												{:else if selectedTab === 'growth'}
													<EditGrowth bind:page bind:selectedGrowthTab bind:setPageAndDraft />
												{:else if selectedTab === 'blog'}
													<EditBlog bind:setPageAndDraft bind:page />
												{:else if selectedTab === 'analytics'}
													<EditCustomers bind:page bind:selectedCustomer />
												{:else if selectedTab === 'messaging'}
													<EditMessaging
														bind:page
														bind:selectedTrigger
														bind:selectedNewsletter
														bind:selectedChatRoom
													/>
												{:else if selectedTab === 'audience'}
													<EditSubmissions bind:page bind:selectedSubmission />
												{:else if selectedTab === 'newsletter'}
													<EditNewsletter bind:page />
													<EditWelcomeEmail bind:page />
												{:else if selectedTab === 'blog'}{:else if selectedTab === 'settings'}
													<EditWebsiteSettings bind:page />
												{/if}
											</div>
										{/if}
									</div>
								{/if}
								<div class="pb-[1000px]" />
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

					<div
						class="relative w-screen sm:w-full ml-[100%] sm:ml-[400px] _preview mx-4 {selectedTab ===
						'editor'
							? 'p-8'
							: 'p-0'} bg-[#e5e5e5] overflow-hidden"
						class:hidden={page.slug === '_slug'}
						style={selectedTab === 'editor' ? 'height: calc(100vh - 60px);' : ''}
						in:fade={{ delay: 150 }}
					>
						{#if !$isInsertPopupShown && !page.name}
							<div
								class="absolute z-10 bg-white left-0 top-0 w-full h-full self-stretch flex-col flex items-center justify-center"
								in:slide
								style="z-index: 100"
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

						{#if page}
							{#key page._id}
								{#if page}
									{#if isJustCreated}
										<div class="absolute left-[50%]">
											<ConfettiExplosion stageHeight={1500} particleCount={300} force={0.3} />
										</div>
									{/if}

									<div
										class=""
										style={selectedTab === 'editor'
											? 'height: calc(100vh - 120px); overflow-y: auto;}'
											: ''}
										in:fade
									>
										{#if selectedTab === 'editor' && !$isInsertPopupShown}
											{#if page?._id}
												<div
													class="absolute left-8 right-8 text-xs top-1 left-8 flex  items-center justify-between"
												>
													<div class="opacity-70 ">
														<a
															target="_blank"
															class="flex py-0 mt-1 px-2 items-center bg-green-400/20 hover:bg-green-400 transition rounded-full"
															href={getPageUrl({ page })}
														>
															<FeatherIcon size={10} name="globe" class="mr-2" />

															{getPageUrl({ page }).replace('https://', '').replace('www.', '')}</a
														>
													</div>
													<div class="flex justify-center">
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
														/> Show Heatmap
													</div>
												</div>
											{/if}

											{#if $sectionToPreview}
												<SitePreview
													isNoVars
													isEmbed
													noStickyHeader={true}
													isNoBadge={true}
													isEdit
													page={{
														name: page.name,
														logo: page.logo,
														theme: page.theme,
														sections: [$sectionToPreview]
													}}
												/>
											{:else}
												<SitePreview
													isNoVars
													isEmbed
													noStickyHeader={true}
													isNoBadge={true}
													isEdit
													bind:page
												/>
											{/if}
										{:else if $isInsertPopupShown}
											<InsertTab bind:page bind:setPageAndDraft />
										{:else if selectedTab === 'database'}
											<DatabaseTab bind:page bind:streamSlug={selectedStreamSlug} />
										{:else if selectedTab === 'analytics'}
											<AnalyticsTab bind:page bind:customer={selectedCustomer} />
										{:else if selectedTab === 'messaging'}
											<MessagingTab
												bind:page
												bind:selectedNewsletter
												bind:trigger={selectedTrigger}
												bind:chatRoom={selectedChatRoom}
											/>
										{:else if selectedTab === 'audience'}
											<AudienceTab bind:page bind:selectedSubmission />
										{:else if selectedTab === 'blog'}
											<BlogTab bind:page bind:setPageAndDraft />
										{:else if selectedTab === 'growth'}
											<GrowthTab bind:page bind:selectedGrowthTab />
										{:else if selectedTab === 'newsletter'}
											<NewsletterTab bind:page />
										{:else if selectedTab === 'settings'}
											<EditWebsiteSettingsTab bind:page />
										{/if}
									</div>
								{/if}
							{/key}
						{/if}

						{#if page._id && !$sectionToEdit}
							<div class="hidden sm:block">
								<MomentumWidget bind:page />
							</div>
						{/if}
					</div>

					<!-- END PREVIEW -->
				{/key}
			</div>
		</div>
	{/if}
{/if}

<style>
	._preview {
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

	:global(svg._header-icon:not(.logo)) {
		padding: 4px;
		background-color: var(--editor-accent-color);
		@apply rounded;
	}

	:global(.logo._selected .fill) {
		fill: #333333;
	}

	._growth._selected {
		background: linear-gradient(45deg, #c6ffa3, rgb(156 254 184));
	}

	:global(.logo .fill) {
		fill: #8b786d;
	}

	:global(.logo:hover .fill) {
		fill: #333333;
	}

	._selected {
		opacity: 100 !important;
		background: #f6f5f4;
		@apply rounded;
	}

	:global(._selected svg._header-icon) {
		background-color: #111111 !important;
	}
</style>
