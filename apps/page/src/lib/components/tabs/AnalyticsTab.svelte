<script>
	import _ from 'lodash';
	import moment from 'moment-timezone';
	import { slide, fly, scale, fade } from 'svelte/transition';
	import { get, post, put } from 'lib/api';

	import Loader from 'lib/components/Loader.svelte';
	import WaveDashboard from 'lib/components/wave/Dashboard.svelte';
	import currentUser from 'lib/stores/currentUser';

	export let page;
</script>

<div class="px-8 py-16">
	<div class="" in:fly={{ y: 50, duration: 150 }} style="height: calc(100vh - 60px);">
		<div class="mt-8 w-full">
			<WaveDashboard project={{ page }} />
		</div>
	</div>
</div>
