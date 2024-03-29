<script>
	export let page;
	export let streamSlug;
	export let width = 600;
	export let title = 'Share Content';
	export let placeholderTitle = `We've got 20 new signups last week 🎉`;
	export let contentTextareaRows = 14;
	export let placeholderContent = `It was a busy and nervous week but results looks good! After sleepless nights and hustling hours on Twitter I've got 20 new sign ups. Targeting 40 this week!`;
	export let description = '';
	export let isPostOnly = false;

	import { slide, fly, scale, fade } from 'svelte/transition';
	import { get, post, put } from 'lib/api';
	import { GOOGLE_LOGIN_URL, LINKEDIN_LOGIN_URL, TWITTER_LOGIN_URL, PAGE_URL } from 'lib/env';

	import Button from 'lib/components/Button.svelte';
	import Modal from 'lib/components/Modal.svelte';
	import FileInput from 'lib/components/FileInput.svelte';
	import KickstartPromo from 'lib/components/KickstartPromo.svelte';

	import TwitterIcon from 'lib/icons/twitter.svelte';
	import LinkedInIcon from 'lib/icons/linkedin.svelte';
	import RedditIcon from 'lib/icons/reddit.svelte';

	import isUrl from 'lib/helpers/isUrl';
	import clickOutside from 'lib/use/clickOutside';
	import currentUser from 'lib/stores/currentUser';

	import { showSuccessMessage } from 'lib/services/toast';

	export let onSent = () => {};

	let urlToSubmitToStream;

	export let isCollapsed = true;
	export let isFixed = false;

	let urlEl;
	let titleEl;

	let activeTab;

	export let newMoment = {};

	const setTab = (selectedTab) => {
		activeTab = selectedTab;

		if (selectedTab === 'new') {
			newMoment = {
				isSyncToTwitter: $currentUser.oauth?.twitter,
				isSyncToLinkedIn: $currentUser.oauth?.linkedin
			};

			setTimeout(() => {
				titleEl.focus();
			}, 0);
		}
	};

	setTab('new');

	let submitLink = async () => {
		if (urlToSubmitToStream && isUrl(urlToSubmitToStream)) {
			if (page && !page.streamSlug) {
				const data = await put(`pages/${page._id}/embed-stream`);
				page.streamSlug = data.streamSlug;
				streamSlug = page.streamSlug;
			}

			await post('feed/from-url', {
				url: urlToSubmitToStream,
				projectSlug: streamSlug
			});

			urlToSubmitToStream = null;
			if (isFixed) {
				isCollapsed = true;
			}
			showSuccessMessage('Congrats! Your post is published.');

			onSent();
		} else {
			throw new Error('Please insert a valid url');
		}
	};

	let publishNewMoment = async () => {
		if (page && !page.streamSlug) {
			const data = await put(`pages/${page._id}/embed-stream`);
			page.streamSlug = data.streamSlug;
			streamSlug = page.streamSlug;
		}

		await post('feed', {
			title: newMoment.title,
			content: newMoment.content,
			attachments: [{ type: 'image', url: newMoment.imageUrl }],
			projects: [{ slug: streamSlug }],
			isSyncToTwitter: newMoment.isSyncToTwitter,
			isSyncToLinkedIn: newMoment.isSyncToLinkedIn
		});

		newMoment = {};

		showSuccessMessage('Congrats! Your post is published.');
		onSent();
	};

	let linkedInLogin = async () => {
		const { url } = await get(LINKEDIN_LOGIN_URL);
		window.document.location.href = url;
	};

	let twitterLogin = async () => {};

	let onSyncToTwitterClick = async () => {
		if (!$currentUser.oauth?.twitter) {
			const { url } = await get(TWITTER_LOGIN_URL);
			window.document.location.href = url;
		}
	};

	let onSyncToLinkedInClick = async () => {
		if (!$currentUser.oauth?.linkedin) {
			const { url } = await get(LINKEDIN_LOGIN_URL);
			window.document.location.href = url;
		}
	};

	let isKickstartModalShown = false;
