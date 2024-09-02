<script>
	import { v4 as uuidv4 } from 'uuid';

	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import FileInput from 'lib/components/FileInput.svelte';
	import ToggleGroup from '$lib/components/ToggleGroup.svelte';

	export let backgroundImages;
	export let isWithRelativeTo = false;
</script>

<div class="mt-4 mb-2">
	<div class="_section">
		<div class="flex w-full justify-between">
			<div class="font-semibold mb-2">Background images</div>
			<div
				class="cursor-pointer"
				on:click={() => {
					backgroundImages = backgroundImages || [];

					backgroundImages.unshift({
						id: uuidv4(),
						relativeTo: 'title_container',

						url: '',

						width: null,
						height: null,

						alignX: 'left',
						alignY: 'top',
						positionX: 0,
						positionY: 0,

						animation: {
							in: 'fly'
						}
					});

					backgroundImages = [...backgroundImages];
				}}
			>
				<FeatherIcon name="plus" size={16} />
			</div>
		</div>

		<div class="flex flex-col gap-y-2">
			{#each backgroundImages || [] as backgroundImage}
				<div>
					<div class="_section">
						<div class="flex gap-x-2 w-full justify-between items-center">
							<FileInput
								bind:url={backgroundImage.url}
								class="w-full"
								theme="light"
								onRemoved={() => {
									backgroundImages = backgroundImages.filter((i) => i.id !== backgroundImage.id);
								}}
							/>
						</div>
						{#if isWithRelativeTo}
							<div class="mb-2  mt-2">
								<ToggleGroup
									bind:value={backgroundImage.relativeTo}
									tabs={[
										{
											key: 'container',
											name: 'Container'
										},
										{
											key: 'title_container',
											name: 'Titles'
										},
										{
											key: 'demo',
											name: 'Demo'
										}
									]}
								/>
							</div>
						{/if}
						<div class="w-full flex gap-x-2 mb-2">
							<div class="flex gap-x-1 items-center w-full">
								w:
								<input class="w-full" type="number" bind:value={backgroundImage.width} />
							</div>
							<div class="flex gap-x-1 items-center w-full">
								h:
								<input class="w-full" type="number" bind:value={backgroundImage.height} />
							</div>
						</div>
						<div class="mt-1">
							<div class="flex items-center justify-between w-full">
								<ToggleGroup
									bind:value={backgroundImage.alignX}
									tabs={[
										{
											key: 'left',
											icon: '<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.499995 0.999995C0.223855 0.999995 -5.58458e-07 1.22385 -5.46388e-07 1.49999L-2.18554e-08 13.4999C-9.78492e-09 13.776 0.223855 13.9999 0.499995 13.9999C0.776136 13.9999 0.999991 13.776 0.999991 13.4999L0.999991 8.99993L12 8.99993C12.5523 8.99993 13 8.55222 13 7.99993L13 6.99994C13 6.44766 12.5523 5.99995 12 5.99995L0.999991 5.99995L0.999991 1.49999C0.999991 1.22385 0.776135 0.999995 0.499995 0.999995Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>'
										},
										{
											key: 'center',
											icon: '<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.99988 6C1.44759 6 0.999877 6.44772 0.999877 7L0.999877 8C0.999877 8.55228 1.44759 9 1.99988 9L6.99988 9L6.99988 13.5C6.99988 13.7761 7.22374 14 7.49988 14C7.77602 14 7.99988 13.7761 7.99988 13.5L7.99988 9L12.9999 9C13.5522 9 13.9999 8.55228 13.9999 8L13.9999 7C13.9999 6.44772 13.5522 6 12.9999 6L7.99988 6L7.99988 1.5C7.99988 1.22386 7.77602 1 7.49988 1C7.22373 1 6.99988 1.22386 6.99988 1.5L6.99988 6L1.99988 6Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>'
										},
										{
											key: 'right',
											icon: '<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.4999 1C14.2237 1 13.9999 1.22386 13.9999 1.5L13.9999 6L2.99988 6C2.44759 6 1.99988 6.44772 1.99988 7L1.99988 8C1.99988 8.55228 2.44759 9 2.99988 9L13.9999 9L13.9999 13.5C13.9999 13.7761 14.2237 14 14.4999 14C14.776 14 14.9999 13.7761 14.9999 13.5L14.9999 9L14.9999 6L14.9999 1.5C14.9999 1.22386 14.776 1 14.4999 1Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>'
										}
									]}
								/>
								<input class="ml-2 w-[70px]" type="number" bind:value={backgroundImage.positionX} />
							</div>
							<div class="flex items-center justify-between w-full">
								<ToggleGroup
									bind:value={backgroundImage.alignY}
									tabs={[
										{
											key: 'top',
											icon: '<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 0C1.22386 0 1 0.223858 1 0.5C1 0.776142 1.22386 1 1.5 1H6V12C6 12.5523 6.44772 13 7 13H8C8.55228 13 9 12.5523 9 12V1H13.5C13.7761 1 14 0.776142 14 0.5C14 0.223858 13.7761 0 13.5 0H9H6H1.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>'
										},
										{
											key: 'middle',
											icon: '<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.99988 1C6.44759 1 5.99988 1.44772 5.99988 2V7H1.49988C1.22374 7 0.999878 7.22386 0.999878 7.5C0.999878 7.77614 1.22374 8 1.49988 8H5.99988V13C5.99988 13.5523 6.44759 14 6.99988 14H7.99988C8.55216 14 8.99988 13.5523 8.99988 13V8H13.4999C13.776 8 13.9999 7.77614 13.9999 7.5C13.9999 7.22386 13.776 7 13.4999 7H8.99988V2C8.99988 1.44772 8.55216 1 7.99988 1L6.99988 1Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>'
										},
										{
											key: 'bottom',
											icon: '<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 3C9 2.44772 8.55229 2 8 2H7C6.44772 2 6 2.44772 6 3L6 14H1.5C1.22386 14 1 14.2239 1 14.5C1 14.7761 1.22386 15 1.5 15L6 15H9H13.5C13.7761 15 14 14.7761 14 14.5C14 14.2239 13.7761 14 13.5 14H9V3Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>'
										}
									]}
								/>
								<input class="ml-2 w-[70px]" type="number" bind:value={backgroundImage.positionY} />
							</div>
						</div>
						<div>
							<textarea
								bind:value={backgroundImage.style}
								class="w-full"
								rows="1"
								placeholder="background-color: red;"
							/>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
