<script>
	import _ from 'lodash';
	import moment from 'moment-timezone';
	import { ConfettiExplosion } from 'svelte-confetti-explosion';
	import { onMount } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';
	import { slide, fly, scale, fade } from 'svelte/transition';
	import { goto } from '$app/navigation';

	import { GOOGLE_LOGIN_URL, PAGE_URL, STREAM_URL } from 'lib/env';

	import { get, post, put } from 'lib/api';

	import loginWithGoogle from 'lib/helpers/loginWithGoogle';

	import EditSection from '$lib/components/edit/Section.svelte';
	import EditFAQ from '$lib/components/edit/FAQ.svelte';
	import EditPricing from '$lib/components/edit/Pricing.svelte';
	import EditTestimonials from '$lib/components/edit/Testimonials.svelte';
	import RenderSection from '$lib/components/render/Section.svelte';
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import Modal from 'lib/components/Modal.svelte';
	import BackArrowSvg from '$lib/icons/BackArrow.svelte';

	import Button from 'lib/components/Button.svelte';
	import Loader from 'lib/components/Loader.svelte';
	import WaveSingleStat from 'lib/components/wave/SingleStat.svelte';
	import WaveDashboard from 'lib/components/wave/Dashboard.svelte';
	import FileInput from 'lib/components/FileInput.svelte';

	import SitePreview from '$lib/components/site-preview.svelte';
	import SignupForm from '$lib/components/signup-form.svelte';

	import EmojiPicker from '$lib/components/EmojiPicker.svelte';
	import ColorPicker from '$lib/components/ColorPicker.svelte';
	import BrowserFrame from 'lib/components/BrowserFrame.svelte';
	import MomentumWidget from '$lib/components/MomentumWidget.svelte';
	import Settings from '$lib/components/Settings.svelte';

	import { showSuccessMessage, showErrorMessage } from 'lib/services/toast';

	import tooltip from 'lib/use/tooltip';
	import clickOutside from 'lib/use/clickOutside';

	import currentUser from 'lib/stores/currentUser';
	import allPages from '$lib/stores/allPages';
	import pageDraft from '$lib/stores/pageDraft';
	import sectionToEdit from '$lib/stores/sectionToEdit';
	import aboveTheFoldEl from '$lib/stores/aboveTheFoldEl';

	onMount(async () => {
		await import('emoji-picker-element/svelte');
	});

	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';

	const flipDurationMs = 300;

	function handleDndConsider(e) {
		page.sections = e.detail.items;
	}

	function handleDndFinalize(e) {
		page.sections = e.detail.items;
	}

	let isLoading = false;
	let isSignupFormShown = false;

	let defaultPage = {
		_id: undefined,
		name: '',
		title: '',
		subtitle: '',
		callToAction: 'Join Waitlist',
		bgColor: '',
		slug: '_new',
		isCollectEmails: true,
		welcomeEmail: null
	};

	let page = { ..._.cloneDeep($pageDraft['_new'] || defaultPage) };

	let isPageSet = false;

	let setPageAndDraft = (p, { force = false } = {}) => {
		page = { ..._.cloneDeep(p) };

		if (
			page.streamSlug &&
			(!page.sections || !page.sections.find((s) => s.type === 'momentum_feed'))
		) {
			page.sections = page.sections || [];

			page.sections.push({
				id: uuidv4(),
				type: 'momentum_feed',
				title: 'We Build In Public',
				description: 'Follow our journey in social media and blogs',
				items: []
			});

			page.sections = [...page.sections];
		}

		if (
			!force &&
			$pageDraft[page.slug] &&
			new Date(page.updatedOn) < new Date($pageDraft[page.slug].updatedOn)
		) {
			page = _.cloneDeep($pageDraft[page.slug]);
		} else {
			$pageDraft = {
				..._.cloneDeep($pageDraft),
				[page.slug]: { ..._.cloneDeep(page) }
			};
		}

		pageSlug = page.slug;
	};

	$: if (!isPageSet && $allPages?.length && !page?._id) {
		setPageAndDraft({ ..._.cloneDeep($allPages[0]) });

		refreshData();
		isPageSet = true;
	}

	let isJustPublished = false;

	let isJustCreated = false;

	let isTutorialShown = false;

	let isBroadcastEmailModalShown;

	let broadcastEmail = { callToAction: {} };

	let getWelcomeEmailHtml = () => {
		if (!$currentUser) {
			return null;
		}

		return `
Hi! My name is ${$currentUser.fullName.split(' ')[0]}. 👋 <br />
Thank you for joining ${page.name} and welcome! <br />
Your participation means a lot for our tiny team of 1 here, so I'm extremely grateful!
<br />
We'll keep in touch and let you know when we launch. <br /> <br />

Meanwhile, if you open for a call — I'd love to chat! <br />
Simply reply to this email and say "hi"! <br />

See you!
		`;
	};

	const publishPage = async () => {
		// if (!$currentUser) {
		// 	$pageDraft = { ..._.cloneDeep($pageDraft), _new: page };
		// 	isSignupFormShown = true;
		// 	return;
		// }
		let isNewPage = !page._id;

		if (!isNewPage && page.creator && !$currentUser) {
			return showErrorMessage('Please log in to update the page.');
		}

		try {
			isLoading = true;

			page.testimonials = page.testimonials || [];
			page.benefits = page.benefits || [];

			if (!page.welcomeEmail) {
				page.welcomeEmail = { html: getWelcomeEmailHtml(), imageUrl: null };
			}

			page = await (isNewPage ? post : put)(`pages${page._id ? `/${page._id}` : ''}`, page);

			page.isDirty = false;
			pageSlug = page.slug;

			$pageDraft = {
				..._.cloneDeep($pageDraft),

				[isNewPage ? '_new' : page.slug]: null
			};

			if (isNewPage) {
				$allPages = [{ ...page }, ...($allPages || [])];
				isJustCreated = true;

				if ($allPages.length === 1) {
					isTutorialShown = true;
				}
			} else {
				$allPages = $allPages.map((p) => {
					if (p._id === page._id) {
						return { ..._.cloneDeep(page) };
					} else {
						return p;
					}
				});
			}
		} catch (err) {
		} finally {
			isLoading = false;
			isJustPublished = true;

			setTimeout(() => {
				isJustPublished = false;
			}, 1000);
		}
	};

	let isMetricsOpen = false;

	let metrics;

	let refreshData = async () => {
		await Promise.all([refreshMetrics(), refreshSubmissions()]);
		calculateConversion();
	};

	let calculateConversion = () => {
		if (metrics && submissions) {
			if (submissions.results.length) {
				metrics.conversion = (submissions.results.length / metrics.totalUsersCount) * 100;

				if (metrics.conversion > 100) {
					metrics.conversion = 0;
				}

				metrics.conversion = parseInt(metrics.conversion);
			} else {
				metrics.conversion = 0;
			}
		}
	};

	let timezone = moment.tz.guess();

	let timeframe = '7_days';

	let refreshMetrics = async () => {
		metrics = null;

		metrics = await get(`waveProjects/page.mmntm.build/stats`, {
			timeframe,
			subProjectId: page._id,
			timezone
		});

		calculateConversion();
	};

	let toggleMetrics = async () => {
		isMetricsOpen = !isMetricsOpen;

		if (isMetricsOpen) {
			refreshMetrics();
		}
	};

	let isSubmissionsOpen = false;
	let submissions;
	let broadcastEmails = null;

	let refreshSubmissions = async () => {
		if (!$currentUser) {
			return;
		}
		submissions = null;

		submissions = await get(`pages/${page._id}/submissions`, {});
		broadcastEmails = await get(`pages/${page._id}/broadcast-emails`, {});

		calculateConversion();
	};

	let getDefaultWelcomeEmail = () => {
		return {
			subject: `Welcome to ${page.name}!`,
			html: getWelcomeEmailHtml(),
			imageUrl: null
		};
	};

	let toggleSubmissions = async () => {
		isSubmissionsOpen = !isSubmissionsOpen;

		if (!page.welcomeEmail) {
			page.welcomeEmail = getDefaultWelcomeEmail();
		}

		if (isSubmissionsOpen) {
			refreshSubmissions();
		}
	};

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
			type
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

			// delete newSection.items;

			newSection.faqs = [
				{
					question: 'Do you offer a refund?',
					answer: 'Yes, all subscriptions refunded no-questions-asked the first 2 weeks.'
				}
			];
		} else if (type === 'testimonials') {
			newSection.title = `Don't just trust our words...`;
			newSection.description = `Here's what people say about ${page.name}!`;

			newSection.testimonials = [
				{
					name: 'Igor Krasnik, Momentum',
					comment: `${page.name} is awesome!`,
					avatarUrl:
						'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1684156297060-image.png'
				},
				{
					name: 'Elon Musk, Twitter',
					comment: `${page.name} is the future, to the moon 🚀`,
					avatarUrl:
						'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1684156478852-image.png'
				}
			];
		}

		$sectionToEdit = newSection;

		page.sections = [...(page.sections || []), newSection];
	};

	let pageSlug = '_new';

	$: if (page) {
		if (
			!$pageDraft[page.slug] ||
			!_.isEqual(_.omit(page, ['welcomeEmail']), _.omit($pageDraft[page.slug], ['welcomeEmail']))
		) {
			if (page.isDirty === false) {
				delete page.isDirty;
			} else {
				page.isDirty = true;
			}
			if (!$pageDraft[page.slug]) {
				$pageDraft = {
					..._.cloneDeep($pageDraft),
					[page.slug || '_new']: { ..._.cloneDeep(page) }
				};
			} else {
				$pageDraft = {
					..._.cloneDeep($pageDraft),
					[page.slug || '_new']: { ..._.cloneDeep(page), updatedOn: new Date().toISOString() }
				};
			}
		}
	}

	let getConversionColor = (conversion) => {
		if (conversion < 5) {
			return 'red';
		} else if (conversion < 10) {
			return 'orange';
		} else {
			return 'green';
		}
	};

	let focuses = {
		title: false,
		subtitle: false
	};

	let updateEmailHtml = async () => {
		await put(`pages/${page._id}/welcome-email`, {
			subject: page.welcomeEmail.subject,
			html: page.welcomeEmail.html,
			imageUrl: page.welcomeEmail.imageUrl
		});
	};

	let sendTestEmail = async () => {
		await post(`pages/${page._id}/welcome-email/test`, {
			html: page.welcomeEmail.html,
			imageUrl: page.welcomeEmail.imageUrl
		});

		showSuccessMessage(`Sent test email to ${$currentUser.email}`);
	};

	let isBroadcastTestSent = false;

	let sendTestBroadcastEmail = async () => {
		if (broadcastEmail.subject && broadcastEmail.html) {
			await post(`pages/${page._id}/broadcast-email/test`, {
				subject: broadcastEmail.subject,
				html: broadcastEmail.html,
				callToAction: broadcastEmail.callToAction,
				imageUrl: broadcastEmail.imageUrl
			});

			isBroadcastTestSent = true;
		} else {
			alert('Fill all the required fields');
		}
	};

	let editBroadcastEmail = () => {
		isBroadcastTestSent = false;
	};

	let sendBroadcastEmail = async () => {
		let { sentToEmails } = await post(`pages/${page._id}/broadcast-email`, {
			subject: broadcastEmail.subject,
			html: broadcastEmail.html,
			callToAction: broadcastEmail.callToAction,
			imageUrl: broadcastEmail.imageUrl
		});

		broadcastEmail.isSent = true;
		broadcastEmail.sentToEmails = sentToEmails;

		broadcastEmails.results = [
			{
				subject: broadcastEmail.subject,
				sentToEmails: broadcastEmail.sentToEmails,
				html: broadcastEmail.html,
				createdOn: new Date()
			},
			...(broadcastEmails.results || [])
		];
	};

	let isSettingsModalShown = false;
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

