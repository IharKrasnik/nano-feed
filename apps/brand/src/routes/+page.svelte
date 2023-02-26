<script>
	import _ from 'lodash';
	import moment from 'moment-timezone';
	import { onMount } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';
	import { slide, fly, scale, fade } from 'svelte/transition';
	import { goto } from '$app/navigation';

	import { get, post, put } from 'lib/api';
	import currentUser from 'lib/stores/currentUser';
	import allBrands from '$lib/stores/allBrands';
	import brandDraft from '$lib/stores/brandDraft';
	import tooltip from 'lib/use/tooltip';
	import clickOutside from 'lib/use/clickOutside';
	import BrowserFrame from 'lib/components/BrowserFrame.svelte';
	import EditOpenGraphImage from '$lib/components/edit/OpenGraphImage.svelte';
	import EditColorPicker from '$lib/components/edit/ColorPicker.svelte';
	import FileInput from 'lib/components/FileInput.svelte';
	import OpenGraphPreview from '$lib/components/OpenGraphPreview.svelte';
	import EmojiPicker from 'lib/components/EmojiPicker.svelte';

	import { ConfettiExplosion } from 'svelte-confetti-explosion';

	import { GOOGLE_LOGIN_URL, PAGE_URL, STREAM_URL } from 'lib/env';

	onMount(async () => {
		await import('emoji-picker-element/svelte');
	});

	let brandSlug;
	let isJustCreated = false;
	let isSignupFormShown = false;
	let isLoading = false;

	let defaultBrand = () => {
		return {
			logo: '💯',
			slug: '_new',
			name: '',
			title: '',
			imageUrl: '',
			theme: {},
			openGraphImages: []
		};
	};

	let publishBrand = async () => {
		if (brand._id) {
			brand = await put(`brands/${brand._id}`, brand);

			$allBrands = $allBrands.map((b) => {
				if (b._id === brand._id) {
					return _.cloneDeep(brand);
				} else {
					return b;
				}
			});
		} else {
			brand = await post('brands', brand);
			isJustCreated = true;
			$allBrands = [brand, ...$allBrands];
		}
	};

	let addOpenGraphImage = () => {
		brand = {
			...brand,
			openGraphImages: [...brand.openGraphImages, {}]
		};
	};

	let defaultPage = {
		_id: undefined,
		name: '',
		title: '',
		subtitle: '',
		callToAction: 'Join Waitlist',
		bgColor: '',
		slug: '_new',
		isCollectEmails: true
	};

	let brand = { ..._.cloneDeep($brandDraft['_new'] || defaultBrand()) };

	let isBrandSet = false;

	let refreshData = () => {};

	let setBrandAndDraft = (p, { force = false } = {}) => {
		brand = { ..._.cloneDeep(p) };

		if (
			!force &&
			$brandDraft[brand.slug] &&
			new Date(brand.updatedOn) < new Date($brandDraft[brand.slug].updatedOn)
		) {
			brand = _.cloneDeep($brandDraft[brand.slug]);
		} else {
			$brandDraft = {
				..._.cloneDeep($brandDraft),
				[brand.slug]: { ..._.cloneDeep(brand) }
			};
		}

		brandSlug = brand.slug;
	};

	$: if (!isBrandSet && $currentUser && $allBrands?.length && !brand?._id) {
		setBrandAndDraft({ ..._.cloneDeep($allBrands[0]) });

		refreshData();
		isBrandSet = true;
	}

	let removeOpenGraphImage = (openGraphImage) => {
		brand = {
			...brand,
			openGraphImages: [...brand.openGraphImages.filter((image) => image !== openGraphImage)]
		};
	};
</script>

