<script>
	import RenderServiceChat from 'lib-render/components/render/ServiceChat.svelte';
	import { page as sveltePage } from '$app/stores';

	debugger;
</script>

yoo

<RenderServiceChat roomId={$sveltePage.params.serviceRequestId} page={$sveltePage.data.page} />
