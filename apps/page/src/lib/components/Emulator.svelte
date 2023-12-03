<script>
	import moment from 'moment';
	import _ from 'lodash';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import { LinkedChart, LinkedLabel, LinkedValue } from 'svelte-tiny-linked-charts';
	import { countryCodeEmoji } from 'country-code-emoji';

	let viewChartData = {};

	let weekAgoM = moment().subtract(7, 'days');
	let weekAgoViews = Math.random() * 100 + 420;

	let prevViewsCount = weekAgoViews;

	_.range(0, 7).map((i) => {
		prevViewsCount = prevViewsCount + i * (Math.random() * 50);
		viewChartData[weekAgoM.add(1, 'day').format('MMM DD')] = prevViewsCount;
	});

	let customers = [
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

	let messages = [
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

	let selectedFeedTab = 'url';
</script>

<div class="grid grid-cols-12 items-stretch gap-4 p-2 text-white">
	<div
		class="relative col-span-8 h-full overflow-hidden bg-[#fefefe] text-[#111] shadow shadow-white max-h-[345px] overflow-y-auto"
	>
		<div
			class="bg-root absolute z-10 inset-0 -z-50 h-screen w-screen bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] [background-size:20px_20px] "
		/>

		<div class="relative z-10 border border-white h-full">
			<div class="absolute w-full left-0 top-0">
				<div class="relative border-b bg-white border-black/20 text-xs grayscale px-4">
					🔥 coolco
				</div>
			</div>

			<div class="py-8 flex flex-col items-center justify-center h-full ">
				<div
					class="font-bold bg-gradient-to-br from-black to-black/50 bg-clip-text text-transparent mb-2"
				>
					My Awesome Website
				</div>

				<div class="flex justify-center w-full">
					<input class="website" type="email" placeholder="hi@email.com" />
					<button>Join -> </button>
				</div>
			</div>
		</div>
	</div>

	<div class="col-span-4 h-full text-white">
		<div class="border border-white">
			<div class="flex items-center text-xs p-1 px-2 bg-white/10 border-b border-white/20 ">
				<FeatherIcon class="mr-1" size={12} color="white" name="pie-chart" />
				Analytics
			</div>
			<div class="p-2">
				<div class="flex items-center text-sm border border-white/40 px-2">
					<div class="flex items-center">
						<div
							class="bg-green-500 w-[5px] h-[5px] rounded-full mr-2"
							style="animation: pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite;"
						/>
						<div class="font-medium mr-2">10</div>
					</div>
					<div class="mr-1 text-xs">Online Users</div>
				</div>
				<div class="border border-white/40 p-2 mt-2">
					<div class="font-bold">7.92%</div>
					<div class="text-xs">Conversion Rate</div>
				</div>
				<div class="border border-white/40 p-2 mt-2">
					<LinkedChart
						linked="chart"
						uid="views"
						data={viewChartData}
						fill="#fafafa"
						grow={true}
						width="135"
						barMinWidth={1}
						gap={2}
						height={50}
						transition={500}
					/>
					<div class="text-xs opacity-100 mt-2">Page Views</div>
				</div>
			</div>
		</div>
	</div>

	<div class="col-span-5 border border-white ">
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
			{#each customers as customer}
				<div class="p-2 border border-white/40 m-2">
					<div class="flex text-sm items-center">
						<img src={customer.imageUrl} class="w-[25px] h-[25px] rounded-full mr-1 text-xs" />
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
	<div class="col-span-7 border border-white relative">
		<div class="p-1 px-2 bg-white/10 border-b border-white/20 text-xs flex items-center">
			<FeatherIcon class="mr-1" size={12} color="white" name="message-square" />

			Chat
		</div>

		<div class="flex flex-col p-2">
			{#each messages as message}
				<div class="max-w-[70%] my-1 text-xs {message.from ? '' : 'self-end'}">
					<div class="flex items-end">
						{#if message.from}
							<img class="w-[20px] h-[20px] rounded-full mr-2" src={message.from.avatarUrl} />
						{/if}
						<div class="bg-white/20 p-2">
							{message.content}
						</div>
					</div>
					{#if message.isAuto}
						<div class="text-green-300 text-end w-full" style="font-size: 8px;">Automated</div>
					{/if}
				</div>
			{/each}
		</div>
		<div class="absolute flex items-center bottom-0 left-0 w-full p-1">
			<textarea rows="1" class="w-full" placeholder="Hello!" />
			<button class="shrink-0 ml-3">Send Email</button>
		</div>
	</div>
	<div class="col-span-4 text-xs border border-white">
		<div class="p-1 px-2 bg-white/10 border-b border-white/20 text-xs flex items-center mb-2">
			<FeatherIcon class="mr-1" size={12} color="white" name="compass" />

			More
		</div>

		<div class="p-2">
			<div class="bg-white/20 ring-1 ring-white p-1" style="font-size: 12px;">Send Newsletter</div>
			<div class="bg-white/20 ring-1 ring-white mt-2 p-1" style="font-size: 12px;">
				Connect Blog
			</div>
		</div>
	</div>

	<div class="col-span-8 border border-white">
		<div class="p-1 px-2 bg-white/10 border-b border-white/20 text-xs flex items-center">
			<FeatherIcon class="mr-1" size={12} color="white" name="rss" />

			Feed
		</div>

		<div class="m-2">
			<div class="flex gap-1 text-xs  mb-2">
				<div
					class="{selectedFeedTab === 'url'
						? 'border-b  border-white/80'
						: 'opacity-80 hover:opacity-100'} transition cursor-pointer"
					on:click={() => (selectedFeedTab = 'url')}
				>
					URL
				</div>
				<div
					class="{selectedFeedTab === 'post'
						? 'border-b border-white/80'
						: 'opacity-80 hover:opacity-100'} transition cursor-pointer"
					on:click={() => (selectedFeedTab = 'post')}
				>
					Post
				</div>
			</div>

			{#if selectedFeedTab === 'url'}
				<input type="url" placeholder="https://twitter.com/that_igor_/status/1725470197732065618" />
			{:else if selectedFeedTab === 'post'}
				<textarea placeholder="Your Message" />
			{/if}
			<div class="mt-2">
				<button>Send</button>
			</div>
		</div>
	</div>
</div>

<style>
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
		@apply text-sm;
		border: 1px #111 solid;
		background: rgba(255, 255, 255, 0.3);
	}
</style>
