<script>
	import _ from 'lodash';
	import moment from 'moment-timezone';
	import { onMount } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';
	import { slide, fly, scale, fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import EditSection from '$lib/components/edit/Section.svelte';

	import { get, post, put } from 'lib/api';
	import currentUser from 'lib/stores/currentUser';
	import tooltip from 'lib/use/tooltip';
	import clickOutside from 'lib/use/clickOutside';
	import EmojiPicker from '$lib/components/EmojiPicker.svelte';
	import { ConfettiExplosion } from 'svelte-confetti-explosion';

	import { GOOGLE_LOGIN_URL, PAGE_URL, STREAM_URL } from 'lib/env';

	import allPages from '$lib/stores/allPages';
	import pageDraft from '$lib/stores/pageDraft';

	onMount(async () => {
		await import('emoji-picker-element/svelte');
	});

	import Loader from 'lib/components/Loader.svelte';
	import WaveDashboard from 'lib/components/wave/Dashboard.svelte';
	import FileInput from 'lib/components/FileInput.svelte';

	import SitePreview from '$lib/components/site-preview.svelte';
	import SignupForm from '$lib/components/signup-form.svelte';

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
		slug: '_new'
	};

	let page = { ...($pageDraft['_new'] || defaultPage) };
	let isPageSet = false;

	let setPageAndDraft = (p, { force = false } = {}) => {
		page = { ...p };

		if (
			!force &&
			$pageDraft[page.slug] &&
			new Date(page.updatedOn) < new Date($pageDraft[page.slug].updatedOn)
		) {
			page = { ...$pageDraft[page.slug] };
		} else {
			$pageDraft = {
				...$pageDraft,
				[page.slug]: { ...page }
			};
		}
	};

	$: if (!isPageSet && $currentUser && $allPages?.length && !page?._id) {
		setPageAndDraft({ ...$allPages[0] });

		refreshData();
		isPageSet = true;
	}

	let isJustPublished = false;
	let isJustCreated = false;

	const publishPage = async () => {
		if (!$currentUser) {
			$pageDraft = { ...$pageDraft, _new: page };
			isSignupFormShown = true;
			return;
		}

		isLoading = true;

		try {
			let isNewPage = !page._id;

			page.testimonials = page.testimonials || [];
			page.benefits = page.benefits || [];
			page = await (isNewPage ? post : put)(`pages${page._id ? `/${page._id}` : ''}`, page);
			page.isDirty = false;

			$pageDraft = {
				...$pageDraft,
				[isNewPage ? '_new' : page.slug]: null
			};

			if (isNewPage) {
				$allPages = [{ ...page }, ...$allPages];
				isJustCreated = true;
			} else {
				$allPages = $allPages.map((p) => {
					if (p._id === page._id) {
						return { ...page };
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

	let refreshData = () => {
		refreshMetrics();
		refreshSubmissions();
	};
	let timezone = moment.tz.guess();

	let refreshMetrics = async () => {
		metrics = null;

		metrics = await get(`waveProjects/page.mmntm.build/stats`, {
			timeframe: '7_days',
			subProjectId: page._id,
			timezone
		});
	};

	let toggleMetrics = async () => {
		isMetricsOpen = !isMetricsOpen;

		if (isMetricsOpen) {
			refreshMetrics();
		}
	};

	let isSubmissionsOpen = false;
	let submissions;

	let refreshSubmissions = async () => {
		submissions = null;

		submissions = await get(`pages/${page._id}/submissions`, {});
	};

	let toggleSubmissions = async () => {
		isSubmissionsOpen = !isSubmissionsOpen;

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

	let isOrdering = false;

	let embedStream = async () => {
		const { streamSlug } = await put(`pages/${page._id}/embed-stream`);
		page.streamSlug = streamSlug;

		window.open(`${STREAM_URL}/${streamSlug}`, '_blank');
	};

	$: if (page) {
		if (!$pageDraft[page.slug] || !_.isEqual(page, $pageDraft[page.slug])) {
			if (page.isDirty !== false) {
				page.isDirty = true;
			} else {
				delete page.isDirty;
			}

			$pageDraft = {
				...$pageDraft,
				[page.slug || '_new']: { ...page, updatedOn: new Date() }
			};
		}
	}
</script>

{#if !$currentUser || $allPages}
	<div class="fixed w-full" />

	{#if isSignupFormShown}
		<SignupForm />
	{/if}

	<div class="container mx-auto relative">
		<div class="flex relative">
			<div
				class="fixed mt-[70px] min-w-[426px] pt-0 h-screen overflow-y-scroll"
				in:fly={{ x: 50, duration: 150, delay: 150 }}
			>
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
									on:change={(evt) => {
										let slug = evt.target.value;

										if (slug === '') {
											page = { ...($pageDraft['_new'] || defaultPage) };
										} else {
											setPageAndDraft({ ...$allPages.find((p) => p.slug === evt.target.value) });
											refreshData();
										}
									}}
								>
									{#each $allPages as page}
										<option value={page.slug}>{page.name}</option>
									{/each}
									<option value="">⬜️ Create New Page</option>
								</select>
							{:else}
								<Loader />
							{/if}
						{:else}
							<a href={GOOGLE_LOGIN_URL}>
								<button class="_primary"> Log In </button>
							</a>
						{/if}
					</div>

					<div>
						<hr class="w-full" />
					</div>
				</div>

				{#if !$currentUser}
					<div class="mt-8">Launch your landing page in seconds 👇</div>
				{/if}

				<div class="w-[426px] p-4 pl-0 mr-4">
					{#if !isMetricsOpen && !isSubmissionsOpen}
						{#if !isOrdering}
							{#if page._id}
								<div class="w-full flex justify-between items-center mb-4">
									<EmojiPicker bind:icon={page.logo} />

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
												Forms ({submissions?.results?.length || 0})
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
							<div class="_section">
								<div class="_title">Tagline</div>
								<input
									class="w-full"
									bind:value={page.title}
									placeholder="Build a better product in public and grow your audience."
								/>
							</div>

							{#if page._id}
								<div class="_section">
									<div class="_title">Subtitle</div>

									<textarea
										bind:value={page.subtitle}
										rows="4"
										class="w-full"
										placeholder="Momentum instructs you how to create and distribute your content. Add subscribers early and build based on real users feedback.
              "
									/>
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
											on:fileUploaded={(evt) => fileUploaded(evt.detail, 'demoUrl')}
										/>
									</div>
								</div>
							{/if}

							{#if page._id}
								<div class="_section">
									<div class="_title">Call To Action</div>

									<div class="font-normal text-sm opacity-70 mb-2">Button text</div>

									<input
										class="mb-4 w-full"
										bind:value={page.callToAction}
										placeholder="Join Waitlist"
									/>

									<div class="font-normal text-sm opacity-70 mb-2">
										URL to open once email submitted (optional)
									</div>

									<input class="w-full mb-4" bind:value={page.actionUrl} placeholder="Action Url" />

									<!-- <div class="flex items-center mt-2 text-[14px]">
              <input type="checkbox" class="mr-2"  /> Collect Emails
            </div> -->
								</div>
							{/if}

							{#if page._id}
								<div class="_section">
									<div class="flex justify-between items-center">
										<div class="_title" style="margin: 0;">Testimonials</div>

										<div class="text-right w-full">
											<a class="cursor-pointer text-[#8B786D]" on:click={addNewTestimonial}
												>Add Testimonial</a
											>
										</div>
									</div>

									{#each page.testimonials || [] as testimonial}
										<div class="flex justify-between items-center">
											<div class="font-normal text-sm opacity-70 mb-2 mt-4">Name</div>
											<div
												class="text-sm cursor-pointer text-[#8B786D]"
												on:click={() => removeTestimonial(testimonial)}
											>
												Remove
											</div>
										</div>

										<input
											class="mb-4 w-full"
											bind:value={testimonial.name}
											placeholder="Victoriya Barovskaya, CEO, Kickstart"
										/>

										<div class="font-normal text-sm opacity-70 mb-2">Their Comment</div>

										<textarea
											class="w-full mb-4"
											bind:value={testimonial.comment}
											placeholder="These action plans finally made me post daily and share the Kickstart news with a wide audience. Great to start!"
											rows="3"
										/>

										<div class="font-normal text-sm opacity-70 mb-2">Their Avatar</div>
										<div class="flex items-center">
											<FileInput
												class="w-full"
												theme="light"
												bind:url={testimonial.avatarUrl}
												on:fileUploaded={(evt) => {
													testimonial.avatarUrl = evt.detail.url;
												}}
											/>
										</div>

										<hr class="my-4 border-[#8B786D] opacity-30" />
									{/each}
									<!-- <div class="flex items-center mt-2 text-[14px]">
                <input type="checkbox" class="mr-2"  /> Collect Emails
              </div> -->
								</div>
							{/if}
						{/if}

						{#if page._id}
							<hr class="my-8 border-[#8B786D] opacity-30" />

							<div
								class="bg-white rounded-xl w-[426px] flex top-[0px] sticky z-30 w-full p-4 my-4 justify-between items-center"
								style="border: 1px #e0dede solid;"
							>
								<div class="flex items-center">
									<div class="font-bold">
										🧱 Sections

										{#if page.sections?.length > 1 && !isOrdering}
											<div
												class="ml-5 font-normal text-sm cursor-pointer opacity-70"
												on:click={() => (isOrdering = true)}
											>
												Reorder
											</div>
										{/if}
									</div>

									{#if page.sections?.length}
										<div class="ml-4 number-tag">
											{page.sections?.length || 0}
										</div>
									{/if}
								</div>

								{#if !isOrdering}
									<div>
										<button
											class="_secondary small w-full text-center cursor-pointer text-[#8B786D]"
											on:click={() => {
												page.sections = [
													...(page.sections || []),
													{ columns: 1, items: [{ title: '', description: '' }] }
												];
											}}
										>
											Add section
										</button>
									</div>
								{/if}
							</div>
						{/if}
						{#if page._id}
							{#if !isOrdering}
								<div>
									{#each page.sections || [] as section}
										<EditSection
											bind:section
											onRemove={() => {
												page.sections = page.sections.filter((s) => s !== section);
											}}
										/>
									{/each}
								</div>
							{:else}
								{addGuids(page.sections) && ''}
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
							{/if}
						{/if}
						<hr class="my-8 border-[#8B786D] opacity-30" />

						{#if page._id && !isOrdering}
							<div class="_section">
								<div class="flex justify-between items-center">
									<div class="_title" style="margin: 0">Build in Public Wall</div>
									<div>
										<a
											href={page.streamSlug ? `${STREAM_URL}/${page.streamSlug}` : ''}
											target="_blank"
											on:click={(evt) => {
												if (!page.streamSlug) {
													evt.preventDefault();
													embedStream();
												}
											}}
										>
											<button
												class="_primary _small"
												style={page.streamSlug ? 'background-color:green' : ''}
											>
												{#if !page.streamSlug}
													⚡️ Embed Wall
												{:else}
													⚡️ Submit Post
												{/if}
											</button>
										</a>
									</div>
								</div>

								{#if !page.streamSlug}
									<div class="font-normal text-sm opacity-70 mt-4">
										Embed live content feed with your posts from social networks and blogs.
									</div>
								{/if}
							</div>
						{/if}

						<!-- <div class="_section">
          <div class="_title">Appearance</div> 

        </div> -->

						{#if isOrdering}
							<button
								class="mt-8 _secondary {isLoading ? 'loading' : ''}"
								on:click={() => (isOrdering = false)}
							>
								✅ Save Sections Order
							</button>
						{:else}
							<div class="flex items-center w-full justify-between mt-8 mb-32">
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
								</button>

								{#if page.isDirty}
									<div
										class="cursor-pointer text-sm opacity-70"
										on:click={() => {
											setPageAndDraft(
												page._id
													? { ...$allPages.find((p) => p.slug === page.slug) }
													: { ...defaultPage },
												{ force: true }
											);
										}}
									>
										Reset Page
									</div>
								{/if}
							</div>
						{/if}
					{/if}
				</div>
			</div>

			{#if isSubmissionsOpen || isMetricsOpen}
				<div
					class="fixed min-w-[426px] pr-4 pt-4 overflow-y-scroll mt-[70px]"
					in:fly={{ x: -50, duration: 150, delay: 150 }}
					style="height: calc(100vh - 60px);"
				>
					<div
						class="flex items-center cursor-pointer text-[#8B786D]"
						on:click={() => {
							isSubmissionsOpen = false;
							isMetricsOpen = false;
						}}
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M10.114 4.04508L2.95451 11.2045C2.51517 11.6439 2.51517 12.3562 2.95451 12.7955L10.114 19.955C10.5533 20.3943 11.2656 20.3943 11.705 19.955C12.1443 19.5156 12.1443 18.8033 11.705 18.364L6.46599 13.125H20.25C20.8713 13.125 21.375 12.6214 21.375 12C21.375 11.3787 20.8713 10.875 20.25 10.875H6.46599L11.705 5.63607C12.1443 5.19673 12.1443 4.48442 11.705 4.04508C11.2656 3.60574 10.5533 3.60574 10.114 4.04508Z"
								fill="#8B786D"
							/>
						</svg>
						Back to Editor
					</div>

					{#if isMetricsOpen}
						{#if metrics}
							<div class="mt-8">
								<WaveDashboard stats={metrics} columns={1} isSinglePage />
							</div>
						{:else}
							<Loader />
						{/if}
					{/if}

					{#if isSubmissionsOpen}
						{#if submissions}
							<div class="mt-4">
								<div class="text-lg font-bold">Forms Submissions: {submissions.results.length}</div>
								{#each submissions.results as submission}
									<div class="flex my-2 opacity-90 w-full justify-between items-center">
										<div>
											{submission.email}
										</div>
										<div class="text-sm opacity-70">
											{moment(submission.createdOn).format('MMM DD HH:MM')}
										</div>
									</div>
								{/each}
							</div>
						{/if}
					{/if}
				</div>
			{/if}

			{#if page._id && !isOrdering}
				<hr class="my-8 border-[#8B786D] opacity-30" />
			{/if}

			{#if page.name || page.title}
				<div class="relative ml-[426px] _preview p-4 mx-4" in:fade={{ delay: 150 }}>
					{#if page._id}
						<div class="sticky top-[20px] w-full z-50 h-[0px]">
							<div class="mx-auto">
								{#if isJustCreated}
									<ConfettiExplosion particleCount={200} force={0.3} />
								{/if}
							</div>

							<div
								class="relative _published-label flex items-center mt-4"
								style="padding: 7px 14px;"
							>
								<a
									href="{PAGE_URL}/{page.slug}"
									class="flex justify-center {page.isDirty ? 'max-w-[240px]' : 'w-full'}"
									style="color: #5375F0; overflow: hidden; text-overflow: ellipsis;"
									target="_blank"
									rel="noreferrer"
								>
									<div
										class="mr-2 ml-4 z-20"
										use:tooltip
										title={page.isDirty ? 'Pending Changes' : 'Published'}
									>
										{#if !page.isDirty}
											✅
										{:else}
											🌝
										{/if}
									</div>

									{PAGE_URL.replace('https://', '')}/{page.slug}
								</a>

								{#if page.isDirty}
									<button
										class="absolute right-0 _primary flex justify-center w-full {isLoading
											? 'loading'
											: ''}"
										style="margin-left: 80px;
                  border-radius: 30px;
                  width: auto;
                  padding: 4px 45px;"
										transition:fly={{ x: 50, duration: 150 }}
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
									</button>
								{/if}
							</div>
						</div>
					{/if}

					<SitePreview noStickyHeader={true} bind:page />
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
