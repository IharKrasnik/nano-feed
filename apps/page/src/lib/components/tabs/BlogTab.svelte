<script>
	import _ from 'lodash';
	import moment from 'moment-timezone';
	import { slide, fly, scale, fade } from 'svelte/transition';
	import { get, post, put, del } from 'lib/api';
	import pageDraft from 'lib-render/stores/pageDraft';
	import allPages from 'lib-render/stores/allPages';
	import currentUser from 'lib/stores/currentUser';
	import subPages from 'lib/stores/subPages';

	import Button from 'lib/components/Button.svelte';
	import Loader from 'lib/components/Loader.svelte';
	import SitePreview from 'lib-render/components/SitePreview.svelte';

	export let page;
	export let setPageAndDraft;

	let blogPage = $subPages.find((s) => s.slug === 'blog');
</script>

{#if blogPage}
	<SitePreview page={blogPage} />
{/if}
