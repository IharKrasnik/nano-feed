<script>
	import { get } from 'lib/api';
	import { LINKEDIN_LOGIN_URL, TWITTER_LOGIN_URL } from 'lib/env';
	import TwitterIcon from 'lib/icons/twitter.svelte';
	import LinkedinIcon from 'lib/icons/linkedin.svelte';

	import currentUser from 'lib/stores/currentUser';

	let linkedInLogin = async () => {
		const { url } = await get(LINKEDIN_LOGIN_URL);
		window.document.location.href = url;
	};

	let twitterLogin = async () => {
		const { url } = await get(TWITTER_LOGIN_URL);
		window.document.location.href = url;
	};
</script>

{#if $currentUser.twitterData}
	<button on:click={twitterLogin}>Link Twitter</button>
{/if}
