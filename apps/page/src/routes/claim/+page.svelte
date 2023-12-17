<script>
	import { page as sveltePage } from '$app/stores';
	import allPages from '$lib/stores/allPages';
	import { get } from 'lib/api';
	import { goto } from '$app/navigation';

	let pageId = $sveltePage.url.searchParams.get('pageId');

	let getPage = async () => {
		let page = await get(`pages/${pageId}`);
		$allPages = [page];
		goto('/');
	};
	getPage();
</script>
