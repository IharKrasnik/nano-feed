<script>
	import RenderUrl from 'lib/components/RenderUrl.svelte';

	export let page;
	export let section;
	export let themeStyles;

	let newsLetter = section.items[0];
</script>

<div class="_newsletter_form rounded-xl w-full grid sm:grid-cols-3 gap-4 items-center p-4 sm:p-8">
	<div class="col-span-1">
		<div class="_item-title mb-2">
			{newsLetter.title}
		</div>
		<div class="_item-description">
			{newsLetter.description}
		</div>

		<div class="_input_container _border mt-4  max-w-[300px] ">
			<form class="w-full flex flex-col sm:flex-row gap-4" on:submit|preventDefault={() => {}}>
				<input placeholder="myemail@gmail.com" class="_input _email-input w-full" />
				<button type="submit" class="_input_button _wide absolute"
					>{newsLetter.callToActionText || 'Subscribe'}</button
				>
			</form>
		</div>
	</div>

	<div class="col-span-2 flex items-center  w-full justify-center">
		<RenderUrl class="w-full" imgClass="mx-auto" url={newsLetter.imageUrl} />
	</div>
</div>

<style>
	._newsletter_form {
		background: rgba(0, 0, 0, 0.03);
		/* background: var(--accent-color);
		color: var(--button-color); */
	}
</style>
