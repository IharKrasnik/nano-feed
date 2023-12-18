<script>
	import moment from 'moment';
	import { v4 as uuidv4 } from 'uuid';
	import _ from 'lodash';

	import { countryCodeEmoji } from 'country-code-emoji';
	import { ConfettiExplosion } from 'svelte-confetti-explosion';
	import { fly, fade } from 'svelte/transition';
	import { LinkedChart, LinkedLabel, LinkedValue } from 'svelte-tiny-linked-charts';

	import clickOutside from 'lib/use/clickOutside';
	import { get } from 'lib/api';

	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import Button from 'lib/components/Button.svelte';
	import SourceLogo from 'lib/components/SourceLogo.svelte';

	import customers from 'lib/stores/emulator/customers';
	import totalViews from 'lib/stores/emulator/totalViews';
	import emailAddress from 'lib/stores/emulator/emailAddress';
	import feed from 'lib/stores/emulator/feed';
	import pageTitle from 'lib/stores/emulator/pageTitle';

	let viewChartData = {};

	let DATE_FORMAT = 'MMM DD';
	let TOTAL_VIEWS_LS_KEY = 'TOTAL_VIEWS';

	let isLaunched = !!$pageTitle;

	let weekAgoM = moment().subtract(7, 'days');
	let weekAgoViews = Math.random() * 100 + 420;

	let prevViewsCount = weekAgoViews;

	let iterateM = weekAgoM.clone();

	let websiteEl;
	let analyticsEl;
	let customersEl;
	let chatEl;
	let feedEl;
	let moreEl;

	let highlightSection = (sectionEl, { timeout = 0 } = {}) => {
		sectionEl.isHighlighted = true;

		if (timeout) {
			setTimeout(() => {
				sectionEl.isHighlighted = false;
			}, timeout);
		}
	};

	_.range(0, 7).map((i) => {
		prevViewsCount = prevViewsCount + i * (Math.random() * 50);
		viewChartData[iterateM.format(DATE_FORMAT)] = prevViewsCount;
		iterateM.add(1, 'day');
	});

	let firstChart = { ...viewChartData, _refreshTimestamp: new Date() };

	Object.keys(firstChart).forEach((key) => {
		if (key !== weekAgoM.format(DATE_FORMAT)) {
			firstChart[key] = 0;
		} else {
			firstChart[key] = 1;
		}
	});

	let usersOnline = $totalViews ? 0 : -1;

	let selectedCustomer = $customers[0];

	let newMessage = {
		guid: uuidv4(),
		content: ''
	};

	let conversionRate = -1;

	$: if ($totalViews) {
		conversionRate = $customers.length ? (($customers.length / $totalViews) * 100).toFixed(2) : 0;
	}

	let autoMessage = {
		content: 'Hey! Welcome to coolco. Reply to this email to jump on a call with me!',
		isAuto: true
	};

	let getIconFromType = (type) => {
		if (type === 'open') {
			return 'eye';
		} else if (type === 'click') {
			return 'mouse-pointer';
		} else if (type === 'form-submit') {
			return 'clipboard';
		}
	};

	let selectedFeedTab = $customers.length > 2 ? 'url' : 'post';

	let feedItem = {
		guid: uuidv4(),
		content:
			$customers.length < 2
				? 'Check out my awesome website!'
				: $customers.length < 2
				? `I've got ${totalViews} views. And a BIG signup!`
				: '',
		url: $customers.length > 2 ? 'https://twitter.com/that_igor_/status/1731356427292168443' : '',
		isSyncToTwitter: true,
		isSyncToLinkedin: false
	};

	let EMAIL_ADDRESS_LS_KEY = 'EMAIL';

	let isJustJoined = false;
	let isJoined = !!$emailAddress;

	let join = () => {
		isJoined = true;
		isJustJoined = true;

		let me = $customers.find((c) => c.isMe);

		if (me) {
			me.email = $emailAddress;
			localStorage[CUSTOMERS_KEY] = JSON.stringify(customers);
			return;
		}

		let newCustomer = { email: $emailAddress, messages: [], isMe: true, createdOn: new Date() };
		$customers = [...$customers, newCustomer];
		selectedCustomer = newCustomer;

		setTimeout(() => {
			isJustJoined = false;
		}, 3000);

		localStorage[EMAIL_ADDRESS_LS_KEY] = $emailAddress;

		setTimeout(() => {
			newCustomer.messages = selectedCustomer.messages = [
				{ ...autoMessage, guid: uuidv4(), sentOn: new Date() }
			];
			$customers = [...$customers];
		}, 1000);

		highlightSection(chatEl);
	};

	let elon = $customers.find((c) => c.email === 'elon@x.com') || {
		deviceIcon: 'smartphone',
		deviceName: 'ios',
		email: 'elon@x.com',
		referrerUrl: 'x.com',
		country: 'US',
		imageUrl:
			'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1701607809457-image.png',
		messages: [
			{
				guid: uuidv4(),
				content: 'Hey, Elon! Welcome to coolco. Reply to this email to jump on a call with me!',
				isAuto: true
			}
		],
		events: [
			{
				date: new Date(),
				type: 'open',
				text: 'Open /?utm=test'
			},
			{
				date: new Date(),
				type: 'form-submit',
				text: 'Submitted email'
			}
		]
	};
	let signupElon = () => {
		if ($customers.find((u) => u.email === 'elon@x.com')) {
			return;
		}

		elon.createdOn = new Date();
		$customers = [...$customers, elon];
		highlightSection(customersEl);
	};

	let selectElon = () => {
		selectedCustomer = elon;
		customersEl.isHighlighted = false;

		if (elon.messages?.length === 1) {
			setTimeout(() => {
				chatEl.isHighlighted = true;

				elon.messages = selectedCustomer.messages = [
					...elon.messages,
					{
						guid: uuidv4(),
						content: `Yo! Sure, I'd be happy to meet. You have awesome project here, I'm keen to invest.`,
						isFromCustomer: true
					}
				];

				$customers = [...$customers];

				feedItem.content = `I've got ${$totalViews} views to my page! And a BIG signup.`;
				feedItem.isSyncToLinkedin = true;

				feedEl.isHighlighted = true;
			}, 2000);
		}
	};

	let satya = $customers.find((c) => c.email === 'satya@microsoft.com') || {
		email: 'satya@microsoft.com',
		deviceIcon: 'monitor',
		deviceName: 'Windows',
		referrerUrl: 'linkedin.com',
		country: 'US',
		imageUrl:
			'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1701675584808-image.png',
		events: [
			{
				date: new Date(),
				type: 'open',
				text: 'Open /?utm=test'
			},
			{
				date: new Date(),
				type: 'click',
				text: 'Clicked link /about'
			},
			{
				date: new Date(),
				type: 'form-submit',
				text: 'Submitted email'
			}
		],
		messages: [
			{
				guid: uuidv4(),
				content: 'Hey, Satya! Welcome to coolco. Reply to this email to jump on a call with me!',
				isAuto: true
			}
		]
	};

	let signupSatya = () => {
		if ($customers.find((u) => u.email === 'satya@microsoft.com')) {
			return;
		}

		satya.createdOn = new Date();

		satya.messages.push({
			guid: uuidv4(),
			isFromCustomer: true,
			content: `Hi! Absolutely, I'm excited to meet. And you know, I have a taste for great people!`
		});

		$customers = [...$customers, satya];

		setTimeout(() => {
			feedItem.content = '';
			selectedFeedTab = 'url';
			feedItem.url = 'https://twitter.com/that_igor_/status/1731356427292168443';
		}, 0);

		highlightSection(customersEl, { timeout: 3000 });
	};

	let chartRefreshTimestamp = new Date();

	let sendToFeed = async () => {
		if (!feedItem.content && !feedItem.url) {
			return;
		}

		customersEl.isHighlighted = false;
		chatEl.isHighlighted = false;

		feedItem.createdOn = new Date();

		if (feedItem.isSyncToTwitter) {
			signupElon();
		}

		if (feedItem.isSyncToLinkedin) {
			signupSatya();
		}

		let nowM = moment();

		let lastVisitorsCount = firstChart[weekAgoM.format(DATE_FORMAT)] || 0;
		let newVisitorsCount = parseInt(
			lastVisitorsCount === 1 ? Math.random() * 80 + 20 : lastVisitorsCount * (1.1 + Math.random())
		);
		$totalViews += newVisitorsCount;

		if (weekAgoM < nowM) {
			setTimeout(() => {
				weekAgoM.add(1, 'day');

				firstChart[weekAgoM.format(DATE_FORMAT)] = 1 + newVisitorsCount;
				firstChart = { ...firstChart };
				chartRefreshTimestamp = new Date();
			}, 1000);
		}

		if (feedItem.url) {
			const data = await get('utils/fetch-meta-tags', {
				url: feedItem.url
			});

			feedItem.url = data.url || feedItem.url;
			feedItem.embedUrl = data.embedUrl;

			feedItem.title = data.title;
			feedItem.content = data.description;

			if (data.image) {
				feedItem.attachments = [{ type: 'image', url: data.image }];
			}
		} else {
			feedItem.content = feedItem.content || 'Check out my awesome website';
		}

		$feed = [{ ...feedItem }, ...$feed];

		feedItem = {
			guid: uuidv4(),
			content: '',
			url: $feed.filter((f) => f.url).length
				? !$feed.find((f) => f.url.includes('twitter.com'))
					? 'https://twitter.com/that_igor_/status/1731356427292168443'
					: !$feed.find((f) => f.url.includes('linkedin.com'))
					? 'https://www.linkedin.com/feed/update/urn:li:activity:7042521257401102336/'
					: !$feed.find((f) => f.url.includes('linkedin.com'))
					? 'https://www.reddit.com/r/startups/comments/z3s8m4/9_tips_for_nontech_founders_to_build_the_right/'
					: 'https://momentum.page'
				: ''
		};

		feedEl.isHighlighted = !!feedItem.url;
	};

	let offlineTimeout;

	let pageTagline = '';

	let reset = () => {
		$feed = [];
		$customers = [];
		$pageTitle = '';
		$emailAddress = '';
		$totalViews = -1;
		isLaunched = false;
		isJoined = false;
		selectedCustomer = null;
		[chatEl, customersEl, analyticsEl, feedEl, moreEl].forEach((el) => (el.isHighlighted = false));
	};

	let launchPage = () => {
		if (!$pageTitle.trim()) {
			$pageTitle = 'My Awesome Website';
		}
		isLaunched = true;
	};

	let sendMessage = () => {
		if (!newMessage.content) {
			return;
		}

		if (!newMessage.guid) {
			newMessage.guid = uuidv4();
		}

		newMessage.sentOn = new Date();
		selectedCustomer.messages = [...selectedCustomer.messages, { ...newMessage }];
		$customers = [...$customers];

		newMessage.content = '';
		newMessage.guid = uuidv4();

		chatEl.isHighlighted = false;

		if (!$feed.length) {
			highlightSection(feedEl);
		}
	};