{#if !$currentUser || $allBrands}
	<div class="fixed w-full" />

	<div class="container mx-auto relative">
		<div class="flex relative">
			<div
				class="fixed mt-[70px] min-w-[426px] pt-0 h-screen overflow-y-scroll"
				style="padding-bottom: 100px;"
				in:fly={{ x: 50, duration: 150, delay: 150 }}
			>
				<div class="fixed top-0 z-10 w-[426px] mb-[70px]">
					<div
						class="flex items-center justify-between w-full py-4 pr-4"
						class:justify-between={!$currentUser}
					>
						<a on:click={() => (isSignupFormShown = false)}>
							<h2
								class="font-bold flex items-center"
								style="font-family: Archivo; font-size: 20px;"
							>
								<svg
									width="34"
									height="34"
									viewBox="0 0 34 34"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M1.13635 4.00622C0 5.92768 0 8.52138 0 13.7088V20.2912C0 25.4786 0 28.0723 1.13635 29.9938C1.836 31.1768 2.82316 32.164 4.00622 32.8637C5.92768 34 8.52138 34 13.7088 34H20.2912C25.4786 34 28.0723 34 29.9938 32.8637C31.1768 32.164 32.164 31.1768 32.8637 29.9938C34 28.0723 34 25.4786 34 20.2912V13.7088C34 8.52138 34 5.92768 32.8637 4.00622C32.164 2.82316 31.1768 1.836 29.9938 1.13635C28.0723 0 25.4786 0 20.2912 0H13.7088C8.52138 0 5.92768 0 4.00622 1.13635C2.82316 1.836 1.836 2.82316 1.13635 4.00622Z"
										fill="white"
									/>
									<rect x="6" y="9" width="22" height="13" rx="2" fill="#0C120C" />
									<rect x="14" y="14" width="12" height="2" rx="1" fill="white" />
									<rect x="9" y="19" width="6" height="6" rx="2" fill="#0C120C" />
								</svg>

								<div class="ml-2">brand</div>
							</h2>
						</a>

						{#if $currentUser}
							{#if $allBrands}
								<select
									class="ml-8 w-[275px]"
									bind:value={brandSlug}
									on:change={(evt) => {
										let slug = evt.target.value;
										if (slug === '_new') {
											brand = { ..._.cloneDeep($brandDraft['_new'] || defaultBrand()) };
											brandSlug = brand.slug;
										} else {
											setBrandAndDraft({
												..._.cloneDeep($allBrands.find((p) => p.slug === evt.target.value))
											});
											refreshData();
										}
									}}
								>
									{#each $allBrands as brand}
										<option value={brand.slug}>{brand.name}</option>
									{/each}
									<option value="_new">⬜️ Create New Brand</option>
								</select>
							{:else}
								<Loader />
							{/if}
						{:else}
							<a href={GOOGLE_LOGIN_URL}>
								<button class="_primary"> Log In </button>
							</a>
						{/if}
					</div>

					<div>
						<hr class="w-full _border-brand" />
					</div>
				</div>

				<!-- {#if !$currentUser}
					<div class="mt-8">Launch your brand in seconds 👇</div>
				{/if} -->

				<div class="w-[426px] p-4 pl-0 mr-4">
					<div class="flex items-center mb-2">
						{#if brand._id}
							<EmojiPicker theme="dark" bind:icon={brand.logo} />
							<div class="ml-2">
								<EditColorPicker bind:color={brand.bgColor} />
							</div>
						{/if}
					</div>
					{#if !brand._id}
						<div class="_section">
							<div class="_title">Brand Name</div>

							<div>
								<input
									type="text"
									class="w-full mb-4"
									bind:value={brand.name}
									placeholder="Momentum"
								/>
							</div>
						</div>
					{/if}
					<div class="_section">
						<div class="_title">Tagline</div>

						<div>
							<textarea
								type="text"
								rows="4"
								class="w-full mb-4"
								bind:value={brand.title}
								placeholder="Build a better product in public and grow your audience early"
							/>
						</div>
					</div>

					{#if brand._id}
						<div class="_section">
							<div class="_title">Image</div>

							<div>
								<FileInput class="w-full" bind:url={brand.imageUrl} />
							</div>
						</div>
					{/if}

					{#if brand.openGraphImages.length}
						<div class="py-8">Open Graph Images</div>
					{/if}

					{#each brand.openGraphImages as openGraphImage}
						<EditOpenGraphImage
							bind:brand
							bind:openGraphImage
							onRemove={() => removeOpenGraphImage(openGraphImage)}
						/>
					{/each}

					{#if brand._id}
						<div
							class="p-8 flex items-center justify-center cursor-pointer _link"
							on:click={addOpenGraphImage}
						>
							Add Open Graph Image
						</div>
					{/if}

					<div class="mt-8">
						<button on:click={publishBrand}>Publish</button>
					</div>
				</div>
			</div>

			{#if brand.name || brand.description}
				<div class="relative ml-[426px] _preview p-4 mx-4" in:fade={{ delay: 150 }}>
					{#if brand._id}
						<div class="sticky top-[20px] w-full z-50 h-[0px]">
							<div class="mx-auto">
								{#if isJustCreated}
									<ConfettiExplosion particleCount={200} force={0.3} />
								{/if}
							</div>

							<!-- <div
								class="relative _published-label flex items-center mt-4"
								style="padding: 6px 10px;"
							>
								<a
									href="{PAGE_URL}/{brand.slug}"
									class="flex justify-center {brand.isDirty ? 'max-w-[240px]' : 'w-full'}"
									style="color: #5375F0; overflow: hidden; text-overflow: ellipsis;"
									target="_blank"
									rel="noreferrer"
								>
									<div
										class="mr-2 ml-4 z-20"
										use:tooltip
										title={brand.isDirty ? 'Pending Changes' : 'Published'}
									>
										{#if !brand.isDirty}
											✅
										{:else}
											🌝
										{/if}
									</div>

									<div>
										/{brand.slug}
									</div>
								</a>

								{#if brand.isDirty}
									<button
										class="absolute right-0 _primary flex justify-center w-full {isLoading
											? 'loading'
											: ''}"
										style="margin-left: 78px;
                  border-radius: 30px;
                  width: auto;
                  padding: 4px 45px;
									right: 3px;"
										transition:fly={{ x: 50, duration: 150 }}
										on:click={() => {}}
									>
										{#if isLoading}
											<div class="absolute top-0 h-full flex items-center bg-[#8B786D] z-10">
												<Loader />
											</div>
											Publish
										{:else if isJustPublished}
											<div class="" in:scale={{ duration: 150 }}>👌</div>
										{:else}
											Publish
										{/if}
									</button>
								{/if}
							</div> -->
						</div>
					{/if}

					<div class="mt-8 relative">
						<OpenGraphPreview bind:openGraphImage={brand} bind:brand />
					</div>

					{#each brand.openGraphImages as openGraphImage}
						<div class="mt-8 relative">
							<OpenGraphPreview bind:openGraphImage bind:brand />
						</div>
					{/each}
				</div>
			{:else}
				<div
					class="w-full h-screen ml-[426px] self-stretch flex-col flex items-center justify-center"
					in:slide
				>
					<svg
						width="190"
						height="114"
						viewBox="0 0 190 114"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<rect width="190" height="114" rx="7" fill="#F5F5F5" />
						<path
							d="M67 44C67 50.0751 62.0751 55 56 55C49.9249 55 45 50.0751 45 44"
							stroke="#828282"
							stroke-width="3"
							stroke-linecap="round"
						/>
						<path
							d="M144 44C144 50.0751 139.075 55 133 55C126.925 55 122 50.0751 122 44"
							stroke="#828282"
							stroke-width="3"
							stroke-linecap="round"
						/>
						<line
							x1="89.5"
							y1="84.5"
							x2="100.5"
							y2="84.5"
							stroke="#828282"
							stroke-width="3"
							stroke-linecap="round"
						/>
					</svg>

					<div class="text-[#828282] mt-4">Your design will appear here</div>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	._preview {
		width: 100%;
		height: 100%;
		border-left: 1px var(--border-color) solid;
	}

	._published-label {
		max-width: 400px;
		margin: 0 auto;
		font-size: 14px;
		text-align: center;
		border-radius: 30px;
		background-color: #f5f5f5;
		padding: 3px 10px;
		color: #828282;
	}
</style>
