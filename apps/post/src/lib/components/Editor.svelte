<script>
	import _ from 'lodash';
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import moment from 'moment-timezone';
	import { ConfettiExplosion } from 'svelte-confetti-explosion';
	import { onMount } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';
	import { slide, fly, scale, fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { page as sveltePage } from '$app/stores';
	import striptags from 'striptags';
	import getOtpAndOpen from 'lib/helpers/getOtpAndOpen';

	import { GOOGLE_LOGIN_URL, PAGE_URL, POST_URL, STREAM_URL, BRAND_URL } from 'lib/env';
	import Emoji from 'lib/components/Emoji.svelte';

	import { get, post, put } from 'lib/api';

	import loginWithGoogle from 'lib/helpers/loginWithGoogle';

	import aboveTheFoldEl from '$lib/stores/aboveTheFoldEl';

	import EditSection from '$lib/components/edit/Section.svelte';
	import EditPost from '$lib/components/edit/Post.svelte';
	import EmojiPicker from 'lib/components/EmojiPicker.svelte';
	import MomentumHub from 'lib/components/MomentumHub.svelte';
	import SupportTwitter from 'lib/components/SupportTwitter.svelte';

	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import Modal from 'lib/components/Modal.svelte';
	import BackArrowSvg from 'lib/icons/back-arrow.svelte';
	import Settings from '$lib/components/Settings.svelte';

	import Button from 'lib/components/Button.svelte';
	import Loader from 'lib/components/Loader.svelte';
	import WaveSingleStat from 'lib/components/wave/SingleStat.svelte';
	import WaveDashboard from 'lib/components/wave/Dashboard.svelte';
	import FileInput from 'lib/components/FileInput.svelte';

	import blogDraft from '$lib/stores/blogDraft';
	import postDraft from '$lib/stores/postDraft';
	import BlogPreview from '$lib/components/BlogPreview.svelte';
	import PostPreview from '$lib/components/PostPreview.svelte';
	import SignupForm from '$lib/components/SignupForm.svelte';

	import BrowserFrame from 'lib/components/BrowserFrame.svelte';
	import MomentumWidget from 'lib/components/MomentumWidget.svelte';

	import { showSuccessMessage, showErrorMessage } from 'lib/services/toast';

	import tooltip from 'lib/use/tooltip';
	import clickOutside from 'lib/use/clickOutside';
	import contenteditable from 'lib/use/contenteditable';

	import currentUser from 'lib/stores/currentUser';

	import allBlogs from '$lib/stores/allBlogs';
	import blogPosts from '$lib/stores/blogPosts';

	import sectionToEdit from '$lib/stores/sectionToEdit';

	onMount(async () => {
		await import('emoji-picker-element/svelte');
	});

	let isEditHeader = false;

	const flipDurationMs = 300;

	function handleDndConsider(e) {
		blog.sections = e.detail.items;
	}

	function handleDndFinalize(e) {
		blog.sections = e.detail.items;
	}

	let isLoading = false;
	let isSignupFormShown = false;

	let defaultBlog = {
		_id: undefined,

		name: '',
		title: '',
		subtitle: '',

		callToAction: 'Subscribe',

		bgColor: '',
		slug: '_new',

		isCollectEmails: true,
		welcomeEmail: null
	};

	let blog = { ..._.cloneDeep($blogDraft['_new'] || defaultBlog) };

	let blogSlug = '_new';

	let isBlogSet = false;

	let isPostsLoading = false;

	let getPosts = async () => {
		$blogPosts = null;

		isPostsLoading = true;

		let data = await get(`blogs/${blog._id}/posts`, {
			isWithDrafts: true
		});

		$blogPosts = data.results;
		isPostsLoading = false;
	};

	let setBlogAndDraft = (b, { force = false } = {}) => {
		blog = { ..._.cloneDeep(b) };

		if (
			!force &&
			$blogDraft[blog.slug] &&
			new Date(blog.updatedOn) < new Date($blogDraft[blog.slug].updatedOn)
		) {
			blog = _.cloneDeep($blogDraft[blog.slug]);
		} else {
			$blogDraft = {
				..._.cloneDeep($blogDraft),
				[blog.slug]: { ..._.cloneDeep(blog) }
			};
		}

		if (blog._id) {
			getPosts();
		}

		blogSlug = blog.slug;
	};

	$: if (!isBlogSet && $allBlogs?.length && !blog?._id) {
		setBlogAndDraft({ ..._.cloneDeep($allBlogs[0]) });

		refreshData();
		isBlogSet = true;
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
Thank you for joining ${blog.name} and welcome! <br />
Your participation means a lot for our tiny team of 1 here, so I'm extremely grateful!
<br />
We'll keep in touch and let you know when we launch. <br /> <br />

Meanwhile, if you open for a call — I'd love to chat! <br />
Simply reply to this email and say "hi"! <br />

See you!
		`;
	};

	const saveOrUpdateBlog = async () => {
		let isNewBlog = !blog._id;

		if (!isNewBlog && blog.creator && !$currentUser) {
			return showErrorMessage('Please log in to update the blog.');
		}

		try {
			isLoading = true;

			if (!blog.welcomeEmail) {
				blog.welcomeEmail = { html: getWelcomeEmailHtml(), imageUrl: null };
			}

			blog = await (isNewBlog ? post : put)(`blogs${blog._id ? `/${blog._id}` : ''}`, blog);

			blog.isDirty = false;
			blogSlug = blog.slug;

			$blogDraft = {
				..._.cloneDeep($blogDraft),

				[isNewBlog ? '_new' : blog.slug]: null
			};

			if (isNewBlog) {
				$allBlogs = [{ ...blog }, ...($allBlogs || [])];
				// isJustCreated = true;

				if ($allBlogs.length === 1) {
					// isTutorialShown = true;
				}
			} else {
				$allBlogs = $allBlogs.map((b) => {
					if (b._id === blog._id) {
						return { ..._.cloneDeep(blog) };
					} else {
						return b;
					}
				});
			}
		} catch (err) {
		} finally {
			isLoading = false;
			isJustPublished = true;
			isEditHeader = false;

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

		metrics = await get(`waveProjects/post.mmntm.build/stats`, {
			timeframe,
			subProjectId: blog._id,
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

		submissions = await get(`blogs/${blog._id}/submissions`);

		calculateConversion();
	};

	let getDefaultWelcomeEmail = () => {
		return {
			subject: `Welcome to ${blog.name}!`,
			html: getWelcomeEmailHtml(),
			imageUrl: null
		};
	};

	let toggleSubmissions = async () => {
		isSubmissionsOpen = !isSubmissionsOpen;

		if (!blog.welcomeEmail) {
			blog.welcomeEmail = getDefaultWelcomeEmail();
		}

		if (isSubmissionsOpen) {
			refreshSubmissions();
		}
	};

	let fileUploaded = ({ type, url } = {}, key) => {
		blog[key] = url;
	};

	let isEmojiPickerShown = false;

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

		$sectionToEdit = newSection;

		blog.sections = [...(blog.sections || []), newSection];
	};

	$: if (blog) {
		if (
			!$blogDraft[blog.slug] ||
			!_.isEqual(_.omit(blog, ['welcomeEmail']), _.omit($blogDraft[blog.slug], ['welcomeEmail']))
		) {
			if (blog.isDirty === false) {
				delete blog.isDirty;
			} else {
				blog.isDirty = true;
			}
			if (!$blogDraft[blog.slug]) {
				$blogDraft = {
					..._.cloneDeep($blogDraft),
					[blog.slug || '_new']: { ..._.cloneDeep(blog) }
				};
			} else {
				$blogDraft = {
					..._.cloneDeep($blogDraft),
					[blog.slug || '_new']: { ..._.cloneDeep(blog), updatedOn: new Date().toISOString() }
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
		await put(`blogs/${blog._id}/welcome-email`, {
			subject: blog.welcomeEmail.subject,
			html: blog.welcomeEmail.html,
			imageUrl: blog.welcomeEmail.imageUrl
		});
	};

	let sendTestEmail = async () => {
		await post(`blogs/${blog._id}/welcome-email/test`, {
			html: blog.welcomeEmail.html,
			imageUrl: blog.welcomeEmail.imageUrl
		});

		showSuccessMessage(`Sent test email to ${$currentUser.email}`);
	};

	let isBroadcastTestSent = false;

	let sendTestBroadcastEmail = async () => {
		if (broadcastEmail.subject && broadcastEmail.html) {
			await post(`blogs/${blog._id}/broadcast-email/test`, {
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
		let { sentToEmails } = await post(`blogs/${blog._id}/broadcast-email`, {
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

	let createNewPost = async () => {
		if (!blog._id) {
			await saveOrUpdateBlog();
		}

		$postDraft = {
			creator: $currentUser,
			blog
		};
	};
</script>

<SupportTwitter />

{#if isSettingsModalShown}
	<Modal
		isShown
		maxWidth={600}
		onClosed={() => {
			isSettingsModalShown = false;
		}}
	>
		<div class="p-4 sm:p-8">
			<Settings bind:blog />
		</div>
	</Modal>
{/if}

{#if isBroadcastEmailModalShown}
	<Modal
		isShown
		maxWidth={900}
		onClosed={() => {
			isBroadcastEmailModalShown = false;
		}}
	>
		<div class="p-8 w-full">
			<div class="text-xl font-bold mb-4">Send newsletter to your audience</div>

			{#if blog.signupsCount > 1}
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
						use:contenteditable
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
					<div class="text-sm mt-2 mb-4">
						Add friendly photo or product demo to the end of email.
					</div>
					<FileInput class="w-full" bind:url={broadcastEmail.imageUrl} />
				{/if}
			{:else}
				whoops, it doesn't look you have signups yet?
			{/if}

			{#if isBroadcastTestSent}
				<!-- <div class="p-4 bg-[#fafafa] rounded-xl mb-2">
					<div class="mt-2 p-16">
						<div class="text-lg font-bold mb-4">{broadcastEmail.subject}</div>
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
				</div> -->

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
					<h3 class="text-lg mb-4">
						The test email was sent to&nbsp;<b> {$currentUser.email}</b>. <br />
					</h3>

					Does it look good? Ready to send it to your subscribers?<br />

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
			{:else if blog.signupsCount}
				<div class="mt-8">
					<Button class="mt-4 _secondary" onClick={sendTestBroadcastEmail}
						>🔬 Send Test Email</Button
					>
				</div>
			{/if}
		</div>
	</Modal>
{/if}
<!-- 
{#if isTutorialShown}
	<Modal isShown>
		<div class="p-8 bg-[#fafafa]">
			<h1 class="text-xl mb-4 font-bold">Get started with Momentum Page ✨</h1>
			<div class="text-lg">
				Congrats! You just published your first article 🥳<br />

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
{/if} -->

{#if !$sveltePage.params.blogSlug}
	{#if !$currentUser || $allBlogs}
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

									<div class="ml-2">post</div>
								</h2>
							</a>

							{#if $currentUser}
								{#if $allBlogs}
									<select
										class="ml-8 w-[275px]"
										bind:value={blogSlug}
										on:change={(evt) => {
											let slug = evt.target.value;

											if (slug === '_new') {
												blog = { ..._.cloneDeep($blogDraft['_new'] || defaultBlog) };
												$blogPosts = null;
												blogSlug = blog.slug;
											} else {
												setBlogAndDraft({
													..._.cloneDeep($allBlogs.find((p) => p.slug === evt.target.value))
												});
												refreshData();
											}
										}}
									>
										{#each $allBlogs as blog}
											<option value={blog.slug}>{blog.name}</option>
										{/each}
										<option value="_new">✍️ Create New Blog</option>
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

					{#if !blog?._id}
						<div class="mt-8">Launch your blog in seconds 👇</div>
					{:else if blog.sections}
						{addGuids(blog.sections) && ''}
					{/if}

					<div class="w-[426px] px-4 pl-0 mr-4">
						{#if $sectionToEdit}
							<div class="bg-white p-4 pl-0 z-40 fixed pb-32 h-screen overflow-y-scroll w-[426px]">
								<div
									class="flex items-center cursor-pointer text-[#8B786D] mb-4"
									on:click={() => {
										blog.sections = blog.sections.map((s) => {
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
										bind:blog
										bind:section={$sectionToEdit}
										onRemove={() => {
											blog.sections = blog.sections.filter((s) => s.id !== $sectionToEdit.id);
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
										blog.sections = blog.sections.map((s) => {
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
										bind:blog
										onRemove={() => {
											blog.sections = blog.sections.filter((s) => s.id !== $sectionToEdit.id);
											$sectionToEdit = null;
										}}
									/>
								</div>
							</div>
						{/if}

						{#if !isMetricsOpen && !isSubmissionsOpen}
							<div class="py-4">
								{#if blog && blog._id && !$postDraft}
									<div class="w-full flex justify-between items-center mb-4">
										<div class="flex items-center">
											<div class="mr-4">
												{#if blog.logo}
													<EmojiPicker bind:icon={blog.logo} />
												{/if}
											</div>

											<div
												class="text-2xl cursor-pointer"
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

								{#if !blog._id}
									<div class="_section">
										<div class="_title">Blog Name</div>
										<input class="w-full" bind:value={blog.name} placeholder="Momentum" />
									</div>

									{#if blog.name}
										<div class="_section">
											<div class="_title">Blog Title</div>

											<div
												class="w-full bg-[#f5f5f5] p-2 rounded-lg block"
												contenteditable
												use:contenteditable
												data-placeholder="Build a better product in public."
												bind:innerHTML={blog.title}
												on:focus={() => (focuses.title = true)}
												on:blur={() => (focuses.title = false)}
											/>

											{#if focuses.title || (blog.name && (!blog.title || !blog._id))}
												<div
													class="p-4 bg-green-600 mt-4 rounded-xl text-white font-bold"
													in:fly={{ y: 50, duration: 150 }}
												>
													Describe the goal of your blog with a bold title

													<div class="font-normal mt-2">
														Tell what the reader will achieve by reading your blog. Spark curiosity
														and hook their attention.
													</div>
												</div>
											{/if}
										</div>
									{/if}
								{/if}

								{#if isEditHeader}
									<div
										class="flex items-center cursor-pointer text-[#8B786D] mb-4"
										on:click={() => {
											isEditHeader = false;
										}}
									>
										<BackArrowSvg />
										Back to Editor
									</div>

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
										{#if blog.name}
											<div class="_section">
												<div class="_title">Blog Title</div>

												<div
													class="w-full bg-[#f5f5f5] p-2 rounded-lg block"
													contenteditable
													use:contenteditable
													data-placeholder="Build a better product in public."
													bind:innerHTML={blog.title}
													on:focus={() => (focuses.title = true)}
													on:blur={() => (focuses.title = false)}
												/>

												{#if focuses.title || (blog.name && (!blog.title || !blog._id))}
													<div
														class="p-4 bg-green-600 mt-4 rounded-xl text-white font-bold"
														in:fly={{ y: 50, duration: 150 }}
													>
														Start with a bold title

														<div class="font-normal mt-2">
															Tell what the reader will achieve by reading your blog. Spark
															curiosity and hook their attention.
														</div>
													</div>
												{/if}
											</div>
										{/if}
										{#if blog.title}
											{#if blog._id}
												<div class="_section">
													<div class="_title">Blog Description</div>

													<div
														class="min-h-[100px]"
														contenteditable="true"
														use:contenteditable
														bind:innerHTML={blog.subtitle}
														on:focus={() => (focuses.subtitle = true)}
														on:blur={() => (focuses.subtitle = false)}
														data-placeholder="Momentum instructs you how to create and distribute your content. Add subscribers early and build based on real users feedback."
													/>

													{#if focuses.subtitle || (blog._id && blog.title && !blog.subtitle)}
														<div
															class="p-4 transition {blog.subtitle
																? 'bg-green-600'
																: 'bg-orange-400'} mt-4 rounded-xl text-white font-bold"
															in:fly={{ y: 50, duration: 150 }}
														>
															Explain your value propositon

															<div class="font-normal mt-2">
																Describe your blog in detail. Focus value and transformation for
																your specific target audience.
															</div>
														</div>
													{/if}
												</div>
											{/if}

											<div class="text-sm opacity-90 my-4">
												Use <b>bold</b> and <i>italic</i> text in Tagline and Subtitle to emphasize a
												word or two.
											</div>

											{#if blog._id}
												<div class="_section">
													<div class="_title flex justify-between w-full">
														Call To Action

														<div class="flex font-normal items-center">
															Collect Emails <input
																bind:checked={blog.isCollectEmails}
																class="ml-2"
																type="checkbox"
															/>
														</div>
													</div>

													<div class="font-normal text-sm opacity-70 mb-2">Button text</div>

													<input
														class="mb-4 w-full"
														bind:value={blog.callToAction}
														placeholder="Join Waitlist"
													/>

													<div class="font-normal text-sm opacity-70 mb-2">
														URL to open {blog.isCollectEmails
															? 'once email submitted (optional)'
															: 'on click'}
													</div>

													<input
														class="w-full mb-4"
														bind:value={blog.actionUrl}
														placeholder="Action Url"
													/>
												</div>
											{/if}
										{/if}
									</div>
								{:else if blog._id && !$postDraft}
									<div class="mb-8">
										<div class="text-lg font-bold mb-2">Blog Header</div>

										<div class="_section cursor-pointer" on:click={() => (isEditHeader = true)}>
											<b>{striptags(blog.title)}</b>
											{#if blog.subtitle}
												{striptags(blog.subtitle)}
											{/if}
										</div>
									</div>
								{/if}

								{#if $postDraft}
									<EditPost
										onUpdated={({ post, isJustPublished }) => {
											isJustCreated = isJustPublished;
											$postDraft = null;
										}}
										bind:post={$postDraft}
										bind:blog
									/>
								{:else}
									{#if $blogPosts?.length}
										{#if !isEditHeader}
											<div class="mb-16">
												<div class="flex justify-between mb-4">
													<div class="text-lg font-bold mb-2">Posts</div>
													<button class="_secondary _small" on:click={createNewPost}
														>✍️ Write New Post</button
													>
												</div>

												<div class="relative">
													<div class="max-h-[350px] overflow-y-auto">
														{#each $blogPosts as post}
															<div
																class="_section cursor-pointer"
																on:click={() => {
																	$postDraft = _.cloneDeep(post);
																}}
															>
																<b class="text-lg mb-2">{post.title}</b>
																<div class="truncate">{striptags(post.description)}</div>
																<div class="flex justify-between mt-2">
																	<div class="opacity-70">
																		{moment(post.createdOn).format('MMM DD')}
																	</div>

																	<div
																		class="px-2 bg-gray-400 rounded-xl"
																		class:bg-gray-400={!post.publishedOn || post.draft}
																		class:bg-green-800={post.publishedOn}
																		class:text-white={post.publishedOn}
																	>
																		{#if post.publishedOn}
																			published
																		{:else}
																			draft
																		{/if}
																	</div>
																</div>
															</div>
														{/each}
													</div>
													<div class="absolute bottom-0 h-[40px] bg-white opacity-70 w-full">
														&nbsp;
													</div>
												</div>
											</div>
										{/if}
										<div class="mb-16">
											<div class="flex justify-between mb-4">
												<div class="text-lg font-bold mb-2">Topics</div>
												Coming Soon
												<!-- <button class="_secondary _small" on:click={createNewPost}
													>✍️ Write New Post</button
												> -->
											</div>
										</div>

										<MomentumHub bind:blog bind:isBroadcastEmailModalShown />
									{:else}
										<div class="my-8">
											<Button
												class="_primary _small w-full mt-4 p-4 flex justify-center cursor-pointer text-[#8B786D]"
												onClick={createNewPost}>✍️ Write First Post</Button
											>
										</div>
									{/if}

									<!-- {#if blog._id && !isEditHeader && !$postDraft}
										<hr class="my-8 border-[#8B786D] opacity-30" />

										<div
											class="bg-white rounded-xl w-[426px] flex top-[0px] w-full my-8 justify-between items-center"
										>
											<div class="flex items-center">
												<div class="font-bold">🧱 Sections</div>

												{#if blog.sections?.length}
													<div class="ml-4 number-tag">
														{blog.sections?.length || 0}
													</div>
												{/if}
											</div>

											{#if !blog.sections?.length}
												<div>
													<button
														class="_primary _small w-full text-center cursor-pointer text-[#8B786D]"
														on:click={addNewSection}
													>
														Add Empty Section
													</button>
												</div>

												{#if blog.sections?.length > 1}
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

									{#if blog.sections?.length}
										<div>
											<div
												use:dndzone={{ items: blog.sections, flipDurationMs }}
												on:consider={handleDndConsider}
												on:finalize={handleDndFinalize}
											>
												{#each blog.sections || [] as section (section.id)}
													<div animate:flip={{ duration: flipDurationMs }}>
														<EditSection
															bind:blog
															bind:section
															onRemove={() => {
																blog.sections = blog.sections.filter((s) => s !== section);
															}}
														/>
													</div>
												{/each}
											</div>
										</div>
									{/if}

									{#if blog?._id && !isEditHeader}
										<button
											class="_primary _small w-full mt-4 p-4 flex justify-center cursor-pointer text-[#8B786D]"
											on:click={addNewSection}>🧱 Add Empty Section</button
										>
									{/if}

									{#if blog._id}
										<hr class="my-8 border-[#8B786D] opacity-30" />
									{/if}

									{#if blog._id && blog.name && blog.title}
										<hr class="my-8 border-[#8B786D] opacity-30" />
									{/if} -->

									<div class="flex items-center w-full justify-between mt-8 mb-32">
										{#if isEditHeader}
											<Button class="_primary" onClick={saveOrUpdateBlog}>Update Blog</Button>

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

										<!-- {#if blog._id && blog.isDirty}
											<div
												class="cursor-pointer text-sm opacity-70"
												on:click={() => {
													setBlogAndDraft(
														{
															...(blog._id
																? { ..._.cloneDeep($allBlogs.find((p) => p.slug === blog.slug)) }
																: { ...defaultBlog }),
															welcomeEmail: blog.welcomeEmail
														},
														{ force: true }
													);
												}}
											>
												Reset Blog
											</div>
										{/if} -->
									</div>
								{/if}
							</div>
						{/if}
					</div>
				</div>

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
									<WaveDashboard bind:timeframe stats={metrics} isSingleColumn />
								</div>
							{:else}
								<Loader />
							{/if}
						{/if}

						{#if isSubmissionsOpen}
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

									<div class="max-h-[250px] overflow-y-auto">
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
									</div>

									{#if submissions?.results?.length}
										<div class="font-bold mt-8 mb-4">Newsletter</div>

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
											}}>📢 Send Newsletter</button
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
									placeholder="Welcome to {blog.name}!"
									bind:value={blog.welcomeEmail.subject}
								/>
							</div>
							<div class="mt-2 w-full">
								<div class="text-sm opacity-70 mb-2">Email</div>
								<div
									contenteditable="true"
									use:contenteditable
									bind:innerHTML={blog.welcomeEmail.html}
									class="w-full p-4 bg-[#fafafa]"
								/>
							</div>

							<div class="text-sm opacity-70 mt-4 mb-2">Demo Image</div>
							<div class="text-sm mb-2">
								Attach your friendly selfie or image relevant to your product.
							</div>
							<FileInput class="w-full" bind:url={blog.welcomeEmail.imageUrl} theme="light" />

							<div class="my-4 p-4 bg-green-600 rounded-xl text-white">
								Welcome email is sent once a user <b>verified</b> their email. <br />

								🤝 Make it friendly and personal <br />
								⏳ Keep it short and sweet <br />
								⚡️ Stimulate reader to take action: book a call, check out the link, reply to email,
								share in social media <br />
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

				{#if blog._id}
					<hr class="my-8 border-[#8B786D] opacity-30" />
				{/if}

				<!-- PREVIEW -->

				{#if blog.name || blog.title}
					<div
						class="relative ml-[426px] _preview p-4 mx-4"
						in:fade={{ delay: 150 }}
						style="padding-left: 75px;"
					>
						{#if blog._id && !$sectionToEdit && !$postDraft}
							<div class="sticky top-[20px] w-full z-50 h-[0px]">
								<div class="mx-auto">
									{#if isJustCreated}
										<ConfettiExplosion particleCount={200} force={0.3} />
									{/if}
								</div>

								<div>
									<div
										class="relative _published-label flex justify-between items-center mt-4"
										style="padding: 6px 10px;"
									>
										<a
											href={blog.domains?.length &&
											blog.domains.filter((d) => d.isConfigured).length
												? `//${blog.domains.filter((d) => d.isConfigured)[0].url}`
												: `${POST_URL}/${blog.slug}`}
											class="flex justify-center {blog.isDirty ? 'max-w-[240px] ml-4' : 'w-full'}"
											style="color: #5375F0; overflow: hidden; text-overflow: ellipsis;"
											target="_blank"
											rel="noreferrer"
										>
											<div
												class="mr-2 z-20"
												use:tooltip
												title={blog.isDirty ? 'Pending Changes' : 'Published'}
											>
												{#if !blog.isDirty}
													✅
												{:else}
													🌝
												{/if}
											</div>

											<div>
												{#if blog.domains?.length && blog.domains.filter((d) => d.isConfigured).length}
													{blog.domains.filter((d) => d.isConfigured)[0].url}
												{:else}
													/{blog.slug}
												{/if}
											</div>
										</a>

										{#if blog.isDirty}
											<div transition:fly={{ x: 50, duration: 150 }}>
												<Button
													class="bg-yellow-500 right-0 _primary flex justify-center w-full"
													onClick={saveOrUpdateBlog}
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
										<div class="flex justify-center mt-1 absolute top-0 left-20">
											<div
												class="mr-4 opacity-80 text-center px-4 rounded-xl"
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
							</div>
						{/if}

						{#if blog}
							{#key blog._id}
								<div class="sticky top-[20px] pb-16" in:fly={{ y: 50, duration: 300 }}>
									{#if $postDraft}
										<PostPreview bind:post={$postDraft} isDraft={true} />
									{:else}
										<BrowserFrame
											class="max-h-screen overflow-y-scroll"
											links={[
												{ url: `explore`, title: 'Explore Blogs', emoji: '🙌' },
												{ url: 'about', title: 'About Momentum', emoji: '📄', target: '_blank' }
											]}
											frameBgColor={blog._id ? (blog.isDirty ? '#fb923c' : '#494949') : '#494949'}
										>
											<div
												slot="header"
												class="px-4 mr-4 text-white rounded-xl opacity-90"
												class:bg-zinc-900={!blog.subscription}
												class:bg-green-900={blog.subscription}
												use:tooltip
												title="Current Plan"
											/>

											<BlogPreview
												class="pt-8"
												noStickyHeader={true}
												isNoBadge={true}
												bind:blog
												bind:posts={$blogPosts}
											/>
										</BrowserFrame>
									{/if}
								</div>
							{/key}
						{/if}

						<!-- {#if }
							<MomentumWidget bind:page />
						{/if} -->
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

						<div class="text-[#828282] mt-4">Your blog will appear here</div>
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