</script>

{#if isKickstartModalShown}
	<Modal isShown={true} onClosed={() => (isKickstartModalShown = false)}>
		<KickstartPromo />
	</Modal>
{/if}

{#if $currentUser}
	<div
		in:fly={{ y: 50, duration: 150, delay: 150 }}
		use:clickOutside
		on:clickOutside={() => {
			if (isFixed) {
				isCollapsed = true;
			}
		}}
		class="{isFixed ? 'fixed right-12 bottom-0' : ''} {isCollapsed
			? 'p-4'
			: 'p-8'} bg-[#222] text-white {isCollapsed ? 'rounded-xl' : 'rounded-2xl'} opacity-98"
		style="z-index: 100; width: {width};"
	>
		{#if isCollapsed}
			<div class="flex">
				<!-- <div class="w-[30px] mr-4">
				<svg
					style="width: 150px; height: 30px; margin-left: -13px;"
					width="659"
					height="155"
					viewBox="0 0 659 155"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M5.1804 18.2637C0 27.0232 0 38.8475 0 62.496V92.504C0 116.153 0 127.977 5.1804 136.736C8.37002 142.13 12.8703 146.63 18.2637 149.82C27.0232 155 38.8475 155 62.496 155H92.504C116.153 155 127.977 155 136.736 149.82C142.13 146.63 146.63 142.13 149.82 136.736C155 127.977 155 116.152 155 92.504V62.496C155 38.8475 155 27.0232 149.82 18.2637C146.63 12.8703 142.13 8.37002 136.736 5.1804C127.977 0 116.152 0 92.504 0H62.496C38.8475 0 27.0232 0 18.2637 5.1804C12.8703 8.37002 8.37002 12.8703 5.1804 18.2637ZM104.35 66.9178C104.664 67.1502 104.664 68.1594 104.664 70.1779V103.864C104.664 104.849 104.664 105.342 104.88 105.707C105.013 105.931 105.2 106.119 105.425 106.252C105.79 106.468 106.282 106.468 107.268 106.468H130.756C131.742 106.468 132.234 106.468 132.599 106.252C132.824 106.119 133.011 105.931 133.144 105.707C133.36 105.342 133.36 104.849 133.36 103.864V52.7037C133.36 51.7184 133.36 51.2257 133.144 50.8607C133.011 50.636 132.824 50.4485 132.599 50.3156C132.234 50.0997 131.742 50.0997 130.756 50.0997H107.268C106.282 50.0997 105.79 50.0997 105.425 50.3156C105.2 50.4485 105.013 50.636 104.88 50.8607C104.664 51.2257 104.664 51.7184 104.664 52.7037V54.0327C104.664 55.4348 104.664 56.1358 104.333 56.5572C104.131 56.8138 103.854 57.0004 103.54 57.0902C103.025 57.2376 102.376 56.9732 101.078 56.4444L82.858 49.0245C81.9519 48.6555 81.4988 48.471 81.0813 48.5318C80.8243 48.5693 80.5808 48.6707 80.3731 48.8269C80.036 49.0804 79.848 49.5321 79.4719 50.4354L73.7409 64.2009C73.2197 65.4527 72.9592 66.0785 72.5041 66.3408C72.2266 66.5007 71.9063 66.5708 71.5874 66.5413C71.0644 66.4929 70.5663 66.033 69.5702 65.1131L54.1061 50.8319C53.3858 50.1667 53.0256 49.8341 52.6127 49.7446C52.3584 49.6895 52.0944 49.6993 51.8449 49.773C51.4398 49.8928 51.1052 50.2511 50.4361 50.9678L17.2868 86.4721C16.611 87.1959 16.2731 87.5578 16.1823 87.9735C16.1263 88.2295 16.1362 88.4955 16.2109 88.7466C16.3323 89.1545 16.696 89.4904 17.4235 90.1622L34.2867 105.735C35.007 106.401 35.3672 106.733 35.7801 106.823C36.0343 106.878 36.2984 106.868 36.5478 106.794C36.953 106.674 37.2876 106.316 37.9567 105.599L66.502 75.0262C68.0131 73.4077 68.7687 72.5985 69.1625 72.6489C69.3947 72.6786 69.6011 72.8116 69.7239 73.0109C69.9323 73.3489 69.5067 74.371 68.6557 76.4151L61.603 93.3552C61.2216 94.2713 61.0309 94.7294 61.0913 95.1513C61.1285 95.411 61.231 95.6571 61.3893 95.8664C61.6463 96.2064 62.1058 96.3935 63.0248 96.7678L84.4499 105.493C85.356 105.862 85.8091 106.047 86.2266 105.986C86.4836 105.948 86.7272 105.847 86.9348 105.691C87.2719 105.437 87.4599 104.986 87.836 104.082L102.16 69.6774C102.936 67.814 103.323 66.8823 103.703 66.7885C103.927 66.7332 104.164 66.7805 104.35 66.9178Z"
						fill="white"
					/>
				</svg>
			</div> -->
				<div class="relative">
					<textarea
						class="w-[300px] pl-[40px] _dark"
						rows="1"
						placeholder="What have you created today?"
						on:focus={() => {
							isCollapsed = false;
							setTimeout(() => {
								urlEl.focus();
							}, 0);
						}}
					/>

					<div class="absolute top-0 left-[0px]">
						<img src={$currentUser.avatarUrl} class="rounded-full w-[30px] m-1" />
					</div>
				</div>
			</div>
		{:else}
			<!-- <div class="justify-between">
				<div class="mb-2">
					<svg
						style="width: 150px; height: 30px; margin-left: -13px;"
						width="659"
						height="155"
						viewBox="0 0 659 155"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M5.1804 18.2637C0 27.0232 0 38.8475 0 62.496V92.504C0 116.153 0 127.977 5.1804 136.736C8.37002 142.13 12.8703 146.63 18.2637 149.82C27.0232 155 38.8475 155 62.496 155H92.504C116.153 155 127.977 155 136.736 149.82C142.13 146.63 146.63 142.13 149.82 136.736C155 127.977 155 116.152 155 92.504V62.496C155 38.8475 155 27.0232 149.82 18.2637C146.63 12.8703 142.13 8.37002 136.736 5.1804C127.977 0 116.152 0 92.504 0H62.496C38.8475 0 27.0232 0 18.2637 5.1804C12.8703 8.37002 8.37002 12.8703 5.1804 18.2637ZM104.35 66.9178C104.664 67.1502 104.664 68.1594 104.664 70.1779V103.864C104.664 104.849 104.664 105.342 104.88 105.707C105.013 105.931 105.2 106.119 105.425 106.252C105.79 106.468 106.282 106.468 107.268 106.468H130.756C131.742 106.468 132.234 106.468 132.599 106.252C132.824 106.119 133.011 105.931 133.144 105.707C133.36 105.342 133.36 104.849 133.36 103.864V52.7037C133.36 51.7184 133.36 51.2257 133.144 50.8607C133.011 50.636 132.824 50.4485 132.599 50.3156C132.234 50.0997 131.742 50.0997 130.756 50.0997H107.268C106.282 50.0997 105.79 50.0997 105.425 50.3156C105.2 50.4485 105.013 50.636 104.88 50.8607C104.664 51.2257 104.664 51.7184 104.664 52.7037V54.0327C104.664 55.4348 104.664 56.1358 104.333 56.5572C104.131 56.8138 103.854 57.0004 103.54 57.0902C103.025 57.2376 102.376 56.9732 101.078 56.4444L82.858 49.0245C81.9519 48.6555 81.4988 48.471 81.0813 48.5318C80.8243 48.5693 80.5808 48.6707 80.3731 48.8269C80.036 49.0804 79.848 49.5321 79.4719 50.4354L73.7409 64.2009C73.2197 65.4527 72.9592 66.0785 72.5041 66.3408C72.2266 66.5007 71.9063 66.5708 71.5874 66.5413C71.0644 66.4929 70.5663 66.033 69.5702 65.1131L54.1061 50.8319C53.3858 50.1667 53.0256 49.8341 52.6127 49.7446C52.3584 49.6895 52.0944 49.6993 51.8449 49.773C51.4398 49.8928 51.1052 50.2511 50.4361 50.9678L17.2868 86.4721C16.611 87.1959 16.2731 87.5578 16.1823 87.9735C16.1263 88.2295 16.1362 88.4955 16.2109 88.7466C16.3323 89.1545 16.696 89.4904 17.4235 90.1622L34.2867 105.735C35.007 106.401 35.3672 106.733 35.7801 106.823C36.0343 106.878 36.2984 106.868 36.5478 106.794C36.953 106.674 37.2876 106.316 37.9567 105.599L66.502 75.0262C68.0131 73.4077 68.7687 72.5985 69.1625 72.6489C69.3947 72.6786 69.6011 72.8116 69.7239 73.0109C69.9323 73.3489 69.5067 74.371 68.6557 76.4151L61.603 93.3552C61.2216 94.2713 61.0309 94.7294 61.0913 95.1513C61.1285 95.411 61.231 95.6571 61.3893 95.8664C61.6463 96.2064 62.1058 96.3935 63.0248 96.7678L84.4499 105.493C85.356 105.862 85.8091 106.047 86.2266 105.986C86.4836 105.948 86.7272 105.847 86.9348 105.691C87.2719 105.437 87.4599 104.986 87.836 104.082L102.16 69.6774C102.936 67.814 103.323 66.8823 103.703 66.7885C103.927 66.7332 104.164 66.7805 104.35 66.9178Z"
							fill="white"
						/>
					</svg>
				</div>
			</div> -->

			<h2 class="text-lg font-bold">{title}</h2>

			{#if description}
				<h3>{description}</h3>
			{/if}

			{#if !isPostOnly}
				<div class="flex mt-4 mb-8">
					<button
						class="tab p-2 mr-2"
						class:selected={activeTab === 'new'}
						on:click={() => setTab('new')}>📢 Post</button
					>

					<!-- <button
						class="tab p-2 mr-2"
						class:selected={activeTab === 'article'}
						on:click={() => setTab('article')}>🧑‍💻 Article</button
					>
					<button
						class="tab p-2 mr-2"
						class:selected={activeTab === 'newsletter'}
						on:click={() => setTab('newsletter')}>✉️ Newsletter</button
					> -->
					<button
						class="tab p-2"
						class:selected={activeTab === 'url'}
						on:click={() => setTab('url')}>🔗 URL</button
					>
				</div>
			{/if}

			{#if activeTab === 'url'}
				<div class="mt-4 mb-2 font-bold">Post URL</div>

				<div class="text-sm mb-4">
					URL to your Tweet, LinkedIn post, YouTube Video, Blog Article, Notion Document or any
					other link you've created
				</div>

				<input
					class="_dark w-full"
					type="text"
					bind:this={urlEl}
					placeholder="https://twitter.com/nano_fund/status/1655892754252038145"
					bind:value={urlToSubmitToStream}
				/>

				<div class="flex justify-between items-center mt-4">
					<div>
						{#if urlToSubmitToStream}
							<div in:fade={{ duration: 150 }}>
								<Button
									disabled={!urlToSubmitToStream || !isUrl(urlToSubmitToStream)}
									class="_primary _small"
									onClick={submitLink}>Submit</Button
								>
							</div>
						{:else}
							&nbsp;
						{/if}
					</div>

					<!-- <div>Get $165k in tech discounts</div> -->
				</div>
			{:else if activeTab === 'new'}
				<!-- <div class="mt-4 mb-2 font-bold">Title</div>
				<input
					class="_dark w-full"
					type="text"
					bind:this={titleEl}
					placeholder={placeholderTitle}
					bind:value={newMoment.title}
				/> -->

				{#if !$currentUser.oauth?.twitter && !$currentUser.oauth?.linkedin}
					<div class="p-4 rounded-lg text-center" style="border: orange 2px solid;">
						<h3>Connect your social accounts to distribute.</h3>

						<div class="flex sm:flex-row flex-col justify-center mt-2">
							<button
								class="small sm:mr-4 shrink-0 flex items-center"
								on:click={onSyncToTwitterClick}
							>
								<div class="w-[20px] h-[20px] mr-2"><TwitterIcon /></div>
								Connect Twitter</button
							>
							<button class="small shrink-0 flex items-center " on:click={onSyncToLinkedInClick}>
								<div class="w-[20px] h-[20px] mr-2"><LinkedInIcon /></div>
								Connect LinkedIn</button
							>
						</div>
					</div>
				{/if}

				<div class="mt-4 mb-2 font-bold">Content</div>
				<textarea
					class="_dark w-full"
					type="text"
					rows={contentTextareaRows}
					placeholder={placeholderContent}
					bind:value={newMoment.content}
				/>

				<div class="mt-4 mb-2 font-bold">Attachment</div>
				<FileInput class="_dark w-full" theme="dark" bind:url={newMoment.imageUrl} />

				{#if $currentUser.oauth?.linkedin || $currentUser.oauth?.twitter}
					<div class="mt-8">
						<input
							class="mr-2"
							type="checkbox"
							on:click={onSyncToTwitterClick}
							bind:checked={newMoment.isSyncToTwitter}
						/>Sync to Twitter

						<input
							class="ml-4 mr-2"
							type="checkbox"
							on:click={onSyncToLinkedInClick}
							bind:checked={newMoment.isSyncToLinkedIn}
						/>Sync to LinkedIn
					</div>

					<div class="flex items-center mt-8">
						<div>
							<Button class="_primary _small mr-8" onClick={publishNewMoment}>Publish Update</Button
							>
						</div>
						<div class="cursor-pointer" on:click={() => setTab('url')}>Post URL instead</div>
					</div>
				{:else}{/if}
			{/if}

			<!-- <hr class="my-8 border-[#8B786D] opacity-30" />

		<div class="flex justify-center">
			<div class="bg-green-600 rounded-xl mb-8 px-4 inline-block" style="transform: rotate(-5deg);">
				💥 Coming Soon (We Hope)
			</div>
		</div>

		<div class="grid grid-cols-2 gap-4 opacity-60">
			<div class="flex items-center p-2 border rounded-lg">
				<div class="w-[25px] mr-2"><TwitterIcon /></div>
				Tweet Update
			</div>
			<div class="flex items-center p-2 border rounded-lg">
				<div class="w-[25px] mr-2"><LinkedInIcon /></div>

				Write LinkedIn Post
			</div>
			<div class="flex items-center p-2 border rounded-lg">
				<div class="w-[25px] mr-2">
					<svg
						style="width: 100px; height: 25px;"
						width="659"
						height="155"
						viewBox="0 0 659 155"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M5.1804 18.2637C0 27.0232 0 38.8475 0 62.496V92.504C0 116.153 0 127.977 5.1804 136.736C8.37002 142.13 12.8703 146.63 18.2637 149.82C27.0232 155 38.8475 155 62.496 155H92.504C116.153 155 127.977 155 136.736 149.82C142.13 146.63 146.63 142.13 149.82 136.736C155 127.977 155 116.152 155 92.504V62.496C155 38.8475 155 27.0232 149.82 18.2637C146.63 12.8703 142.13 8.37002 136.736 5.1804C127.977 0 116.152 0 92.504 0H62.496C38.8475 0 27.0232 0 18.2637 5.1804C12.8703 8.37002 8.37002 12.8703 5.1804 18.2637ZM104.35 66.9178C104.664 67.1502 104.664 68.1594 104.664 70.1779V103.864C104.664 104.849 104.664 105.342 104.88 105.707C105.013 105.931 105.2 106.119 105.425 106.252C105.79 106.468 106.282 106.468 107.268 106.468H130.756C131.742 106.468 132.234 106.468 132.599 106.252C132.824 106.119 133.011 105.931 133.144 105.707C133.36 105.342 133.36 104.849 133.36 103.864V52.7037C133.36 51.7184 133.36 51.2257 133.144 50.8607C133.011 50.636 132.824 50.4485 132.599 50.3156C132.234 50.0997 131.742 50.0997 130.756 50.0997H107.268C106.282 50.0997 105.79 50.0997 105.425 50.3156C105.2 50.4485 105.013 50.636 104.88 50.8607C104.664 51.2257 104.664 51.7184 104.664 52.7037V54.0327C104.664 55.4348 104.664 56.1358 104.333 56.5572C104.131 56.8138 103.854 57.0004 103.54 57.0902C103.025 57.2376 102.376 56.9732 101.078 56.4444L82.858 49.0245C81.9519 48.6555 81.4988 48.471 81.0813 48.5318C80.8243 48.5693 80.5808 48.6707 80.3731 48.8269C80.036 49.0804 79.848 49.5321 79.4719 50.4354L73.7409 64.2009C73.2197 65.4527 72.9592 66.0785 72.5041 66.3408C72.2266 66.5007 71.9063 66.5708 71.5874 66.5413C71.0644 66.4929 70.5663 66.033 69.5702 65.1131L54.1061 50.8319C53.3858 50.1667 53.0256 49.8341 52.6127 49.7446C52.3584 49.6895 52.0944 49.6993 51.8449 49.773C51.4398 49.8928 51.1052 50.2511 50.4361 50.9678L17.2868 86.4721C16.611 87.1959 16.2731 87.5578 16.1823 87.9735C16.1263 88.2295 16.1362 88.4955 16.2109 88.7466C16.3323 89.1545 16.696 89.4904 17.4235 90.1622L34.2867 105.735C35.007 106.401 35.3672 106.733 35.7801 106.823C36.0343 106.878 36.2984 106.868 36.5478 106.794C36.953 106.674 37.2876 106.316 37.9567 105.599L66.502 75.0262C68.0131 73.4077 68.7687 72.5985 69.1625 72.6489C69.3947 72.6786 69.6011 72.8116 69.7239 73.0109C69.9323 73.3489 69.5067 74.371 68.6557 76.4151L61.603 93.3552C61.2216 94.2713 61.0309 94.7294 61.0913 95.1513C61.1285 95.411 61.231 95.6571 61.3893 95.8664C61.6463 96.2064 62.1058 96.3935 63.0248 96.7678L84.4499 105.493C85.356 105.862 85.8091 106.047 86.2266 105.986C86.4836 105.948 86.7272 105.847 86.9348 105.691C87.2719 105.437 87.4599 104.986 87.836 104.082L102.16 69.6774C102.936 67.814 103.323 66.8823 103.703 66.7885C103.927 66.7332 104.164 66.7805 104.35 66.9178Z"
							fill="white"
						/>
					</svg>
				</div>
				Write Blog Article
			</div>

			<div class="flex items-center p-2 border rounded-lg">
				<div class="w-[20px] mr-4"><RedditIcon /></div>

				Write Reddit Post
			</div>
		</div> -->
		{/if}
	</div>
	<!-- <div
		class="flex items-center justify-end cursor-pointer my-2"
		on:click={() => {
			isKickstartModalShown = true;
		}}
	>
		<div class="mr-2 flex-shrink-0">🥾 Kickstart:</div>
		<h2 class="mr-2 flex-shrink-0">0/15</h2>
		days
	</div> -->
{/if}
