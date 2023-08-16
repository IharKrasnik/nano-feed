<script>
	import { get, post } from 'lib/api';
	import Button from 'lib/components/Button.svelte';

	export let blog;

	let newDomainUrl;

	let addDomain = async () => {
		let domains = await post(`blogs/${blog._id}/domains`, {
			url: newDomainUrl
		});

		newDomainUrl = null;

		blog.domains = domains;
	};

	let domainToEdit = null;

	let refreshDomainStatus = async (domain) => {
		let { isConfigured } = await get(`blogs/${blog._id}/domains/${domain.url}`);

		blog.domains = blog.domains.map((d) => {
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
	{#each blog.domains || [] as domain}
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
							<b>A RECORD @ 76.76.21.21</b>

							<div class="mt-2 text-sm">
								Read <a href="https://uk.godaddy.com/help/add-an-a-record-19238" target="_blank"
									>Tutorial</a
								>
							</div>
						{:else}
							<b>CNAME RECORD {domain.url.split('.')[0]} cname.vercel-dns.com.</b>

							<div class="mt-2 text-sm">
								Read <a href="https://uk.godaddy.com/help/add-a-cname-record-19236" target="_blank"
									>Tutorial</a
								>
							</div>
						{/if}
					</div>
				</div>
			{/if}
		</div>
	{/each}
</div>
