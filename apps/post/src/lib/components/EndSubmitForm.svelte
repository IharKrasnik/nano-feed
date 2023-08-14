<script>
	import { fly, fade, slide } from 'svelte/transition';
	import { post as apiPost } from 'lib/api';

	export let isSubmitted;
	import Emoji from 'lib/components/Emoji.svelte';

	export let post;
	export let blog = post?.blog;

	let email;

	let submitEmail = async () => {
		await apiPost(`audiences?audienceId=${blog._id}&blogId=${blog._id}`, { email });
		isSubmitted = true;

		if (blog.actionUrl) {
			setTimeout(() => {
				window.location.href = blog.actionUrl;
			}, 2000);
		}
	};
</script>

<div
	class="p-4 sm:p-8 w-full text-center bg-[#fafafa] max-h-[100%] sticky z-0 bottom-0 flex flex-col justify-center min-h-screen"
	style="color: {blog.theme?.theme === 'dark' ? '#fafafa' : '#222'}; background-color: {blog.theme
		?.theme === 'dark'
		? '#222'
		: '#fafafa'}"
>
	<div class="mx-auto max-w-[750px] flex flex-col items-center justify-center">
		<div class="flex items-center text-lg my-4">
			<Emoji class="mr-2" emoji={blog.logo} />
			<span>
				{blog.name}
			</span>
		</div>
		<div class="_title text-3xl font-bold mb-8">
			{@html blog.title}
		</div>
	</div>

	<div
		class="_input_container flex items-center mx-auto 
                        {blog.isCollectEmails
			? `w-full ${isSubmitted ? '' : '_border '}` +
			  (blog.callToAction.length < 20 ? 'sm:w-[392px]' : 'sm:w-[500px]')
			: ''}"
	>
		<form
			class="w-full {blog.isCollectEmails ? '' : 'flex justify-center'}"
			on:submit|preventDefault={submitEmail}
		>
			{#if !isSubmitted}
				{#if blog.isCollectEmails}
					<input
						class="_input _email-input w-full"
						placeholder="Your Email"
						type="email"
						required
						bind:value={email}
						disabled={isSubmitted}
						in:fade={{ duration: 150 }}
					/>
					<button
						type="submit"
						class="_input_button justify-center {blog.isCollectEmails
							? 'sm:absolute w-full sm:w-auto mt-4 sm:mt-0'
							: ''}">{blog.callToAction}</button
					>
				{:else}
					<a href={blog.actionUrl} target="_blank" class="button _input_button">
						{blog.callToAction}
					</a>
				{/if}
			{:else}
				<div>💥 Thank you!</div>

				{#if blog.actionUrl}
					<div class="mt-8 opacity-70">Redirecting...</div>
				{/if}
			{/if}
		</form>
	</div>
</div>

<style src="./app-site.css">
</style>
