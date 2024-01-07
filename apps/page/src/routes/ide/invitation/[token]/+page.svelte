<script>
	import currentUser from 'lib/stores/currentUser';
	import { API_URL } from 'lib/env';
	import { page as sveltePage } from '$app/stores';
	import { browser } from '$app/environment';

	if (browser && !$currentUser) {
		window.document.location.href = `${API_URL}/pageInvitations/verify/${$sveltePage.params.token}`;
	}
</script>
