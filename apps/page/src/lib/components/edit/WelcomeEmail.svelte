<!-- <script>
	import _ from 'lodash';
	import moment from 'moment-timezone';
	import { slide, fly, scale, fade } from 'svelte/transition';
	import { get, post, put } from 'lib/api';

	import tooltip from 'lib/use/tooltip';
	import clickOutside from 'lib/use/clickOutside';
	import contenteditable from 'lib/use/contenteditable';

	import Loader from 'lib/components/Loader.svelte';
	import Button from 'lib/components/Button.svelte';
	import currentUser from 'lib/stores/currentUser';
	import FileInput from 'lib/components/FileInput.svelte';
	import { showSuccessMessage, showErrorMessage } from 'lib/services/toast';

	export let page;
</script>

<hr class="my-8 border-[#8B786D] opacity-30" />

<div class="mt-4 font-bold">Your Welcome Email</div>

<div class="mt-4">
	<div class="text-sm opacity-70 mb-2">Subject</div>
	<input
		type="text"
		class="w-full"
		placeholder="Welcome to {page.name}!"
		bind:value={page.welcomeEmail.subject}
	/>
</div>
<div class="mt-2 w-full">
	<div class="text-sm opacity-70 mb-2">Email</div>
	<div
		contenteditable="true"
		use:contenteditable
		bind:innerHTML={page.welcomeEmail.html}
		class="w-full p-4 bg-[#fafafa]"
	/>
</div>

<div class="text-sm opacity-70 mt-4 mb-2">Demo Image</div>
<div class="text-sm mb-2">Attach your friendly selfie or image relevant to your product.</div>
<FileInput class="w-full" bind:url={page.welcomeEmail.imageUrl} theme="light" />

<div class="my-4 p-4 bg-green-600 rounded-xl text-white">
	Welcome email is sent once a user <b>verified</b> their email. <br />

	🤝 Make it friendly and personal <br />
	⏳ Keep it short and sweet <br />
	⚡️ Stimulate reader to take action: book a call, check out the link, reply to email, share in social
	media <br />
</div>

<div class="flex items-center">
	<Button class="_primary my-8 mr-4" onClick={updateEmailHtml}>Update Welcome Email</Button>
	<Button class="_secondary my-8" onClick={sendTestEmail}>🔬 Send Test Email</Button>
</div> -->
