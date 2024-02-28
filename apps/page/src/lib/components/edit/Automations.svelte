<script>
	import _ from 'lodash';
	import { v4 as uuidv4 } from 'uuid';
	import { get, post, put, del } from 'lib/api';
	import Button from 'lib/components/Button.svelte';
	import ToggleGroup from '$lib/components/ToggleGroup.svelte';
	import allTriggers, {
		refresh as refreshTriggers,
		isLoading as isTriggersLoading
	} from '$lib/stores/allTriggers';
	import { showSuccessMessage } from 'lib/services/toast';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';

	export let page;
	let parentPage = page.parentPage || page;

	let checkboxes = [
		{
			key: 'customer:created',
			name: 'New Customer'
		},
		{
			key: 'submission:created',
			name: 'New Submission'
		},
		{
			key: 'customerMessage:created',
			name: 'New Message'
		}
	];

	refreshTriggers({ pageId: parentPage._id });

	let addNewTrigger = () => {
		$allTriggers = [
			{
				id: uuidv4(),
				isEnabled: true,
				on: [],
				actionSequence: [
					{
						type: 'slack',
						authData: {},
						data: {}
					}
				]
			},
			...$allTriggers
		];
	};

	let prepareTrigger = (trigger) => {
		if (!trigger.actionMap) {
			trigger.actionMap = {};

			trigger.on.forEach((e) => {
				trigger.actionMap[e.eventName] = true;
			});
		}

		if (!trigger.id) {
			trigger.id = uuidv4();
		}

		return trigger;
	};

	let saveTrigger = async (trigger) => {
		trigger.on = [];

		Object.keys(trigger.actionMap).forEach((eventName) => {
			if (trigger.actionMap[eventName]) {
				trigger.on.push({ eventName });
			}
		});

		let updatedTrigger = await (trigger._id
			? put(`triggers/${trigger._id}?pageId=${parentPage._id}`, trigger)
			: post(`triggers?pageId=${parentPage._id}`, trigger));

		$allTriggers = $allTriggers.map((t) => {
			if (t.id === trigger.id) {
				return updatedTrigger;
			} else {
				return t;
			}
		});

		updatedTrigger.isEdit = false;

		showSuccessMessage('Trigger saved');
	};

	let deleteTrigger = async (trigger) => {
		if (trigger._id) {
			await del(`triggers/${trigger._id}?pageId=${parentPage._id}`);
		}
		$allTriggers = $allTriggers.filter((t) => t.id !== trigger.id);
		showSuccessMessage('Trigger deleted');
	};
</script>

<div class="_editor">
	<div class="w-full flex justify-between items-center mb-8">
		<div>
			<div class="text-xl font-bold">Automations & Triggers</div>
			<div class="mt-1 text-lg opacity-70">
				Send data to third-party tools on selected Momentum events
			</div>
		</div>
		<button class="_primary _small" on:click={addNewTrigger}>Add New Trigger</button>
	</div>

	{#if !$isTriggersLoading}
		{#each $allTriggers
			.filter((t) => !t.on.find((e) => e.eventName.includes('submitted')))
			.map(prepareTrigger) as trigger}
			{#if !trigger._id || trigger.isEdit}
				<div class="_section my-4">
					<div class="flex justify-between mb-4">
						<div />
						<Button class="ml-4 _secondary _small" onClick={() => deleteTrigger(trigger)}
							>Delete Trigger</Button
						>
					</div>

					<ToggleGroup
						tabs={[
							{ name: 'Slack', key: 'slack' },
							{ name: 'API Webhook', key: 'api' }
						]}
						bind:value={trigger.actionSequence[0].type}
						onTabSelected={() => {}}
					/>

					{#if trigger.actionSequence[0].type === 'slack'}
						<div class="_section mt-4">
							<div class="mb-1 text-sm font-bold">Slack Webhook URL</div>
							<div class="mb-2 text-sm">Add webhook to your Slack channel and paste the URL</div>
							<input
								type="text"
								class="w-full"
								bind:value={trigger.actionSequence[0].authData.slackWebhookUrl}
								placeholder="https://hooks.slack.com/services/T1473M898/C06EDBAH839/RqERw310vnAgsXtYMGMgLq5C"
							/>
						</div>
					{/if}

					{#if trigger.actionSequence[0].type === 'api'}
						<div class="_section mt-4">
							<div class="mb-1 text-sm font-bold">API Webhook URL</div>
							<div class="mb-2 text-sm">Where to send POST request to?</div>
							<input
								type="text"
								class="w-full"
								bind:value={trigger.actionSequence[0].authData.webhookUrl}
								placeholder="https://yourapi.com/momentum-webhook"
							/>

							<div class="mt-6 mb-1 text-sm font-bold">Encryption Key (aes256)</div>
							<div class="mb-2 text-sm">
								Add key to sign the body and authorize momentum requests
							</div>
							<input
								type="text"
								class="w-full"
								bind:value={trigger.actionSequence[0].authData.encryptKey}
								placeholder="S7FrS0hzSXGkFbeAHCVAhg=="
							/>
						</div>
					{/if}

					<div class="_section">
						<div class="text-sm mb-1 font-bold">Trigger Events</div>
						<div class="mb-2 text-sm">What events should trigger this automation?</div>
						<div class="flex gap-4 mt-4">
							{#each checkboxes as checkbox}
								<div>
									<input
										type="checkbox"
										class="mr-2"
										bind:checked={trigger.actionMap[checkbox.key]}
									/>{checkbox.name}
								</div>
							{/each}
						</div>
					</div>

					<hr class="my-8" />
					<div class="flex items-center">
						<Button class="_primary" onClick={() => saveTrigger(trigger)}>Save Trigger</Button>
					</div>
				</div>
			{:else}
				<div
					class="_section cursor-pointer flex items-center"
					on:click={() => {
						trigger.isEdit = true;
					}}
				>
					<div
						class="w-[40px] h-[40px] shrink-0 flex items-center justify-center rounded-full bg-green-300 shadow-md shadow-green-300/50 mr-4"
					>
						<FeatherIcon
							name={trigger.actionSequence[0].type === 'slack' ? 'slack' : 'cpu'}
							size="20"
							color="#333"
						/>
					</div>
					<div>
						<div class="font-bold">{_.capitalize(trigger.actionSequence[0].type)} Integration</div>
						On: {trigger.on.map((e) => e.eventName).join(', ')}
					</div>
				</div>
			{/if}
		{/each}
	{/if}
</div>
