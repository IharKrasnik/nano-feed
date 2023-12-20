<script>
	import { get, post } from 'lib/api';
	import Button from 'lib/components/Button.svelte';
	import { showSuccessMessage } from 'lib/services/toast';

	export let page;

	let newDomainUrl;

	let addDomain = async () => {
		let domains = await post(`pages/${page._id}/domains`, {
			_isIde: true,
			url: newDomainUrl
		});

		newDomainUrl = null;

		page.domains = domains;
	};

	let domainToEdit = null;

	let refreshDomainStatus = async (domain) => {
		let { isConfigured } = await get(`pages/${page._id}/domains/${domain.url}`);

		page.domains = page.domains.map((d) => {
			if (d.url === domain.url) {
				d.isConfigured = isConfigured;
				return d;
			} else {
				return d;
			}
		});
	};
</script>

<h3 class="text-xl font-bold mb-2">Domains</h3>
<div class="text-sm mb-4">Attach your custom domain for free</div>

<div class="flex items-center">
	<input placeholder="mydomain.com" bind:value={newDomainUrl} />
	<Button class="_primary _small ml-2" onClick={addDomain}>Add</Button>
</div>

<div class="mt-8">
	{#each page.domains || [] as domain}
		<div class="p-2 mb-2 _section">
			<div class="flex w-full justify-between items-center">
				<div class="flex">
					<div>{domain.url}</div>
					{#if domain.isConfigured}
						<div class="ml-2">✅</div>
					{/if}
				</div>
				<Button class="_small _primary" onClick={() => refreshDomainStatus(domain)}>refresh</Button>
			</div>
			{#if !domain.isConfigured}
				<div class="bg-orange-400 text-white rounded-lg p-4 mt-4">
					<div class="font-bold">Set the following record on your DNS provider to continue:</div>
					<div class="mt-2">
						{#if domain.url.split('.').length === 2}
							A Record @ 76.76.21.21

							<div class="flex mt-4">
								<div>
									<div class="font-semibold text-xs mb-1">Name</div>
									<input class="_dark w-[100px]" type="text" disabled value="@" />
									<button
										on:click={() => {
											navigator.clipboard.writeText(domain.url.split('.')[0]);
											showSuccessMessage('@');
										}}>copy</button
									>
								</div>

								<div class="ml-12">
									<div class="font-semibold text-xs mb-1">Content</div>
									<input class="_dark" type="text" disabled value="76.76.21.21" />
									<button
										on:click={() => {
											navigator.clipboard.writeText('76.76.21.21');
											showSuccessMessage('Copied to clipboard');
										}}>copy</button
									>
								</div>
							</div>
							<div>
								<img
									class="my-4"
									src="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1703091909820-image.png"
								/>
							</div>
							<div class="mt-4 text-sm">
								Don't know how to add DNS records? <br />

								<a
									class="underline"
									href="https://uk.godaddy.com/help/add-an-a-record-19238"
									target="_blank"
								>
									Read Tutorial</a
								>
							</div>
						{:else}
							CNAME DNS record
							<div class="grid grid-cols-2 mt-2">
								<div class=" ">
									<div class="font-semibold text-xs mb-1">Name</div>
									<input class="_dark" type="text" disabled value={domain.url.split('.')[0]} />
									<button
										on:click={() => {
											navigator.clipboard.writeText(domain.url.split('.')[0]);
											showSuccessMessage('Copied to clipboard');
										}}>copy</button
									>
								</div>
								<div>
									<div class="font-semibold text-xs mb-1">Content</div>
									<input class="_dark" type="text" disabled value="cname.vercel-dns.com." />
									<button
										on:click={() => {
											navigator.clipboard.writeText('cname.vercel-dns.com.');
											showSuccessMessage('Copied to clipboard');
										}}>copy</button
									>
								</div>
							</div>

							{#if domain.url.includes('www.')}
								<img
									class="my-4"
									src="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1703091998051-image.png"
								/>
							{:else}
								<img
									class="my-4"
									src="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1703090079838-image.png"
								/>
							{/if}

							<div class="mt-4 text-sm">
								Don't know how to add DNS records? <br />

								<a
									class="underline"
									href="https://uk.godaddy.com/help/add-a-cname-record-19236"
									target="_blank">Read Tutorial</a
								>
							</div>
						{/if}
					</div>
				</div>
			{/if}
		</div>
	{/each}
</div>
