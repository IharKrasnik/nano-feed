<script>
	import _ from 'lodash';

	import FileInput from 'lib/components/FileInput.svelte';
	import EmojiPicker from 'lib/components/EmojiPicker.svelte';

	export let openGraphImage;
	export let brand;
	export let onRemove = () => {};
</script>

<div class="_section">
	<div class="flex justify-between mb-4">
		<EmojiPicker theme="dark" bind:icon={openGraphImage.logo} />

		<div class="text-sm _link" on:click={onRemove}>Remove</div>
	</div>
	<div>
		<input
			type="text"
			class="w-full mb-4"
			bind:value={openGraphImage.name}
			placeholder={brand.name || 'Momentum'}
		/>
	</div>

	<div>
		<textarea
			type="text"
			class="w-full mb-4"
			rows="4"
			bind:value={openGraphImage.title}
			placeholder={brand.title || 'Build a better product in public and grow your audience early'}
		/>
	</div>

	<div>
		<FileInput class="w-full" bind:url={openGraphImage.imageUrl} />
	</div>
</div>
