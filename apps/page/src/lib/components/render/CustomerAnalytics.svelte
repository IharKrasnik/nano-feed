<script>
	import { get } from 'lib/api';
	import moment from 'moment';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';

	export let page;
	export let customer;

	let events = [];

	let getCustomerEvents = async () => {
		let { results, count } = await get(`customers/${customer._id}/events`, {
			pageId: page._id
		});

		events = [...results, ...events];
	};

	getCustomerEvents();

	let getIconName = (event) => {
		if (event.type === 'click_custom') {
			return 'mouse-pointer';
		} else if (event.type === 'pathChange') {
			return 'globe';
		} else if (event.type === 'interactive_answer') {
			return 'check-circle';
		} else if (event.type === 'form_submitted') {
			return 'clipboard';
		}
	};

	let getTitle = (event) => {
		if (event.type === 'click_custom') {
			return 'Clicked';
		} else if (event.type === 'pathChange') {
			return 'Opened Page';
		} else if (event.type === 'interactive_answer') {
			return 'Sent Interactive Answer';
		} else if (event.type === 'form_submitted') {
			return 'Submitted Form';
		}
	};
</script>

<div>
	<div class="text-lg font-bold text-center mb-4">Event Feed</div>

	<div class=" max-w-[600px] mx-auto">
		{#each events as event}
			<div class="py-4">
				<div class="flex items-start">
					<div class="rounded-full border p-2">
						<FeatherIcon class="opacity-30" theme={page.theme?.theme} name={getIconName(event)} />
					</div>
					<div class="ml-4">
						<div class="opacity-80 mb-1 font-bold">{getTitle(event)}</div>
						<div class="mt-1 mb-4 text-sm">
							{moment(event.createdOn).format('MMM DD HH:mm:ss')}
						</div>
						{#if event.type === 'click_custom'}
							<div>
								{event.payload.text}
							</div>
							<div class="text-sm opacity-80">
								{event.payload.url}
							</div>
						{:else if event.type === 'interactive_answer'}
							<div>
								{event.payload.emoji || event.payload.value || event.payload.text}
							</div>
						{:else if event.type === 'form'}
							{event.payload.text}
						{:else if event.type === 'pathChange'}
							{event.payload.value}
						{/if}
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
