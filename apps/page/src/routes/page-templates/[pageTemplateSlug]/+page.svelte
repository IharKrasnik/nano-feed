<script>
	import isInsertPopupShown from 'lib-render/stores/isInsertPopupShown';
	import selectedTemplatePage from 'lib-render/stores/selectedTemplatePage';
	import { feed as templateFeed, selectTemplatePage } from 'lib-render/stores/pageTemplates';

	import { page as sveltePage } from '$app/stores';

	$isInsertPopupShown = true;
	selectTemplatePage({ slug: $sveltePage.params.pageTemplateSlug });
</script>
