<script>
	import _ from 'lodash';

	import { get } from 'lib/api';
	import { fly } from 'svelte/transition';
	import autofocus from 'lib/use/autofocus';
	import Loader from 'lib/components/Loader.svelte';
	import Modal from 'lib/components/Modal.svelte';
	import RenderUrl from 'lib/components/RenderUrl.svelte';

	let isModalOpen = false;
	let isLoading = false;

	export let url = '';

	let embedServices = [
		{
			key: 'youtube',
			whenIncludes: 'youtube.com',
			name: 'YouTube',
			description: 'Videos',
			placeholder: 'https://www.youtube.com/watch?v=X6xQO7-Ug2A'
		},
		{
			key: 'vimeo',
			whenIncludes: 'vimeo.com',
			name: 'Vimeo',
			description: 'Videos',
			placeholder: 'https://vimeo.com/776097643'
		},
		{
			key: 'loom',
			whenIncludes: 'loom.com',
			name: 'Loom',
			description: 'Screen video recordings (demos, promos, how-tos, screenshares)',
			placeholder: 'https://www.loom.com/share/2fcc0c0e8f01443181c5fbf77476e8e0'
		},
		{
			key: 'tally',
			whenIncludes: 'tally.so',
			name: 'Tally',
			description: 'Form',
			placeholder: 'https://tally.so/r/3EdVvl'
		},
		{
			key: 'typeform',
			whenIncludes: 'form.typeform.com',
			name: 'TypeForm',
			description: 'Form',
			placeholder: 'https://form.typeform.com/to/tJTbsZP4'
		},
		{
			key: 'videoask',
			whenIncludes: 'videoask.com',
			name: 'VideoAsk',
			description: 'Video Form',
			placeholder: 'https://www.videoask.com/fei8fmlos'
		},
		{
			key: '$senja',
			whenIncludes: '$senja',
			name: 'Senja',
			description: 'Testimonial widget',
			fields: [
				{
					name: 'Widget ID',
					varName: 'widgetId',
					value: 'e2023a0b-4ae6-4b93-b7d8-647463afe203',
					placeholder: 'e2023a0b-4ae6-4b93-b7d8-647463afe203'
				}
			]
		},
		{
			key: 'iframe',
			name: 'Any iFrame',
			description: 'Embed any page by URL',
			placeholder: 'https://mmntm.build'
		}
	];

	let getServiceKey = (url) => {
		return (
			embedServices.find((s) => url.includes(s.whenIncludes)) ||
			embedServices.find((s) => s.key === 'iframe')
		).key;
	};

	let selectedService = null;

	export let onSelected = (url) => {};

	let close = () => {
		isModalOpen = false;
	};

	let updateUrl = ({ field }) => {
		if (!field.value) {
			return '';
		}
		url = `${selectedService.key}?${field.varName}=${encodeURIComponent(field.value)}`;
	};

	let detectAndSelectService = () => {
		embedServices.forEach((s) => (s.isSelected = false));

		if (url) {
			let serviceKey = getServiceKey(url);
			selectedService = embedServices.find((s) => s.key === serviceKey);

			selectedService.isSelected = true;
			embedServices = [...embedServices];
		} else {
			embedServices.forEach((s) => (s.isSelected = false));
		}
	};

	$: if (!url) {
		selectedService = null;
	} else {
		detectAndSelectService();
	}

	let openModal = () => {
		isModalOpen = true;

		if (url) {
			let serviceKey = getServiceKey(url);
			embedServices.find((s) => s.key === serviceKey).isSelected = true;
		}
	};
</script>

<div on:click={openModal}>🔌</div>

{#if isModalOpen}
	<Modal isShown onClosed={() => close()} maxWidth={1000}>
		<div>
			<div class="p-8">
				<h2 class="font-bold text-xl mb-4">Embed Services</h2>

				{#if selectedService}
					<div class="grid grid-cols-1">
						<div>
							{#if selectedService.fields?.length}
								{#each selectedService.fields as field}
									<div class="text-sm font-bold mb-2">{field.name}</div>
									<input
										type="text"
										class="w-full"
										bind:value={field.value}
										placeholder={field.placeholder}
										on:input={() => {
											updateUrl({ field });
										}}
									/>
								{/each}
							{:else}
								<div class="text-sm font-bold mb-2">URL</div>

								<input
									type="url"
									class="w-full"
									bind:value={url}
									placeholder={selectedService.placeholder || 'https://...'}
								/>
							{/if}

							<div class="my-4 mb-8">
								<button
									class="_primary mr-2"
									on:click={() => {
										onSelected(url);
										close();
									}}>💾 Save</button
								>
								<button class="_secondary mr-2" on:click={close}>Cancel</button>
							</div>
						</div>

						{#key url}
							<div class="bg-gray-300/50 _section col-span-2 mt-8">
								<div class="text-lg font-bold mb-4">Preview</div>
								<RenderUrl {url} />
							</div>
						{/key}
					</div>
				{:else}
					<input placeholder="Insert URL" use:autofocus bind:value={url} />

					<div class="my-4 mb-8">
						<button
							class="_primary mr-2"
							on:click={() => {
								onSelected(url);
								close();
							}}>💾 Save</button
						>
						<button class="_secondary mr-2" on:click={close}>Cancel</button>
					</div>
				{/if}

				<div class="mt-4 grid sm:grid-cols-3 gap-4">
					{#each embedServices as service}
						<div
							class="p-4 _section cursor-pointer _clickable"
							class:_highlighted={url && service.isSelected}
							on:click={() => {
								selectedService = service;

								if (!selectedService.fields) {
									url = selectedService.placeholder || '';
								} else {
									setTimeout(() => {
										updateUrl({ field: selectedService.fields[0] });
									});
								}
							}}
						>
							<div class="font-bold">
								{service.name}
							</div>
							{service.description}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</Modal>
{/if}
