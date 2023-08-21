<script>
	import _ from 'lodash';

	import { put, del } from 'lib/api';

	import FileInput from 'lib/components/FileInput.svelte';
	import Button from 'lib/components/Button.svelte';
	import EmojiPicker from 'lib/components/EmojiPicker.svelte';
	import EditColorPicker from 'lib/components/ColorPicker.svelte';
	import fileSizes from '$lib/stores/fileSizes';
	import fileFonts from '$lib/stores/fileFonts';
	import fileToEdit from '$lib/stores/fileToEdit';

	export let file;
	export let brand;
	export let onRemove = () => {};
	export let isParent;
	export let isChild;

	if (!file.theme && !isChild) {
		file.theme = {
			backgroundColor: '#fefefe',
			textColor: '#111111'
		};
	}

	if (!file.size && !isChild) {
		file.size = $fileSizes[0];
	}

	if (!file.logo) {
		file.logo = brand?.logo;
	}

	let updateFont = () => {
		if (isParent) {
			file.files = file.files.map((f) => {
				return {
					...f,
					theme: {
						...f.theme,
						font: file.theme.font
					}
				};
			});
		}
	};

	let updateName = () => {
		if (isParent) {
			file.files = file.files.map((f) => {
				return {
					...f,
					name: file.name
				};
			});
		}
	};

	let updateLogo = (logo) => {
		console.log('updaetlogo', file.logo);

		if (isParent) {
			file.files = file.files.map((f) => {
				return {
					...f,
					logo: logo
				};
			});
		}
	};
</script>

{#if !isChild}
	<div class="_section">
		<div class="flex justify-between mb-4">
			<div class="flex items-center">
				<EmojiPicker theme="dark" bind:icon={file.logo} onUpdated={updateLogo} />

				{#if !isParent}
					<div class="ml-2">
						<EditColorPicker
							bind:color={file.theme.backgroundColor}
							onUpdated={(color) => {
								file.theme = file.theme || {};

								if (color.isDarkColor) {
									file.theme = {
										...file.theme,
										backgroundColor: color.color,
										theme: 'dark',
										textColor: '#fefefe'
									};
								} else {
									file.theme = {
										...file.theme,
										backgroundColor: color.color,
										theme: 'light',
										textColor: '#111111'
									};
								}
							}}
						/>
					</div>
				{/if}
			</div>
			<div class="text-sm _link" on:click={onRemove}>Remove</div>
		</div>

		<div class="flex justify-between mb-4">
			<label class="font-bold mb-4 bold block"> Name</label>
			<input bind:value={file.name} on:input={updateName} />
		</div>

		<!-- <div class="flex justify-between mb-4">
		<label class="font-bold mb-4">File Type</label>
		<select><option>PNG</option><option>GIF</option><option>PDF</option></select>
	</div> -->

		<div class="flex justify-between mb-4">
			<label class="font-bold mb-4">Fonts</label>

			<select bind:value={file.theme.font} on:change={updateFont}>
				{#each $fileFonts as fileFonts}
					<option value={fileFonts.name}>{fileFonts.title}</option>
				{/each}
			</select>
		</div>

		<div class="flex justify-between">
			<label class="font-bold mb-4">Size</label>

			<select
				bind:value={file.size.name}
				on:change={(fileSizeName) => {
					file.size = _.cloneDeep($fileSizes.find((f) => f.name === file.size.name));
				}}
			>
				{#each $fileSizes as fileSize}
					<option value={fileSize.name}>{fileSize.title}</option>
				{/each}
			</select>
		</div>
	</div>
{/if}

{#if !isParent}
	<div class="_section mt-4">
		{#if isChild && file.theme}
			<div class="flex justify-between">
				<div class="mb-4">
					<EditColorPicker
						bind:color={file.theme.backgroundColor}
						onUpdated={(color) => {
							file.theme = file.theme || {};

							if (color.isDarkColor) {
								file.theme = {
									...file.theme,
									backgroundColor: color.color,
									theme: 'dark',
									textColor: '#fefefe'
								};
							} else {
								file.theme = {
									...file.theme,
									backgroundColor: color.color,
									theme: 'light',
									textColor: '#111111'
								};
							}
						}}
					/>
				</div>
				<div class="text-sm _link" on:click={onRemove}>Remove Frame</div>
			</div>
		{/if}
		<div>
			<label class="font-bold mb-2 block">Title</label>
			<input
				type="text"
				class="w-full mb-4"
				bind:value={file.title}
				placeholder={file.title || 'Momentum'}
			/>
		</div>

		<div>
			<label class="font-bold mb-2 block">Subtitle</label>
			<textarea
				type="text"
				class="w-full mb-4"
				rows="5"
				bind:value={file.subtitle}
				placeholder={file.subtitle ||
					'Build a better product in public and grow your audience early'}
			/>
		</div>
		<!-- 
		<div>
			<FileInput class="w-full" bind:url={file.imageUrl} />
		</div> -->
	</div>
{/if}
