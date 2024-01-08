<script>
	import { get, post, del } from 'lib/api';
	import { IDE_URL } from 'lib/env';
	import Button from 'lib/components/Button.svelte';
	import { showSuccessMessage } from 'lib/services/toast';

	export let page;
	let parentPage = page.parentPage || page;

	let newInviteeEmail = '';

	let pageInvitations = [];

	let refreshPageInvitations = async () => {
		// pageInvitations = await get('pageInvitations', {
		// 	pageId: parentPage._id
		// });
	};
	refreshPageInvitations();
	let claimCode;

	let makeClaimable = async () => {
		let result = await post(`pages/${parentPage._id}/settings/isClaimable`, {
			isClaimable: true
		});

		claimCode = result.claimCode;

		parentPage.isClaimable = true;

		showSuccessMessage(`The website is claimable now`);
	};

	let makeUnclaimable = async () => {
		let claimCode = await post(`pages/${parentPage._id}/settings/isClaimable`, {
			isClaimable: false
		});

		parentPage.isClaimable = false;
		showSuccessMessage(`The website is no longer claimable`);
	};

	let revealClaimCode = async () => {
		let result = await post(`claimCodes/reveal?pageId=${parentPage._id}`);
		claimCode = result.claimCode;
	};
</script>

<h3 class="text-xl font-bold mb-2">Transfer Ownership</h3>
<div class="text-sm mb-4">
	Generate the link to claim website. Once page is claimed, user becomes an owner of the page.
</div>

{#if parentPage.isClaimable}
	<div class="_section _info">
		<div class="font-bold">This website is claimable</div>

		{#if claimCode}
			<div class="flex items-center  mt-4">
				<div class="text-lg">
					{IDE_URL}/claim/{claimCode.code}
				</div>
				<button
					class="_primary _small ml-4"
					on:click={() => {
						let link = `${IDE_URL}/claim/${claimCode.code}`;
						navigator.clipboard.writeText(link);
						showSuccessMessage('Copied Link');
					}}>Copy</button
				>
			</div>
		{:else}{/if}

		<div class="flex items-center mt-4">
			{#if !claimCode}
				<Button class="_primary _small mr-4" onClick={revealClaimCode}>Reveal Claim Link</Button>
			{/if}
			<Button class="_secondary _small" onClick={makeUnclaimable}>Stop Transfer</Button>
		</div>
	</div>
{:else}
	<div class="_section _info">
		<div class="font-bold">This website is not claimable</div>

		Generate transfer link if you want to transfer ownership.

		<div class="flex items-center mt-4">
			<Button class="_secondary _small" onClick={makeClaimable}>Generate Link</Button>
		</div>
	</div>
{/if}