</script>

<div class="highlighted hidden" />

<div class="flex flex-col sm:flex-row justify-between items-center mb-2">
	<div class="text-white font-medium">Try Momentum Demo</div>
	<div class="text-white text-xs opacity-80">Use this emulator to see how Momentum works</div>
</div>

<div class="grid grid-cols-12 items-stretch gap-4 text-white">
	<div
		class="relative col-span-12 sm:col-span-8 h-full overflow-hidden text-[#111] shadow shadow-white"
		bind:this={websiteEl}
	>
		<div
			class="bg-root absolute z-10 inset-0 -z-50 w-full h-full bg-[linear-gradient(to_right,#00000012_1px,transparent_1px),linear-gradient(to_bottom,#00000012_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(75%_50%_at_top_center,white,transparent)]"
		/>

		<div
			class="relative z-10 border border-white/80 rounded-sm h-full"
			on:click={() => {
				if (isLaunched) {
					if (usersOnline === -1 || usersOnline === 0) {
						usersOnline = 1;
					}

					if ($totalViews === -1) {
						$totalViews = 1;
					}

					if (offlineTimeout) {
						clearTimeout(offlineTimeout);
					}
				}
			}}
			use:clickOutside
			on:clickOutside={() => {
				offlineTimeout = setTimeout(() => {
					if (usersOnline === 1) {
						usersOnline = 0;
					}
				}, 1000);
			}}
		>
			{#if isLaunched}
				<div class="absolute w-full left-0 top-0 bg-[rgba(255,255,255,.3)] backdrop-blur z-10">
					<div
						class="relative border-b  border-black/20 px-4 flex items-center justify-between text-xxs"
					>
						<div class="">🔥 coolco</div>
						<div class="flex gap-2">
							<div>About</div>
							<div>Blog</div>
						</div>
					</div>
				</div>
			{/if}

			{#if isLaunched}
				<div class="h-[230px] bg-[#fefefe]  overflow-y-auto" in:fly={{ y: 25 }}>
					{#if isJustJoined}
						<ConfettiExplosion particleCount={300} force={0.3} />
					{/if}
					<div
						class="relative py-8 flex {$feed.filter((f) => f.url).length
							? 'flex-col justify-start items-center'
							: 'flex-col justify-center items-center'}  h-full "
					>
						<div
							class="font-bold bg-gradient-to-br from-black to-black/50 bg-clip-text text-transparent mb-2"
						>
							{$pageTitle}
						</div>

						<div class="flex justify-center w-full">
							{#if isJoined}
								<div class="w-full text-center text-xs opacity-90 my-2" in:fade={{}}>
									<div>Thank you 👏</div>
									<div>
										Your email is <span
											clas="text-underline cursor-pointer"
											on:click={() => {
												isJoined = false;
											}}>{$emailAddress}</span
										>
									</div>
								</div>
							{:else}
								<input
									class="website"
									type="email"
									bind:value={$emailAddress}
									placeholder="hi@email.com"
									on:keypress={(e) => {
										if (e.key === 'Enter') {
											join();
										}
									}}
								/>
								<button class="in-app" on:click={join}>Join → </button>
							{/if}
						</div>

						{#if $feed.filter((f) => f.url).length}
							<div class="flex flex-col justify-center mt-2 p-2">
								<div
									class="font-bold bg-gradient-to-br from-black to-black/50 bg-clip-text text-transparent mb-2 text-sm"
								>
									We Build in Public
								</div>

								<div class="columns-3 gap-2 ">
									{#each $feed.filter((f) => f.url) as feedItem (feedItem.guid)}
										<a
											href={feedItem.url}
											target="_blank"
											class="block mb-2 p-1 border hover:outline-black/20 cursor-pointer hover:outline hover:outline-1 transition border-black break-inside-avoid"
										>
											<div class="text-xxs _line-clamp-4 " style="line-height: 1;">
												{feedItem.content}
											</div>
											<div>
												{#if feedItem.attachments?.length}
													<img
														src={feedItem.attachments[0].url}
														class="w-full max-h-[50px] object-cover my-1"
													/>
												{/if}
											</div>
											<hr class="bg-black/20 my-1" />
											<div class="flex justify-between items-center" style="font-size: 10px;">
												{moment(feedItem.createdOn).format(DATE_FORMAT)}

												<div class="source-logo w-[10px]">
													<SourceLogo theme="light" url={feedItem.url} />
												</div>
											</div>
										</a>
									{/each}
								</div>
							</div>
						{/if}
					</div>
				</div>
			{:else}
				<div
					class="h-[230px] flex flex-col justify-center items-center text-white bg-black/80 overflow-y-auto"
				>
					<div class="mb-2 text-sm font-medium">What's your 1-line pitch?</div>
					<input
						autofocus
						placeholder="Launch in seconds"
						bind:value={$pageTitle}
						on:keypress={(e) => {
							if (e.key === 'Enter') {
								launchPage();
							}
						}}
					/>
					<div class="mt-4">
						<button on:click={launchPage}>Launch my page</button>
					</div>
				</div>
			{/if}
		</div>
	</div>

	<div
		class="col-span-6 sm:col-span-4 h-full text-white "
		bind:this={analyticsEl}
		class:highlighted={analyticsEl?.isHighlighted}
	>
		<div
			class="border border-white/80 rounded-sm  h-[275px]  sm:h-[230px]{$totalViews !== -1
				? ''
				: 'opacity-50'}"
		>
			<div class="flex items-center text-xs p-1 px-2 bg-white/10 border-b border-white/20">
				<FeatherIcon class="mr-1" size={12} color="white" name="pie-chart" />
				Analytics
			</div>
			{#if isLaunched}
				<div class="p-2">
					{#if usersOnline !== -1}
						<div in:fly={{ y: 25, duration: 150 }}>
							<div class="flex items-center text-sm border border-white/40 px-2">
								<div class="flex items-center">
									<div
										class="{usersOnline
											? 'bg-green-500'
											: 'bg-gray-300'} transition w-[5px] h-[5px] rounded-full mr-2"
										style="animation: pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite;"
									/>
									<div class="font-medium mr-2">{usersOnline}</div>
								</div>
								<div class="mr-1 text-xs">Online Users</div>
							</div>
							{#if $totalViews !== -1}
								<div class="border border-white/40 p-2 mt-2">
									{#key chartRefreshTimestamp}
										<div in:fade>
											<LinkedChart
												linked="chart"
												uid="views"
												data={firstChart}
												fill="#fafafa"
												grow={true}
												width="135"
												barMinWidth={1}
												gap={2}
												height={50}
												transition={500}
											/>
										</div>
									{/key}
									<div class="text-xs opacity-100 mt-2">Page Views ({$totalViews})</div>
								</div>
							{/if}
						</div>
					{/if}

					{#if $totalViews}
						<div class="border border-white/40 p-2 mt-2">
							<div class="font-bold">{conversionRate}%</div>
							<div class="text-xs">Conversion Rate</div>
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>

	<div
		class="col-span-6 sm:col-span-5 border border-white/80 rounded-sm sm:h-[275px] transition {$customers.length
			? 'opacity-100'
			: 'opacity-50'}"
		bind:this={customersEl}
		class:highlighted={customersEl?.isHighlighted}
	>
		<div
			class="text-xs p-1 px-2 bg-white/10 border-b border-white/20 flex items-center justify-between mb-2"
		>
			<div class="flex items-center">
				<FeatherIcon class="mr-1" size={12} color="white" name="activity" />
				Customers
			</div>
			<div class="px-2 rounded-full ring-1 ring-white/50 ml-1 h-auto" style="font-size: 10px;">
				{$customers.length}
			</div>
		</div>

		<div class="max-w-[260px] overflow-y-auto h-[230px]">
			{#each $customers.sort((c1, c2) => {
				return new Date(c2.createdOn) - new Date(c1.createdOn);
			}) as customer}
				<div
					class="cursor-pointer hover:bg-white/20 transition p-2  m-2 {selectedCustomer?.email ===
					customer.email
						? 'border-2 border-white/80 m-2'
						: 'border border-white/40'}"
					on:click={() => {
						customersEl.isHighlighted = false;

						if (customer.email === 'elon@x.com') {
							selectElon();
						} else {
							selectedCustomer = customer;
						}
					}}
				>
					<div class="flex text-sm items-center">
						{#if customer.imageUrl}
							<img src={customer.imageUrl} class="w-[25px] h-[25px] rounded-full mr-1 text-xs" />
						{:else}
							<div
								class="w-[25px] h-[25px] flex items-center justify-center rounded-full border border-white/50"
							>
								{_.capitalize(customer.email[0])}
							</div>
						{/if}

						<div class="ml-2">
							{customer.email}
						</div>
					</div>

					{#if customer.email === selectedCustomer?.email}
						{#if customer.events?.length}
							<div class="border-l ml-3 py-2 pl-4 border-white flex flex-col-reverse opacity-80">
								{#each customer.events as event}
									<div class="relative flex items-center mt-1 text-xs">
										<div class="absolute  top-[1px] left-[-23px] bg-black rounded-full z-10">
											<FeatherIcon size={13} color="#ffffff" name={getIconFromType(event.type)} />
										</div>
										<div>
											{event.text}
										</div>
									</div>
								{/each}
							</div>
							<div>
								<div class="text-xs flex items-center ml-1 opacity-80">
									{#if customer.referrerUrl === 'x.com'}
										<img
											class="w-[13px] mr-2 ml-[2px]"
											src="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1701610478428-image.png"
										/>
									{:else if customer.referrerUrl === 'linkedin.com'}
										<img
											class="w-[13px] mr-2 ml-[2px]"
											src="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1701675685696-image.png"
										/>
									{/if}

									<div class="ml-1">From {customer.referrerUrl}</div>
								</div>
								<div class="p-1 flex items-center gap-1 mt-1">
									<div class="flex items-center mr-2">
										{countryCodeEmoji(customer.country)}
										<div class="opacity-70 ml-1 text-xs">US</div>
									</div>
									<div class="text-xs flex">
										<FeatherIcon name={customer.deviceIcon} size="15" color="#fff" />
										<div class="opacity-70 ml-1">{customer.deviceName}</div>
									</div>
								</div>
							</div>
						{/if}
					{/if}
				</div>
			{/each}
		</div>
	</div>

	<div
		class="col-span-12 sm:col-span-7 border border-white/80 rounded-sm relative  {selectedCustomer
			? ''
			: 'opacity-50'}"
		bind:this={chatEl}
		class:highlighted={chatEl?.isHighlighted}
	>
		<div class="p-1 px-2 bg-white/10 border-b border-white/20 text-xs flex items-center">
			<FeatherIcon class="mr-1" size={12} color="white" name="message-square" />

			Chat
		</div>

		<div class="flex flex-col p-2 overflow-y-auto h-[230px] pb-8">
			{#each selectedCustomer?.messages || [] as message (message.guid)}
				<div
					in:fly={{ y: 25 }}
					class="max-w-[70%] my-1 text-xs {message.isFromCustomer ? '' : 'self-end'}"
				>
					<div class="flex items-end">
						{#if message.isFromCustomer}
							<img class="w-[20px] h-[20px] rounded-full mr-2" src={selectedCustomer.imageUrl} />
						{/if}
						<div class="bg-white/20 p-2">
							{message.content}
						</div>
					</div>
					{#if message.isAuto}
						<div class="text-green-300 text-end w-full" style="font-size: 8px;">
							Sent automatically on your behalf
						</div>
					{/if}
				</div>
			{/each}
		</div>
		{#if selectedCustomer}
			<div class="absolute flex items-center bottom-0 left-0 w-full p-1 bg-black">
				<input
					bind:value={newMessage.content}
					rows="1"
					class="w-full"
					placeholder="Hello!"
					on:keypress={(e) => {
						if (e.key === 'Enter') {
							sendMessage();
						}
					}}
				/>
				<button class="shrink-0 ml-3" on:click={sendMessage}>Send Email</button>
			</div>
		{/if}
	</div>

	<div
		class="col-span-12 sm:col-span-8 border border-white/80 rounded-sm h-[150px] transition {$customers?.length
			? 'opacity-100'
			: 'opacity-50'}"
		bind:this={feedEl}
		class:highlighted={feedEl?.isHighlighted}
	>
		<div class="p-1 px-2 bg-white/10 border-b border-white/20 text-xs flex items-center">
			<FeatherIcon class="mr-1" size={12} color="white" name="rss" />

			Feed
		</div>

		{#if ($customers.length === 1 && $customers[0].messages?.length > 1) || ($customers.length > 1 && (!$customers.find((c) => c.email === 'elon@x.com') || $customers.find((c) => c.email === 'elon@x.com').messages?.length > 1))}
			<div class="m-2">
				<div class="columns-2">
					<div class="break-inside-avoid">
						<div class="flex gap-1 text-xs mb-2">
							<div
								class="{selectedFeedTab === 'post'
									? 'border-b border-white/80'
									: 'opacity-80 hover:opacity-100'} transition cursor-pointer"
								on:click={() => (selectedFeedTab = 'post')}
							>
								Post
							</div>
							<div
								class="{selectedFeedTab === 'url'
									? 'border-b  border-white/80'
									: 'opacity-80 hover:opacity-100'} ml-2 transition cursor-pointer"
								on:click={() => (selectedFeedTab = 'url')}
							>
								Link
							</div>
						</div>

						<div class="flex items-start mt-2">
							{#if selectedFeedTab === 'url'}
								<input
									bind:value={feedItem.url}
									type="url"
									placeholder="https://twitter.com/that_igor_/status/1725470197732065618"
								/>
							{:else if selectedFeedTab === 'post'}
								<div>
									<textarea bind:value={feedItem.content} placeholder="Your Message" />
								</div>
							{/if}
						</div>

						<div class="flex items-center mt-2">
							<Button class="mr-2 emu" onClick={sendToFeed}>Publish</Button>

							{#if selectedFeedTab === 'post'}
								<div class="text-xxs">
									<input type="checkbox" bind:checked={feedItem.isSyncToTwitter} /> x.com
									{#if $customers.length > 1}
										<input type="checkbox" bind:checked={feedItem.isSyncToLinkedin} /> linkedin
									{/if}
								</div>
							{/if}
						</div>
					</div>

					<div class="relative break-inside-avoid">
						<img
							class="absolute left-0 top-0 w-full h-full"
							src={$feed.length === 0
								? 'https://images.unsplash.com/photo-1614854262178-03c96e9c8c28?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
								: 'https://images.unsplash.com/photo-1641326038434-01b0217c18f1?q=80&w=3732&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
						/>
						<div class="relative p-4">
							<div
								class="p-2 bg-white rounded text-center text-black text-xxs flex flex-col items-center"
								style="font-family: Cabin;"
							>
								<div class="my-1">🔥</div>
								{feedItem.content || ''}

								<div class="mt-2 opacity-70" style="font-size: 8px;">www.cool.co</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>

	<div
		class="col-span-12 sm:col-span-4  text-xs border border-white/80 rounded-sm h-[150px]"
		bind:this={moreEl}
		class:highlighted={moreEl?.isHighlighted}
	>
		<div
			class="p-1 px-2 bg-white/10 border-b border-white/20 text-xs flex items-center justify-between"
		>
			<div class="flex items-center">
				<FeatherIcon class="mr-1" size={12} color="white" name="compass" />

				Tips
			</div>
			{#if isLaunched}
				<div class="text-xxs text-orange-300 cursor-pointer" on:click={reset}>Reset</div>
			{/if}
		</div>

		<div
			class=" h-[125px] w-full p-2 {$feed.filter((f) => f.url).length
				? 'bg-launch text-[#111]'
				: 'bg-green-100/30'}"
		>
			{#if isLaunched}
				{#if !$totalViews}
					<b>Be your first visitor!</b>
					<div class="mt-1">Click your website</div>
				{:else if $customers?.length}
					{#if $customers.length > 1 || selectedCustomer?.messages.length > 1}
						{#if $customers.length > 1}
							{#if elon.messages?.length === 1}
								<b>👏 You've got a new signup!</b>
								<div class="mt-1">Click on Elon to see the analytics profile.</div>
							{:else if !$customers.find((c) => c.email === 'satya@microsoft.com')}
								<b>🤑 Social feed worked! </b>
								<div class="mt-1">
									You've got a signup that led to conversation after auto-welcome email. <br />
									It's time to do it again. Now, publish your win to LinkedIn.
								</div>
							{:else if $feed.filter((f) => f.url).length}
								<b class="block">🚀 Get Started</b>
								There's much more to Momentum: blogs, databases, interactive elements.
								<a href="/ide" target="_blank"
									><button class="mt-2 launch-button">Launch my page </button></a
								>
							{:else}
								<b>🕺 Embed content to your page</b>
								<div class="mt-1">
									You have lot's of content elsewhere. Embed your links to your page to gain trust.
								</div>
							{/if}
						{:else}
							<b>😅 Get real customers</b>
							<div class="mt-1">Distribute your website to social networks</div>
						{/if}
					{:else}
						<b>✉️ Send a email message</b>
						<div class="mt-1">Send any message to chat. It will be sent via email.</div>
					{/if}
				{:else}
					<b>😏 Be your first customer!</b>
					<div class="mt-1">Submit any test email to your website</div>
				{/if}
				{#if false}
					<div class="p-2">
						<div class="bg-white/20 ring-1 ring-white p-1" style="font-size: 12px;">
							Send Newsletter
						</div>
						<div class="bg-white/20 ring-1 ring-white mt-2 p-1" style="font-size: 12px;">
							Connect Blog
						</div>
					</div>
				{/if}
			{:else}
				<b>Launch your page</b>
				<div class="mt-1">
					It's super easy: you just write a 1-line pitch, click publish and you're live!
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	button {
		border-radius: 2px !important;
	}

	.launch-button {
		background: #0a3d1d !important;
		--tw-ring-color: #24fa74;
		color: #f6f5f4;
	}

	.bg-launch {
		background-color: #00ff01;
	}

	.text-xxs {
		font-size: 11px;
		line-height: 1.1;
	}

	input,
	textarea {
		border: 1px #fafafa solid;
		padding: 2px 8px !important;
		background: none !important;
		color: #fafafa;
		border-radius: 2px !important;
		font-size: 12px !important;
		@apply text-sm;
	}

	input[type='checkbox'] {
		background: none !important;
		border: 1px white solid;
	}

	input.website {
		border: 1px #111 solid;
		padding: 2px 8px !important;
		background: none !important;
		color: #111;
		border-radius: 2px !important;
		font-size: 12px !important;
		@apply text-sm;
	}

	button {
		padding: 2px 16px;
		font-size: 12px !important;
		@apply bg-white/20 ring-1 ring-white px-2 py-0 text-sm font-normal text-white;
	}

	:global(.emu) {
		font-size: 12px !important;
		border-radius: 2px;
		@apply bg-white/20 ring-1 ring-white px-2 py-0 text-sm font-normal text-white;
	}

	button.in-app {
		border: 1px black solid;
		@apply text-black;
	}

	:global(.source-logo svg) {
		width: 10px !important;
		height: 10px !important;
	}

	.highlighted {
		@apply transition;
		outline: 3px #ffb100 solid;
		/* @apply shadow-lg shadow-green-300; */
	}
</style>
