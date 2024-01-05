<script>
	import { page as sveltePage } from '$app/stores';
	import selectedEditorTab from '$lib/stores/selectedEditorTab';

	$selectedEditorTab = $sveltePage.params.tabKey;
</script>
