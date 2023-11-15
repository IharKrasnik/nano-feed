<script>
	import moment from 'moment';
	import { get, post, put, del } from 'lib/api';
	import { fade } from 'svelte/transition';
	import { countryCodeEmoji } from 'country-code-emoji';
	import Button from 'lib/components/Button.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';

	export let page;
	export let selectedSubmission;

	let submissions = [];

	let loadSubmissions = async () => {
		let submissionsResults = await get(`pages/${page.parentPage?._id || page._id}/submissions`, {});

		submissions = submissionsResults.results.map((s) => {
			s.isCollapsed = true;
			return s;
		});
	};

	let formatSubmission = (submission) => {
		if (submission.vars) {
			return Object.keys(submission.vars)
				.map((varName) => submission.vars[varName])
				.join('; ');
		} else {
			return submission.email || submission.name;
		}
	};

	loadSubmissions();
</script>

{#each submissions as submission}
	<div
		class="_section cursor-pointer"
		class:_active={!submission.isCollapsed}
		on:click={() => {
			submissions = submissions.map((s) => {
				s.isCollapsed = true;
				if (s._id === submission._id) {
					s.isCollapsed = false;
				}
				return s;
			});

			selectedSubmission = submission;
		}}
	>
		<div class=" flex justify-between items-center">
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
			{moment(submission.createdOn).format('MMM DD')}
		</div>
	</div>
{/each}

<style>
	._active {
		border-color: black;
	}
</style>
