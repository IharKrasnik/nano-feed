<script>
	import moment from 'moment';
	import { get, post, put, del } from 'lib/api';
	import { fade } from 'svelte/transition';
	import { countryCodeEmoji } from 'country-code-emoji';
	import selectedTab from '$lib/stores/selectedTab';
	import formatSubmission from '$lib/helpers/formatSubmission';
	import selectedSubmission from '$lib/stores/selectedSubmission';

	import submissions, {
		refresh as refreshSubmissions,
		isLoading as isSubmissionsLoading
	} from 'lib/stores/submissions';

	import submissionsOutbound, {
		refresh as refreshSubmissionsOutbound,
		isLoading as isSubmissionsOutboundLoading
	} from 'lib/stores/submissionsOutbound';

	import Button from 'lib/components/Button.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import ToggleGroup from '$lib/components/ToggleGroup.svelte';

	export let page;

	refreshSubmissions({ page });
	refreshSubmissionsOutbound({});

	export let selectedSubmissionsTab = 'inbound';
</script>

<div class="font-bold mb-2">Submissions</div>

<ToggleGroup
	class="my-4"
	tabs={[
		{
			key: 'inbound',
			isSelected: selectedSubmissionsTab === 'inbound',
			name: 'Inbound'
		},
		{
			key: 'outbound',
			isSelected: selectedSubmissionsTab === 'outbound',
			name: 'Outbound'
		}
	]}
	onTabSelected={(tab) => {
		selectedSubmissionsTab = tab.key;
	}}
/>

{#if !$isSubmissionsLoading && !$isSubmissionsOutboundLoading}
	{#if selectedSubmissionsTab === 'inbound'}
		{#if !$submissions.length}
			<div class="_section _info">
				<div class="font-bold">No requests yet</div>
				<div>Add forms to your pages and promote to get submissions</div>
			</div>
		{/if}
	{:else if !$submissionsOutbound.length}
		<div class="_section _info">
			<div class="font-bold">No outbound requests yet</div>
			<div>Get free and paid startup services to grow your product</div>
			<button
				class="_primary _small mt-2"
				on:click={() => {
					$selectedTab = 'growth';
				}}>See promoted services</button
			>
		</div>
	{/if}

	{#each selectedSubmissionsTab === 'inbound' ? $submissions : $submissionsOutbound as submission}
		<div
			class="_section cursor-pointer  overflow-hidden"
			class:_active={submission._id === $selectedSubmission?._id}
			on:click={() => {
				$submissions = $submissions.map((s) => {
					s.isCollapsed = true;
					if (s._id === submission._id) {
						s.isCollapsed = false;
					}
					return s;
				});

				$selectedSubmission = submission;
			}}
		>
			<div class=" flex justify-between items-center _line-clamp-4">
				{formatSubmission(submission)}

				<div class="flex gap-2 items-center">
					{#if submission.customer?.visitor?.payload?.deviceType}
						{#if submission.customer.visitor.payload.deviceType === 'desktop'}
							<FeatherIcon theme="light" size="15" name="monitor" />
						{:else}
							<FeatherIcon theme="light" size="15" name="smartphone" />
						{/if}
					{/if}
					{#if submission.customer?.visitor?.geoData?.country}
						{countryCodeEmoji(submission.customer?.visitor?.geoData?.country)}
					{/if}
				</div>
			</div>
			<div class="text-sm mt-2">
				{moment(submission.createdOn).format('MMM DD HH:mm')}
			</div>
		</div>
	{/each}
{/if}

<style>
	._active {
		border-color: black;
	}
</style>
