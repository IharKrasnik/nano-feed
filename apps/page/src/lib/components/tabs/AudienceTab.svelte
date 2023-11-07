<script>
	import _ from 'lodash';
	import moment from 'moment-timezone';
	import { slide, fly, scale, fade } from 'svelte/transition';
	import { get, post, put } from 'lib/api';

	import tooltip from 'lib/use/tooltip';
	import clickOutside from 'lib/use/clickOutside';
	import contenteditable from 'lib/use/contenteditable';

	import Loader from 'lib/components/Loader.svelte';
	import currentUser from 'lib/stores/currentUser';
	import FileInput from 'lib/components/FileInput.svelte';

	let submissions;

	export let page;

	let refreshSubmissions = async () => {
		if (!$currentUser) {
			return;
		}
		submissions = null;

		submissions = await get(`pages/${page._id}/submissions`, {});
	};

	refreshSubmissions();
</script>

<div class="px-8 py-16">
	{#if submissions?.results?.length}
		<div class="font-bold">
			Forms Submissions: {submissions.results.length}
		</div>

		<div class="max-h-[250px] overflow-y-auto">
			{#each submissions.results as submission}
				<div class="flex my-2 opacity-90 w-full justify-between items-center">
					<div>
						{submission.email}
						{#if submission.isVerified}
							<div class="inline" use:tooltip title="Email address is verified; Welcome email sent">
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
	{:else}
		You don't have form submissions yet. <br />
		Share your page around to get your first signups.
	{/if}
</div>