{#if isBroadcastEmailModalShown}
	<Modal
		isShown
		maxWidth={600}
		onClosed={() => {
			isBroadcastEmailModalShown = false;
		}}
	>
		<div class="p-8 w-full">
			<div class="text-xl font-bold mb-4">Broadcast emails to your audience</div>

			{#if !isBroadcastTestSent}
				<div class="mt-4 mb-2">Email Subject</div>
				<div class="text-sm mt-2 mb-4">
					Subject is very important! <br /> Spark reader's curiosity and make them want to open your
					email.
				</div>
				<input
					placeholder="{moment().format('MMMM')} Update 🔥"
					class="w-full"
					bind:value={broadcastEmail.subject}
				/>

				<div class="mt-4 mb-2">Message</div>
				<div class="text-sm mt-2 mb-4">
					What's in your email for them? <br />
					Talk to your audience and solve their problems. <br />
					Genuinly lead them to call to action through storytelling.
				</div>

				<div
					class="w-full p-4 bg-[#f6f5f5] min-h-[200px] rounded-xl"
					bind:innerHTML={broadcastEmail.html}
					contenteditable
				/>

				<hr class="my-8 border-[#8B786D] opacity-30" />

				<div class="mt-4">Call To Action (optional)</div>
				<div class="text-sm mb-2 opacity-70">
					Text & link for the button at the bottom of your email.
				</div>

				<div class="flex w-full">
					<div class="w-full">
						<div class="text-sm mb-2">Title</div>
						<input
							class="w-full"
							placeholder="Join discovery call"
							bind:value={broadcastEmail.callToAction.title}
						/>
					</div>
					<div class="ml-4 w-full">
						<div class="text-sm mb-2">URL</div>
						<input
							class="w-full"
							type="text"
							placeholder="https://cal.com/igor-krasnik-7uhewy/30min"
							bind:value={broadcastEmail.callToAction.url}
						/>
					</div>
				</div>

				<div class="mt-4 mb-2">Image (optional)</div>
				<div class="text-sm mt-2 mb-4">Add friendly photo or product demo to the end of email.</div>
				<FileInput class="w-full" bind:url={broadcastEmail.imageUrl} />
			{/if}

			{#if isBroadcastTestSent}
				<div class="p-4 bg-[#fafafa] rounded-xl mb-2">
					<div class="text-lg font-bold mb-2">{broadcastEmail.subject}</div>

					<div class="mt-2">
						{@html broadcastEmail.html}
					</div>

					{#if broadcastEmail.callToAction.title && broadcastEmail.callToAction.url}
						<a
							class="mt-4 inline-block"
							style="background-color: #222; color: white; padding: 8px 16px; border-radius: 8px;"
							href={broadcastEmail.callToAction.url}
						>
							{broadcastEmail.callToAction.title}
						</a>
					{/if}

					{#if broadcastEmail.imageUrl}
						<img
							src={broadcastEmail.imageUrl}
							class="rounded-xl mt-4 max-h-[150px] max-w-[300px]"
						/>
					{/if}
				</div>

				{#if broadcastEmail.isSent}
					<div class="my-8 mt-16 text-lg">
						🎉 Email was sent to {broadcastEmail.sentToEmails.length} subscribers! <br />

						<button
							class="mt-4 _secondary"
							on:click={() => {
								isBroadcastEmailModalShown = false;
							}}>✅ Cool, close the window</button
						>
					</div>
				{:else}
					The test email was sent to&nbsp;<b> {$currentUser.email}</b>. <br />
					Does it look good? Ready to send it to your subscribers? <br />

					<div class="mt-4 bg-[#fafafa] p-4 rounded-xl">
						<b>🙅‍♀️ No Spam Area</b> <br />
						People like me and you don't like spam. <br />
						Your subscribers put effort to follow your work. <br />
						Put your heart into your messaging to turn your audience into potential clients.
					</div>

					<div class="flex mt-8">
						<Button class="mt-4 _primary" onClick={sendBroadcastEmail}>📢 Broadcast Email</Button>

						<button
							class="ml-4 mt-4 secondary"
							on:click={() => {
								isBroadcastTestSent = false;
							}}>🖊 Nah, continue editing</button
						>
					</div>
				{/if}
			{:else}
				<div class="mt-8">
					<Button class="mt-4 _secondary" onClick={sendTestBroadcastEmail}
						>🔬 Send Test Email</Button
					>
				</div>
			{/if}
		</div>
	</Modal>
{/if}

{#if isTutorialShown}
	<Modal isShown>
		<div class="p-8 bg-[#fafafa]">
			<h1 class="text-xl mb-4 font-bold">Get started with Momentum Page ✨</h1>
			<div class="text-lg">
				Congrats! You just published your first page 🥳<br />

				<div class="mt-2">
					Momentum Page is a stupid-simple landing page builder that helps you get to product-market
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

{#if !$currentUser || $allPages}
	<div class="fixed w-full" />

	<!-- {#if isSignupFormShown}
		<SignupForm />
	{/if} -->

	<div class="container mx-auto relative">
		<div class="flex relative">
			<!-- EDITOR-->
			<div class="fixed mt-[70px] min-w-[426px] pt-0 h-screen overflow-y-scroll bg-white">
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
									width="34"
									height="34"
									viewBox="0 0 34 34"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M1.13635 4.00622C0 5.92768 0 8.52138 0 13.7088V20.2912C0 25.4786 0 28.0723 1.13635 29.9938C1.836 31.1768 2.82316 32.164 4.00622 32.8637C5.92768 34 8.52138 34 13.7088 34H20.2912C25.4786 34 28.0723 34 29.9938 32.8637C31.1768 32.164 32.164 31.1768 32.8637 29.9938C34 28.0723 34 25.4786 34 20.2912V13.7088C34 8.52138 34 5.92768 32.8637 4.00622C32.164 2.82316 31.1768 1.836 29.9938 1.13635C28.0723 0 25.4786 0 20.2912 0H13.7088C8.52138 0 5.92768 0 4.00622 1.13635C2.82316 1.836 1.836 2.82316 1.13635 4.00622Z"
										fill="#0C120C"
									/>
									<path
										d="M9.44446 8.97221C9.44446 8.18981 10.0787 7.55554 10.8611 7.55554H23.1389C23.9213 7.55554 24.5556 8.18981 24.5556 8.97221V18.8889C24.5556 19.6713 23.9213 20.3055 23.1389 20.3055H13.7885C13.1157 20.3055 12.3778 20.5212 12.2039 21.1711C12.1703 21.2967 12.1496 21.4348 12.1496 21.5843C12.1496 21.7395 12.1719 21.8824 12.2078 22.0118C12.3894 22.6668 13.1202 22.9523 13.5716 23.4606C13.9418 23.8775 14.1667 24.4263 14.1667 25.0278C14.1667 26.3318 13.1096 27.3889 11.8056 27.3889C10.5016 27.3889 9.44446 26.3318 9.44446 25.0278C9.44446 24.2864 9.78614 23.6248 10.3206 23.192C10.6488 22.9261 11.0706 22.7578 11.2715 22.3863C11.3792 22.1869 11.466 21.9217 11.466 21.5843C11.466 21.3604 11.4277 21.1682 11.3705 21.006C11.1795 20.4646 10.5039 20.3757 10.0372 20.0414C9.67831 19.7844 9.44446 19.364 9.44446 18.8889V8.97221Z"
										fill="white"
									/>
								</svg>

								<div class="ml-2">page</div>
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
											refreshData();
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

					{#if !isMetricsOpen && !isSubmissionsOpen}
						<div class="py-4">
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
										<div class="flex items-center cursor-pointer" on:click={toggleSubmissions}>
											<svg
												width="18"
												height="16"
												viewBox="0 0 18 16"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M18 1V6H0V1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H17C17.2652 0 17.5196 0.105357 17.7071 0.292893C17.8946 0.48043 18 0.734784 18 1ZM17 9H1C0.734784 9 0.48043 9.10536 0.292893 9.29289C0.105357 9.48043 0 9.73478 0 10C0 10.2652 0.105357 10.5196 0.292893 10.7071C0.48043 10.8946 0.734784 11 1 11H17C17.2652 11 17.5196 10.8946 17.7071 10.7071C17.8946 10.5196 18 10.2652 18 10C18 9.73478 17.8946 9.48043 17.7071 9.29289C17.5196 9.10536 17.2652 9 17 9ZM17 14H1C0.734784 14 0.48043 14.1054 0.292893 14.2929C0.105357 14.4804 0 14.7348 0 15C0 15.2652 0.105357 15.5196 0.292893 15.7071C0.48043 15.8946 0.734784 16 1 16H17C17.2652 16 17.5196 15.8946 17.7071 15.7071C17.8946 15.5196 18 15.2652 18 15C18 14.7348 17.8946 14.4804 17.7071 14.2929C17.5196 14.1054 17.2652 14 17 14Z"
													fill="#8B786D"
												/>
											</svg>
											<span class="ml-2 mr-8 text-[#8B786D]">
												Audience ({submissions?.results?.length || 0})
											</span>
										</div>

										<div class="flex items-center cursor-pointer" on:click={toggleMetrics}>
											<svg
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M18 2H22V22H18V2ZM10 7V22H14V7H10ZM6 12H2V22H6V12Z"
													fill="#8B786D"
												/>
											</svg>
											<span class="ml-2 text-[#8B786D]">
												Views ({metrics?.totalViewsCount || 0})
											</span>
										</div>
									</div>
								</div>
							{/if}

							{#if !page._id}
								<div class="_section">
									<div class="_title">Brand Name</div>
									<input class="w-full" bind:value={page.name} placeholder="Momentum" />
								</div>
							{/if}

							<!-- <div class="my-4">
								<ABToggle></ABToggle>
								</div> -->

							<div
								on:click={() => {
									$aboveTheFoldEl.scrollIntoView({
										behavior: 'smooth',
										block: 'center',
										inline: 'nearest'
									});

									// $sectionToEdit = null;
								}}
							>
								{#if page.name}
									<div class="_section">
										<div class="_title">Tagline</div>

										<div
											class="w-full bg-[#f5f5f5] p-2 rounded-lg block"
											contenteditable
											data-placeholder="Build a better product in public."
											bind:innerHTML={page.title}
											on:focus={() => (focuses.title = true)}
											on:blur={() => (focuses.title = false)}
										/>

										{#if focuses.title || (page.name && (!page.title || !page._id))}
											<div
												class="p-4 bg-green-600 mt-4 rounded-xl text-white font-bold"
												in:fly={{ y: 50, duration: 150 }}
											>
												Start with a bold tagline

												<div class="font-normal mt-2">
													Make a big promise to your customer. Start with a verb. Spark curiosity
													and hook their attention.
												</div>
											</div>
										{/if}
									</div>
								{/if}

								{#if page.title}
									{#if page._id}
										<div class="_section">
											<div class="_title">Subtitle</div>

											<div
												class="min-h-[100px]"
												contenteditable="true"
												bind:innerHTML={page.subtitle}
												on:focus={() => (focuses.subtitle = true)}
												on:blur={() => (focuses.subtitle = false)}
												data-placeholder="Momentum instructs you how to create and distribute your content. Add subscribers early and build based on real users feedback."
											/>

											<!-- <textarea
												bind:value={page.subtitle}
												on:focus={() => (focuses.subtitle = true)}
												on:blur={() => (focuses.subtitle = false)}
												rows="4"
												class="w-full"
												placeholder="Momentum instructs you how to create and distribute your content. Add subscribers early and build based on real users feedback."
											/> -->

											{#if focuses.subtitle || (page._id && page.title && !page.subtitle)}
												<div
													class="p-4 transition {page.subtitle
														? 'bg-green-600'
														: 'bg-orange-400'} mt-4 rounded-xl text-white font-bold"
													in:fly={{ y: 50, duration: 150 }}
												>
													Explain your value propositon

													<div class="font-normal mt-2">
														What change do you bring to the customer's life? Get specific. Avoid
														self-explaining. Talk to them.
													</div>
												</div>
											{/if}
										</div>
									{/if}

									{#if page._id}
										<div class="_section">
											<div class="_title">
												Product Demo

												<div class="font-normal text-sm opacity-70 mb-4">
													Screenshot, live GIF or a <a
														href="//loom.com"
														class="underline"
														target="_blank"
														use:tooltip
														title="We recommend using Loom or YouTube">video demo</a
													> <br />
												</div>
											</div>

											<div class="flex items-center">
												<FileInput
													class="w-full"
													bind:url={page.demoUrl}
													theme="light"
													isCanSearch
												/>
											</div>

											{#if !page.demoUrl && page.subtitle && page.title}
												<div
													class="p-4 bg-orange-400 mt-4 rounded-xl text-white font-bold"
													in:fly={{ y: 50, duration: 150 }}
												>
													Add your product demo

													<div class="font-normal mt-2">
														A picture is worth a thousand words. But video works even better. Show
														how the future product will look like or translate emotion through GIF.
													</div>
												</div>
											{/if}
										</div>
									{/if}

									{#if page._id}
										<div class="_section">
											<div class="_title flex justify-between w-full">
												Call To Action

												<div class="flex font-normal items-center">
													Collect Emails <input
														bind:checked={page.isCollectEmails}
														class="ml-2"
														type="checkbox"
													/>
												</div>
											</div>

											<div class="font-normal text-sm opacity-70 mb-2">Button text</div>

											<input
												class="mb-4 w-full"
												bind:value={page.callToAction}
												placeholder="Join Waitlist"
											/>

											<div class="font-normal text-sm opacity-70 mb-2">
												URL to open {page.isCollectEmails
													? 'once email submitted (optional)'
													: 'on click'}
											</div>

											<input
												class="w-full mb-4"
												bind:value={page.actionUrl}
												placeholder="Action Url"
											/>

											<!-- <div class="flex items-center mt-2 text-[14px]">
											<input type="checkbox" class="mr-2"  /> Collect Emails
										</div> -->
										</div>
									{/if}

									<!-- <EditTestimonials bind:page /> -->

									{#if page._id}
										<hr class="my-8 border-[#8B786D] opacity-30" />

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
											class="_primary _small w-full mt-4 p-4 flex justify-center cursor-pointer text-[#8B786D]"
											on:click={() => addNewSection({ type: 'benefits' })}>🙌 Add Benefits</button
										>

										<button
											class="_primary _small w-full mt-4 p-4 flex justify-center cursor-pointer text-[#8B786D]"
											on:click={() => addNewSection({ type: 'testimonials' })}
											>💚 Add Testimonials</button
										>

										<button
											class="_primary _small w-full mt-4 p-4 flex justify-center cursor-pointer text-[#8B786D]"
											on:click={() => addNewSection({ type: 'pricing' })}>💰Add Pricing</button
										>

										<button
											class="_primary _small w-full mt-4 p-4 flex justify-center cursor-pointer text-[#8B786D]"
											on:click={() => addNewSection({ type: 'faq' })}>🙋‍♀️ Add FAQ</button
										>

										<button
											class="_primary _small w-full mt-4 p-4 flex justify-center cursor-pointer text-[#8B786D]"
											on:click={addNewSection}>🧱 Add Empty Section</button
										>
									{/if}
									{#if page._id}
										<hr class="my-8 border-[#8B786D] opacity-30" />
									{/if}

									{#if page._id && page.name && page.title}
										<hr class="my-8 border-[#8B786D] opacity-30" />
									{/if}

									{#if page._id}
										<!-- <EditPricing bind:page /> -->
										<!-- <EditFAQ bind:page /> -->
									{/if}
								{/if}
							</div>

							<div class="flex items-center w-full justify-between mt-8 mb-32">
								{#if page.name}
									<Button class="_primary" onClick={publishPage}>Publish</Button>
									<!-- 
									<button
										class="relative _primary {isLoading ? 'loading' : ''}"
										on:click={publishPage}
									>
										{#if isLoading}
											<div class="absolute top-0 h-full flex items-center bg-[#8B786D] z-10">
												<Loader />
											</div>
											Publish
										{:else if isJustPublished}
											<div class="" in:scale={{ duration: 150 }}>👌</div>
										{:else}
											Publish
										{/if}
									</button> -->
								{/if}

								{#if page._id && page.isDirty}
									<div
										class="cursor-pointer text-sm opacity-70"
										on:click={() => {
											setPageAndDraft(
												{
													...(page._id
														? { ..._.cloneDeep($allPages.find((p) => p.slug === page.slug)) }
														: { ...defaultPage }),
													welcomeEmail: page.welcomeEmail
												},
												{ force: true }
											);
										}}
									>
										Reset Page
									</div>
								{/if}
							</div>
						</div>
					{/if}
				</div>
			</div>
			<!-- END EDITOR -->

			<!-- SUBMISSIONS & METRICS -->

			{#if isSubmissionsOpen || isMetricsOpen}
				<div
					class="fixed w-[426px] pb-[150px] pr-4 pt-4 overflow-y-scroll mt-[70px]"
					in:fly={{ x: -50, duration: 150, delay: 150 }}
					style="height: calc(100vh - 60px);"
				>
					<div class="flex justify-between">
						<div
							class="flex items-center cursor-pointer text-[#8B786D]"
							on:click={() => {
								isSubmissionsOpen = false;
								isMetricsOpen = false;
							}}
						>
							<BackArrowSvg />
							Back to Editor
						</div>
						{#if isMetricsOpen}
							<div>
								<select bind:value={timeframe} on:change={refreshMetrics}>
									<option value="24_hours">24 hours</option>
									<option value="7_days">7 days</option>
									<option value="30_days">30 days</option>
								</select>
							</div>
						{/if}
					</div>

					{#if isMetricsOpen}
						{#if metrics}
							<div class="mt-8 w-full">
								<WaveDashboard bind:timeframe stats={metrics} isSingleColumn isSinglePage />
							</div>
						{:else}
							<Loader />
						{/if}
					{/if}

					{#if isSubmissionsOpen}
						<!-- <div class="my-4">
							<WaveSingleStat
								actionType="signup"
								projectId="63eaab5b0ebb830015458b95"
								subProjectId={page._id}
								timeframe="7_days"
							/>
						</div> -->
						<div class="mt-4 text-lg mb-2 font-bold">Your Audience</div>

						{#if submissions}
							<div class="mt-4">
								{#if submissions.results.length}
									<div class="font-bold">
										Forms Submissions: {submissions.results.length}
									</div>
								{:else}
									You don't have form submissions yet. <br />
									Share your page around to get your first signups.
								{/if}

								{#each submissions.results as submission}
									<div class="flex my-2 opacity-90 w-full justify-between items-center">
										<div>
											{submission.email}
											{#if submission.isVerified}
												<div
													class="inline"
													use:tooltip
													title="Email address is verified; Welcome email sent"
												>
													✅
												</div>
											{/if}
										</div>
										<div class="text-sm opacity-70">
											{moment(submission.createdOn).format('MMM DD HH:MM')}
										</div>
									</div>
								{/each}

								{#if submissions?.results?.length}
									<div class="font-bold mt-8 mb-4">Broadcast Emails</div>

									{#if broadcastEmails?.results?.length}
										{#each broadcastEmails.results as email}
											<div class="flex justify-between items-center mb-4">
												<div>
													<div>
														{email.subject}
													</div>
												</div>
												<div class="flex">
													<div class="mr-4 number-tag">{email.sentToEmails.length}</div>

													<div class="opacity-70">
														{moment(email.createdOn).format('MMM DD HH:MM')}
													</div>
												</div>
											</div>
										{/each}
									{/if}

									<div class="my-4 p-4 bg-green-600 rounded-xl text-white">
										<b> Keep your audience engaged </b> <br />

										Stay in touch with them, keep them updated, share useful content, prepare them
										for the launch.
									</div>

									<button
										class="mt-4 _primary"
										on:click={() => {
											isBroadcastEmailModalShown = true;
										}}>📢 Broadcast Emails</button
									>
								{/if}
							</div>
						{/if}

						<hr class="my-8 border-[#8B786D] opacity-30" />

						<div class="mt-4 font-bold">Your Welcome Email</div>

						<div class="mt-4">
							<div class="text-sm opacity-70 mb-2">Subject</div>
							<input
								type="text"
								class="w-full"
								placeholder="Welcome to {page.name}!"
								bind:value={page.welcomeEmail.subject}
							/>
						</div>
						<div class="mt-2 w-full">
							<div class="text-sm opacity-70 mb-2">Email</div>
							<div
								contenteditable="true"
								bind:innerHTML={page.welcomeEmail.html}
								class="w-full p-4 bg-[#fafafa]"
							/>
						</div>

						<div class="text-sm opacity-70 mt-4 mb-2">Demo Image</div>
						<div class="text-sm mb-2">
							Attach your friendly selfie or image relevant to your product.
						</div>
						<FileInput class="w-full" bind:url={page.welcomeEmail.imageUrl} theme="light" />

						<div class="my-4 p-4 bg-green-600 rounded-xl text-white">
							Welcome email is sent once a user <b>verified</b> their email. <br />

							🤝 Make it friendly and personal <br />
							⏳ Keep it short and sweet <br />
							⚡️ Stimulate reader to take action: book a call, check out the link, reply to email, share
							in social media <br />
						</div>

						<div class="flex items-center">
							<Button class="_primary my-8 mr-4" onClick={updateEmailHtml}
								>Update Welcome Email</Button
							>
							<Button class="_secondary my-8" onClick={sendTestEmail}>🔬 Send Test Email</Button>
						</div>
					{/if}
				</div>
			{/if}

			<!-- END SUBMISSIONS & METRICS -->

			{#if page._id}
				<hr class="my-8 border-[#8B786D] opacity-30" />
			{/if}

			<!-- PREVIEW -->

			{#if page.name || page.title}
				<div
					class="relative ml-[426px] _preview p-4 mx-4"
					in:fade={{ delay: 150 }}
					style="padding-left: 75px;"
				>
					{#if page._id && !$sectionToEdit}
						<div class="sticky top-[20px] w-full z-50 h-[0px]">
							<div class="mx-auto">
								{#if isJustCreated}
									<ConfettiExplosion particleCount={200} force={0.3} />
								{/if}
							</div>

							<div
								class="relative _published-label flex justify-between items-center mt-4"
								style="padding: 6px 10px;"
							>
								<a
									href={page.domains?.length && page.domains.filter((d) => d.isConfigured).length
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

									<div>
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
							{#if metrics?.conversion}
								<div class="flex w-full justify-center mt-2">
									<div
										class="left-[10px] mr-4 opacity-80 text-center px-4 rounded-xl"
										style="background-color: {getConversionColor(
											metrics.conversion
										)}; color:white; left:50%;"
										use:tooltip
										title="Conversion rate. Target 10+%"
									>
										{metrics.conversion}%
									</div>
								</div>
							{/if}
						</div>
					{/if}

					{#if page}
						{#key page._id}
							<div in:fly={{ y: 50, duration: 300 }}>
								<BrowserFrame
									frameBgColor={page._id ? (page.isDirty ? '#fb923c' : '#494949') : '#494949'}
								>
									<!-- {#if $sectionToEdit}
										<div class="h-screen bg-white flex flex-col justify-center">
											<RenderSection bind:section={$sectionToEdit} />
										</div>
									{/if} -->

									<SitePreview noStickyHeader={true} isNoBadge={true} bind:page />
								</BrowserFrame>
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
