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

	let viewChartData = {};

	let DATE_FORMAT = 'MMM DD';
	let TOTAL_VIEWS_LS_KEY = 'TOTAL_VIEWS';

	let weekAgoM = moment().subtract(7, 'days');
	let weekAgoViews = Math.random() * 100 + 420;

	let prevViewsCount = weekAgoViews;

	let iterateM = weekAgoM.clone();

	_.range(0, 7).map((i) => {
		prevViewsCount = prevViewsCount + i * (Math.random() * 50);
		viewChartData[iterateM.format(DATE_FORMAT)] = prevViewsCount;
		iterateM.add(1, 'day');
	});

	let firstChart = { ...viewChartData };

	Object.keys(firstChart).forEach((key) => {
		if (key !== weekAgoM.format(DATE_FORMAT)) {
			firstChart[key] = 0;
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
		conversionRate = $customers.length ? parseInt(($customers.length / $totalViews) * 100) : 0;
	}

	[
		{
			email: 'elon@x.com',
			country: 'US',
			imageUrl:
				'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1701607809457-image.png',
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
			]
		},
		{
			email: 'paul@yc.com',
			country: 'US',
			imageUrl:
				'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1701610961480-image.png',
			events: []
		}
	];

	let autoMessage = {
		content: 'Hey! Welcome to coolco. Reply to this email to jump on a call with me!',
		isAuto: true
	};

	let messages = [];
	[
		{
			sentOn: new Date(),
			content: 'Hey! Welcome to coolco. Reply to this email to jump on a call with me!',
			isAuto: true
		},
		{
			sentOn: new Date(),
			content: `Hi! Sure, here's my link. Awesome project BTW!`,
			from: {
				avatarUrl:
					'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1701607809457-image.png'
			}
		}
	];

	let getIconFromType = (type) => {
		if (type === 'open') {
			return 'eye';
		} else if (type === 'click') {
			return 'mouse-pointer';
		} else if (type === 'form-submit') {
			return 'clipboard';
		}
	};

	let selectedFeedTab = 'post';

	let FEED_ITEMS_LS_KEY = 'FEED_ITEMS';

	let feedItems = JSON.parse(localStorage[FEED_ITEMS_LS_KEY] || '[]');

	let feedItem = { isSyncToTwitter: true };

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

		let newCustomer = { email: $emailAddress, messages: [], isMe: true };
		$customers = [newCustomer, ...$customers];
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
	};

	let isFirstPostSent = false;

	let sendToFeed = async () => {
		if (!isFirstPostSent) {
			isFirstPostSent = true;

			setTimeout(() => {
				let newVisitorsCount = parseInt(Math.random() * 70 + 5);
				$totalViews += newVisitorsCount;

				weekAgoM.add(1, 'day');
				firstChart[weekAgoM.format(DATE_FORMAT)] = 1 + newVisitorsCount;
				firstChart = { ...firstChart };
			});
			return;
		}

		if (feedItem.url) {
			const data = await get('utils/fetch-meta-tags', {
				url: feedItem.url
			});

			feedItem.url = data.url || feedItem.url;
			feedItem.embedUrl = data.embedUrl;

			feedItem.source = data.source;

			feedItem.title = data.title;
			feedItem.content = data.description;

			if (data.image) {
				feedItem.attachments = [{ type: 'image', url: data.image }];
			}

			feedItems = [{ ...feedItem }, ...feedItems];

			localStorage[FEED_ITEMS_LS_KEY] = JSON.stringify(feedItems);

			feedItem = {};
		} else {
			feedItem.content = feedItem.content || 'Check out my awesome website';
		}
	};

	let offlineTimeout;
</script>

