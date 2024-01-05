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

	import Button from 'lib/components/Button.svelte';
	import Loader from 'lib/components/Loader.svelte';
	import SitePreview from 'lib-render/components/SitePreview.svelte';
	import RenderServiceChat from 'lib-render/components/render/ServiceChat.svelte';
	import PageContainer from 'lib-render/components/PageContainer.svelte';

	export let page;
	export let setPageAndDraft;

	let blogPage = $subPages.find((s) => s.slug === 'blog');

	let selectedSubmissionsTab = 'inbound';
</script>

{#if $selectedSubmission}
	{#key $selectedSubmission._id}
		<PageContainer class="p-8 mb-4 w-full h-full" {page}>
			<RenderServiceChat bind:submission={$selectedSubmission} bind:page />
		</PageContainer>
	{/key}
{/if}
