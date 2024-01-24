<script>
	import _ from 'lodash';
	import moment from 'moment-timezone';
	import { slide, fly, scale, fade } from 'svelte/transition';
	import { get, post, put, del } from 'lib/api';
	import pageDraft from 'lib-render/stores/pageDraft';
	import allPages from 'lib-render/stores/allPages';
	import currentUser from 'lib/stores/currentUser';
	import subPages from 'lib/stores/subPages';
	import selectedSubmission from '$lib/stores/selectedSubmission';
	import formatSubmission from '$lib/helpers/formatSubmission';

	import RenderForm from 'lib-render/components/render/Form.svelte';
	import Button from 'lib/components/Button.svelte';
	import Loader from 'lib/components/Loader.svelte';
	import SitePreview from 'lib-render/components/SitePreview.svelte';
	import RenderServiceChat from 'lib-render/components/render/ServiceChat.svelte';
	import PageContainer from 'lib-render/components/PageContainer.svelte';
	import ServiceRequestCard from '$lib/components/ServiceRequestCard.svelte';

	import submissions from 'lib/stores/submissions';
	import submissionsOutbound from 'lib/stores/submissionsOutbound';

	export let selectedSubmissionsTab;
	export let page;
	export let setPageAndDraft;
</script>

{#if $selectedSubmission}
	{#key $selectedSubmission._id}
		<PageContainer class="p-8 mb-4 w-full h-full" {page}>
			<RenderServiceChat bind:submission={$selectedSubmission} bind:page />
		</PageContainer>
	{/key}
{:else}
	<div class="max-w-[900px] mx-auto">
		<div class="text-2xl font-bold mb-4 mt-8">Requests</div>
		<div class="grid grid-cols-3 gap-4">
			<div class="my-2">
				<div class="font-bold text-lg mb-4">To Do</div>

				{#each (selectedSubmissionsTab === 'inbound' ? $submissions : $submissionsOutbound).filter((s) => s.activateAmount && !s.isActivated) as submission}
					<ServiceRequestCard bind:submission />
				{/each}
			</div>
			<div class="my-2">
				<div class="font-bold text-lg mb-4">In Progress</div>

				{#each (selectedSubmissionsTab === 'inbound' ? $submissions : $submissionsOutbound).filter((s) => s.isActivated || (!s.activateAmount && !(s.isClosed || s.isPaid))) as submission}
					<ServiceRequestCard bind:submission />
				{/each}
			</div>
			<div class="my-2">
				<div class="font-bold text-lg mb-4">Done</div>

				{#each (selectedSubmissionsTab === 'inbound' ? $submissions : $submissionsOutbound).filter((s) => s.isClosed || s.isPaid) as submission}
					<ServiceRequestCard bind:submission />
				{/each}
			</div>
		</div>
	</div>
{/if}