<div class="grid grid-cols-12 items-stretch gap-4 p-2 text-white">
	<div class="relative col-span-8 h-full overflow-hidden text-[#111] shadow shadow-white">
		<div
			class="bg-root absolute z-10 inset-0 -z-50 w-full h-full bg-[linear-gradient(to_right,#00000012_1px,transparent_1px),linear-gradient(to_bottom,#00000012_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(75%_50%_at_top_center,white,transparent)]"
		/>

		<div
			class="relative z-10 border border-white h-full"
			on:click={() => {
				if (usersOnline === -1 || usersOnline === 0) {
					usersOnline = 1;
				}

				if ($totalViews === -1) {
					$totalViews = 1;
				}

				if (offlineTimeout) {
					clearTimeout(offlineTimeout);
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
			<div class="absolute w-full left-0 top-0 bg-[rgba(255,255,255,.3)] backdrop-blur">
				<div class="relative border-b  border-black/20 text-xs grayscale px-4">🔥 coolco</div>
			</div>

			<div class="h-[230px] {feedItems?.length ? 'pt-[50px]' : ''} bg-[#fefefe] overflow-y-auto">
				{#if isJustJoined}
					<ConfettiExplosion particleCount={300} force={0.3} />
				{/if}
				<div class="py-8 flex flex-col items-center justify-center h-full ">
					<div
						class="font-bold bg-gradient-to-br from-black to-black/50 bg-clip-text text-transparent mb-2"
					>
						My Awesome Website
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

					{#if feedItems.length}
						<div class="flex flex-col justify-center mt-2 p-2">
							<div
								class="font-bold bg-gradient-to-br from-black to-black/50 bg-clip-text text-transparent mb-2 text-sm"
							>
								We Build in Public
							</div>

							<div class="columns-3 gap-2 ">
								{#each feedItems as feedItem}
									<div class="p-1 border border-black break-inside-avoid">
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
									</div>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<div class="col-span-4 h-full text-white ">
		<div class="border border-white h-[230px] {$totalViews !== -1 ? '' : 'opacity-50'}">
			<div class="flex items-center text-xs p-1 px-2 bg-white/10 border-b border-white/20">
				<FeatherIcon class="mr-1" size={12} color="white" name="pie-chart" />
				Analytics
			</div>
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
						<div class="border border-white/40 p-2 mt-2">
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
							<div class="text-xs opacity-100 mt-2">Page Views ({$totalViews})</div>
						</div>
					</div>
				{/if}

				{#if $totalViews}
					<div class="border border-white/40 p-2 mt-2">
						<div class="font-bold">{conversionRate}%</div>
						<div class="text-xs">Conversion Rate</div>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<div
		class="col-span-5 border border-white h-[275px] transition {$customers.length
			? 'opacity-100'
			: 'opacity-50'}"
	>
		<div
			class="text-xs p-1 px-2 bg-white/10 border-b border-white/20 flex items-center justify-between mb-2"
		>
			<div class="flex items-center">
				<FeatherIcon class="mr-1" size={12} color="white" name="activity" />
				Customers
			</div>
			<div class="px-2 rounded-full ring-1 ring-white/50 ml-1 h-auto" style="font-size: 10px;">
				{customers.length}
			</div>
		</div>

		<div class="max-w-[260px] overflow-y-auto">
			{#each $customers as customer}
				<div
					class="cursor-pointer hover:bg-white/20 transition p-2 border border-white/40 m-2"
					on:click={() => {
						selectedCustomer = customer;
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

					{#if customer.events?.length}
						<div class="border-l ml-3 py-2 pl-4 border-white flex flex-col-reverse opacity-80">
							{#each customer.events as event}
								<div class="relative flex items-center mt-1 text-xs">
									<div class="absolute  top-[1px] left-[-23px] bg-black z-10">
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
								<img
									class="w-[13px] mr-2 ml-[2px]"
									src="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1701610478428-image.png"
								/>

								<div class="ml-1">From x.com</div>
							</div>
							<div class="p-1 flex items-center gap-1 mt-1">
								<div class="flex items-center mr-2">
									{countryCodeEmoji(customer.country)}
									<div class="opacity-70 ml-1 text-xs">US</div>
								</div>
								<div class="text-xs flex">
									<FeatherIcon name="smartphone" size="15" color="#fff" />
									<div class="opacity-70 ml-1">iOS</div>
								</div>
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>

	<div
		class="col-span-7 border border-white relative h-[275px] {selectedCustomer ? '' : 'opacity-50'}"
	>
		<div class="p-1 px-2 bg-white/10 border-b border-white/20 text-xs flex items-center">
			<FeatherIcon class="mr-1" size={12} color="white" name="message-square" />

			Chat
		</div>

		<div class="flex flex-col p-2">
			{#each selectedCustomer?.messages || [] as message (message.guid)}
				<div in:fly={{ y: 25 }} class="max-w-[70%] my-1 text-xs {message.from ? '' : 'self-end'}">
					<div class="flex items-end">
						{#if message.from}
							<img class="w-[20px] h-[20px] rounded-full mr-2" src={message.from.avatarUrl} />
						{/if}
						<div class="bg-white/20 p-2">
							{message.content}
						</div>
					</div>
					{#if message.isAuto}
						<div class="text-green-300 text-end w-full" style="font-size: 8px;">
							Sent Automatically
						</div>
					{/if}
				</div>
			{/each}
		</div>
		{#if selectedCustomer}
			<div class="absolute flex items-center bottom-0 left-0 w-full p-1">
				<textarea bind:value={newMessage.content} rows="1" class="w-full" placeholder="Hello!" />
				<button
					class="shrink-0 ml-3"
					on:click={() => {
						if (!newMessage.content) {
							return;
						}

						newMessage.sentOn = new Date();
						selectedCustomer.messages = [...selectedCustomer.messages, { ...newMessage }];

						newMessage.content = '';
						newMessage.guid = uuidv4();
					}}>Send Email</button
				>
			</div>
		{/if}
	</div>
	<div class="col-span-4 text-xs border border-white  h-[150px]">
		<div class="p-1 px-2 bg-white/10 border-b border-white/20 text-xs flex items-center mb-2">
			<FeatherIcon class="mr-1" size={12} color="white" name="compass" />

			More
		</div>

		<div class="border-green-100 border p-1 m-1">
			{#if !$totalViews}
				<b>Be your first visitor!</b>
				<div class="mt-1">Click your website</div>
			{:else if $customers?.length}
				{#if $customers.length > 1 || selectedCustomer?.messages.length > 1}
					{#if $customers.length > 1}{:else}
						<b>Get real customers</b>
						<div class="mt-1">Distribute your website to social networks</div>
					{/if}
				{:else}
					<b>Send a email message</b>
					<div class="mt-1">Send any message to chat. It will be sent via email.</div>
				{/if}
			{:else}
				<b>Be your first customer!</b>
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
		</div>
	</div>

	<div
		class="col-span-8 border border-white  h-[150px] transition {$customers?.length
			? 'opacity-100'
			: 'opacity-50'}"
	>
		<div class="p-1 px-2 bg-white/10 border-b border-white/20 text-xs flex items-center">
			<FeatherIcon class="mr-1" size={12} color="white" name="rss" />

			Feed
		</div>

		{#if customers.length > 1 || selectedCustomer?.messages.length > 1}
			<div class="m-2">
				<div class="columns-2">
					<div class="break-inside-avoid">
						{#if isFirstPostSent}
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
						{/if}

						<div class="flex items-center mt-2">
							<Button class="mr-2 emu" onClick={sendToFeed}>Publish</Button>

							{#if selectedFeedTab === 'post'}
								<div class="text-xs">
									<input type="checkbox" bind:value={feedItem.isSyncToTwitter} /> Sync To x.com
								</div>
							{/if}
						</div>
					</div>

					<div class="relative break-inside-avoid">
						<img
							class="absolute left-0 top-0 w-full h-full"
							src="https://images.unsplash.com/photo-1614854262178-03c96e9c8c28?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						/>
						<div class="relative p-4">
							<div
								class="p-2 bg-white rounded text-center text-black text-xxs flex flex-col items-center"
								style="font-family: Cabin;"
							>
								<div class="my-1">✨</div>
								{feedItem.content || 'Check out my awesome website!'}
							</div>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.text-xxs {
		font-size: 11px;
		line-height: 1.1;
	}

	:global(.emu) {
		font-size: 12px !important;
		@apply bg-white/20 ring-1 ring-white px-2 py-0 text-sm font-normal;
	}

	input,
	textarea {
		border: 1px #fafafa solid;
		padding: 2px 8px !important;
		background: none !important;
		color: #fafafa;
		border-radius: 0 !important;
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
		border-radius: 0 !important;
		font-size: 12px !important;
		@apply text-sm;
	}

	button {
		padding: 2px 16px;
		font-size: 12px !important;
		@apply bg-white/20 ring-1 ring-white px-2 py-0 text-sm font-normal;
	}

	button.in-app {
		border: 1px black solid;
	}

	:global(.source-logo svg) {
		width: 10px !important;
		height: 10px !important;
	}
</style>
