<script>
	import isInsertPopupShown from '$lib/stores/isInsertPopupShown';
	import selectedTemplatePage from '$lib/stores/selectedTemplatePage';
	import { feed as templateFeed, selectTemplatePage } from '$lib/stores/pageTemplates';

	import { page as sveltePage } from '$app/stores';

	$isInsertPopupShown = true;
	selectTemplatePage({ slug: $sveltePage.params.pageTemplateSlug });
</script>
