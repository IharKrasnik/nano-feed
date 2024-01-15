<script>
	import currentUser from 'lib/stores/currentUser';
	import SitePreview from 'lib-render/components/SitePreview.svelte';
	import pageToClaim from '$lib/stores/pageToClaim';
	import Button from 'lib/components/Button.svelte';
	import { get, post } from 'lib/api';
	import { page as sveltePage } from '$app/stores';
	import { getGoogleLoginUrl } from 'lib/env';
	import { goto } from '$app/navigation';
	import allPages from 'lib-render/stores/allPages';
	import { showSuccessMessage, showErrorMessage } from 'lib/services/toast';

	let isClaimed = false;
	let getPage = async () => {
		let result = await get(`claimCodes/${$sveltePage.params.claimCode}/page`);
		$pageToClaim = result.page;
		isClaimed = result.isClaimed;
	};

	let claimPage = async () => {
		let { page } = await post(`claimCodes/claim?pageId=${$pageToClaim._id}`, {
			code: $sveltePage.params.claimCode
		});

		$allPages = [page, ...$allPages];
		showSuccessMessage(`Page ${page.name} was claimed`);

		goto('/ide');
	};

	getPage();
</script>

{#if $pageToClaim}
	<div
		class="w-full flex items-center justify-center border-2 fixed w-full top-[60px] h-[60px] left-0 border-green-300 z-10 bg-white"
	>
		{#if isClaimed}
			The website was already claimed. <a class="ml-2 underline" href="/ide">Return to editor</a>
		{:else}
			<img class="w-[30px] h-[30px] rounded-full mr-2" src={$pageToClaim.creator.avatarUrl} />
			{$pageToClaim.creator.fullName?.split(' ')[0]} shared {$pageToClaim.name} with you
			{#if $currentUser}
				<Button class="ml-4 _primary _small" onClick={claimPage}>Claim {$pageToClaim.name}</Button>
			{:else}
				<a href={getGoogleLoginUrl()}>
					<button class="ml-4 _primary _small">Login to Claim</button>
				</a>
			{/if}
		{/if}
	</div>

	<div class="h-[60px]" />

	<div style="height: calc(100vh - 120px); overflow-y: auto;">
		<SitePreview page={$pageToClaim} />
	</div>
{/if}
