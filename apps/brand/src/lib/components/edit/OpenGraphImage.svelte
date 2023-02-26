<script>
	import FileInput from 'lib/components/FileInput.svelte';
	import EmojiPicker from 'lib/components/EmojiPicker.svelte';

	export let openGraphImage;
	export let parent;
	export let isSections = false;
</script>

{#if isSections}
	<div class="_section">
		<div class="_title">Brand Name</div>

		<div>
			<input
				type="text"
				class="w-full mb-4"
				bind:value={openGraphImage.name}
				placeholder="Momentum"
			/>
		</div>
	</div>
	<div class="_section">
		<div class="_title">Tagline</div>

		<div>
			<textarea
				type="text"
				rows="4"
				class="w-full mb-4"
				bind:value={openGraphImage.description}
				placeholder="Build a better product in public and grow your audience early"
			/>
		</div>
	</div>

	<div class="_section">
		<div class="_title">Image</div>

		<div>
			<FileInput class="w-full" bind:url={openGraphImage.imageUrl} />
		</div>
	</div>
{:else}
	<div class="_section">
		<div class="mb-4">
			<EmojiPicker theme="dark" bind:icon={openGraphImage.logo} />
		</div>
		<div>
			<input
				type="text"
				class="w-full mb-4"
				bind:value={openGraphImage.name}
				placeholder={parent?.name || 'Momentum'}
			/>
		</div>

		<div>
			<textarea
				type="text"
				class="w-full mb-4"
				rows="4"
				bind:value={openGraphImage.description}
				placeholder={parent?.description ||
					'Build a better product in public and grow your audience early'}
			/>
		</div>

		<div>
			<FileInput class="w-full" bind:url={openGraphImage.imageUrl} />
		</div>
	</div>
{/if}
