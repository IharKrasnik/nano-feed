<script>
	import _ from 'lodash';
	import moment from 'moment-timezone';
	import { BRAND_URL } from 'lib/env';
	import { onMount } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';
	import { slide, fly, scale, fade } from 'svelte/transition';
	import { goto } from '$app/navigation';

	import { get, post, put } from 'lib/api';
	import currentUser from 'lib/stores/currentUser';
	import allBrands from '$lib/stores/allBrands';
	import brandDraft from '$lib/stores/brandDraft';
	import fileToEdit from '$lib/stores/fileToEdit';
	import fileSizes from '$lib/stores/fileSizes';
	import fileFonts from '$lib/stores/fileFonts';

	import colors from 'lib/stores/colors';

	import tooltip from 'lib/use/tooltip';
	import clickOutside from 'lib/use/clickOutside';
	import BrowserFrame from 'lib/components/BrowserFrame.svelte';
	import Button from 'lib/components/Button.svelte';

	import EditOpenGraphImage from '$lib/components/edit/OpenGraphImage.svelte';
	import EditPng from '$lib/components/edit/Png.svelte';
	import EditBrandFile from '$lib/components/edit/BrandFile.svelte';
	import EditColorPicker from 'lib/components/ColorPicker.svelte';
	import FileInput from 'lib/components/FileInput.svelte';
	import OpenGraphPreview from '$lib/components/OpenGraphPreview.svelte';
	import BrandFilePreview from '$lib/components/BrandFilePreview.svelte';
	import BrandFile from '$lib/components/BrandFile.svelte';
	import EmojiPicker from 'lib/components/EmojiPicker.svelte';
	import BackArrowSvg from 'lib/icons/back-arrow.svelte';

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
			logo: '🚀',
			name: '',
			slug: '_new',
			title: '',
			imageUrl: '',
			theme: {},
			files: []
		};
	};

	let defaultPng = {
		name: 'my awesome brand',
		type: 'png',
		title: 'Create nice looking image 🤩',
		subtitle: 'Use it for social media, blog articles or OpenGraph tags',
		size: $fileSizes.find((size) => size.name === 'horizontal'),
		theme: _.sample($colors).getTheme()
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
			await addFile(defaultPng);
		}
	};

	let addFile = async ({
		name = 'your awesome brand',
		logo = '🚀',
		title,
		subtitle,
		type = 'png',
		theme,
		size = null,
		files = null
	} = defaultPng) => {
		brand.files = brand.files || [];

		_.each(files || [], (f) => {
			f.name = f.name || name;
			f.logo = f.logo || logo;
		});

		let newFile = await post(`brands/${brand._id}/files`, {
			name,
			logo,
			title,
			subtitle,
			type,
			theme: theme || brand.theme || { backgroundColor: '#fefefe', textColot: '#111111' },
			size,
			files
		});

		brand.files = [newFile, ...brand.files];
		$fileToEdit = newFile;
	};

	let brand = { ..._.cloneDeep($brandDraft['_new'] || defaultBrand()) };
	let isBrandSet = false;

	let refreshData = () => {};

	let setBrandAndDraft = (p, { force = false } = {}) => {
		brand = { ..._.cloneDeep(p) };

		if (!brand.files) {
			brand.files = [];
		}

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

	$: if (brand) {
		if (!$brandDraft[brand.slug] || !_.isEqual(brand, $brandDraft[brand.slug])) {
			if (brand.isDirty === false) {
				delete brand.isDirty;
			} else {
				brand.isDirty = true;
			}
			if (!$brandDraft[brand.slug]) {
				$brandDraft = {
					..._.cloneDeep($brandDraft),
					[brand.slug || '_new']: { ..._.cloneDeep(brand) }
				};
			} else {
				$brandDraft = {
					..._.cloneDeep($brandDraft),
					[brand.slug || '_new']: { ..._.cloneDeep(brand), updatedOn: new Date().toISOString() }
				};
			}
		}
	}

	let updateFile = async () => {
		let updatedFile = await put(`brands/files/${$fileToEdit._id}`, $fileToEdit);
	};

	let fetchFile = ({ type = 'png' } = {}) => {
		let url;

		if (type === 'png') {
			url = `${BRAND_URL}/og.png?fileId=${$fileToEdit._id}`;
		} else if (type === 'gif') {
			url = `${BRAND_URL}/doc.gif?fileId=${$fileToEdit._id}`;
		} else if (type === 'pdf') {
			url = `${BRAND_URL}/doc.pdf?fileId=${$fileToEdit._id}`;
		}

		return fetch(url)
			.then((response) => response.blob())
			.catch(console.error);
	};

	let download = async ({ type = 'png' } = {}) => {
		await updateFile();
		let blob = await fetchFile({ type });

		const link = document.createElement('a');
		link.href = URL.createObjectURL(blob);
		link.download = 'file';
		link.click();
	};

	let copyClipboard = async ({ type = 'png' } = {}) => {
		await updateFile();
		let blob = await fetchFile({ type });

		navigator.clipboard.write([
			new ClipboardItem({
				[type === 'png' ? 'image/png' : 'image/gif(not working)']: blob
			})
		]);
	};

	let copyUrl = () => {
		let url;
		let type = $fileToEdit.type;

		if (type === 'png') {
			url = `${BRAND_URL}/og.png?fileId=${$fileToEdit._id}`;
		} else if (type === 'gif') {
			url = `${BRAND_URL}/doc.gif?fileId=${$fileToEdit._id}`;
		} else if (type === 'pdf') {
			url = `${BRAND_URL}/doc.pdf?fileId=${$fileToEdit._id}`;
		}

		navigator.clipboard.writeText(url);
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
									width="35"
									height="35"
									viewBox="0 0 35 35"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M1.16977 4.12405C0 6.10202 0 8.77201 0 14.112V20.888C0 26.228 0 28.898 1.16977 30.8759C1.89 32.0938 2.9062 33.11 4.12405 33.8302C6.10202 35 8.77201 35 14.112 35H20.888C26.228 35 28.898 35 30.8759 33.8302C32.0938 33.11 33.11 32.0938 33.8302 30.8759C35 28.898 35 26.228 35 20.888V14.112C35 8.77201 35 6.10202 33.8302 4.12405C33.11 2.9062 32.0938 1.89 30.8759 1.16977C28.898 0 26.228 0 20.888 0H14.112C8.77201 0 6.10202 0 4.12405 1.16977C2.9062 1.89 1.89 2.9062 1.16977 4.12405Z"
										fill="white"
									/>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M17.4703 9C17.4703 8.44771 17.918 8 18.4703 8H19.2941C19.8464 8 20.2941 8.44772 20.2941 9V11.5752L25.5933 17.9358C25.6466 17.9999 25.6923 18.0674 25.7303 18.1373C25.8731 18.3042 25.9725 18.5071 26.0102 18.7351C26.063 19.0543 26.1063 19.429 26.1055 19.7964C26.1048 20.1328 26.1781 20.4008 26.2723 20.606C26.3973 20.8787 26.636 21.0586 26.8773 21.2406L26.8774 21.2406L26.8774 21.2406C26.9951 21.3294 27.1134 21.4186 27.2196 21.5193C27.6986 21.9739 28.0017 22.651 28 23.4067C27.997 24.7724 26.9997 25.8776 25.7726 25.8752C24.5454 25.8727 23.553 24.7636 23.556 23.3978C23.5573 22.7939 23.753 22.241 24.0771 21.8122C24.2354 21.6028 24.4367 21.4244 24.636 21.248C24.977 20.9461 25.3117 20.6496 25.4138 20.2123C25.4436 20.0849 25.4618 19.9456 25.4621 19.7952C25.4623 19.7313 25.4592 19.6694 25.4533 19.6096C25.4337 19.6264 25.4133 19.6428 25.3923 19.6587L24.0534 20.6705L16.6893 26.2353C16.1347 26.6544 15.3255 26.5625 14.8819 26.03L9.25953 19.2814C8.81594 18.749 8.90593 17.9776 9.46053 17.5585L17.4703 11.5059V9ZM18.88 13C18.4658 13 18.13 13.3358 18.13 13.75C18.13 14.1642 18.4658 14.5 18.88 14.5C19.2942 14.5 19.63 14.1642 19.63 13.75C19.63 13.3358 19.2942 13 18.88 13Z"
										fill="#0C120C"
									/>
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
						<!-- {#if brand._id}
							<EmojiPicker theme="dark" bind:icon={brand.logo} />
							<div class="ml-2">
								<EditColorPicker
									bind:color={brand.bgColor}
									onUpdated={(color) => {
										if (color.isDarkColor) {
											brand.theme = {
												theme: 'dark',
												textColor: '#fefefe'
											};
										} else {
											brand.theme = {
												theme: 'light',
												textColor: '#111111'
											};
										}
									}}
								/>
							</div>
						{/if} -->
					</div>

					{#if !$fileToEdit}
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
					{:else}
						<!-- <div class="_section">
							<div class="_title">Title</div>

							<div>
								<textarea
									type="text"
									rows="4"
									class="w-full mb-4"
									bind:value={brand.title}
									placeholder="Build a better product in public and grow your audience early"
								/>
							</div>
						</div> -->

						<div
							class="flex items-center cursor-pointer text-[#8B786D] mb-4"
							on:click={() => {
								$fileToEdit = null;
							}}
						>
							<BackArrowSvg />
							Back to All Files
						</div>

						<EditBrandFile
							bind:file={$fileToEdit}
							bind:brand
							onUpdated={(updatedFile) => {
								brand.files = brand.files.map((f) => {
									if (f._id === updatedFile._id) {
										return updatedFile;
									} else {
										return f;
									}
								});

								$fileToEdit = null;
							}}
							onRemoved={() => {
								brand.files = brand.files.filter((f) => f._id !== $fileToEdit._id);

								$fileToEdit = null;
							}}
						/>
					{/if}
					<!-- 
					{#if brand._id}
						<div class="_section">
							<div class="_title">Image</div>

							<div>
								<FileInput class="w-full" bind:url={brand.imageUrl} />
							</div>
						</div>
					{/if} -->

					{#if !$fileToEdit}
						{#if brand?._id}
							<Button
								class="w-full flex items-center justify-center cursor-pointer"
								onClick={() => addFile(defaultPng)}
								>🎆 Create Single Image
							</Button>

							<div class="py-4 opacity-80">
								Use static images for: <br />
								• Social media posts <br />• OpenGraph images (meta tags) <br />• Blog Articles
								Covers
							</div>

							<div class="mt-8">
								<Button
									class="w-full flex items-center justify-center cursor-pointer"
									onClick={() =>
										addFile({
											type: 'gif',
											size: $fileSizes.find((f) => f.name === 'square'),
											files: [
												{ title: 'First frame', theme: _.sample($colors).getTheme() },
												{ title: 'Second frame', theme: _.sample($colors).getTheme() }
											]
										})}
									>🍿 Create GIF
								</Button>

								<div class="py-4 opacity-80">
									Stand out in social media and emphasize your message with eye-catching animated
									GIFs.
								</div>
							</div>

							<div class="mt-8">
								<Button
									class="w-full flex items-center justify-center cursor-pointer"
									onClick={() => {
										let font = 'gaegu';

										return addFile({
											type: 'pdf',
											size: $fileSizes.find((f) => f.name === 'square'),
											theme: {
												..._.sample($colors).getTheme(),
												font
											},
											files: [
												{
													title: 'How to create a great LinkedIn carousel',
													subtitle: 'And win your true fans'
												},
												{
													title: 'Repurpose your best-performing articles',
													subtitle:
														'LinkedIn carousel is a different way to present your long-form content.'
												},
												{
													title: 'Prepare 5-6 titles with 2-sentence description',
													subtitle: 'Just like you reading now'
												},
												{
													title: 'End up with call to action',
													subtitle: `Should they follow you, leave a comment, subscribe to waitlist, check full article?
See? It's up to you decide! 
Now go and create your carousel!
⬅️`,
													theme: { font, ...$colors.find((c) => c.value === '#FBC82E').getTheme() }
												}
											]
										});
									}}
									>🎠 Create LinkedIn Carousel
								</Button>

								<div class="py-4 opacity-80">Create PDF to use as LinkedIn Carousel.</div>
							</div>
						{:else}
							<div class="mt-8">
								<button on:click={publishBrand}>Create first image</button>
							</div>
						{/if}
					{/if}
				</div>
			</div>

			{#if $fileToEdit}
				<div
					class="fixed pl-8 flex items-center ml-[426px] mx-16 top-[0px] bg-[#0a120b] z-10 opacity-95 transition hover:opacity-100 h-[68px] w-full"
					style="border-bottom: 1px rgba(255,255,255,.5) solid;"
				>
					{#if $fileToEdit.type === 'png'}
						<div class="mr-4">
							<Button onClick={copyClipboard} class="w-full">⌨️ Copy Image To Clipboard</Button>
						</div>
						<div class="mr-4">
							<Button onClick={download} class="w-full">🗳 Download As PNG</Button>
						</div>
						<div>
							<Button onClick={copyUrl} class="w-full">🔗 Copy URL</Button>
						</div>
					{:else}
						<div class="mr-4">
							<Button onClick={() => download({ type: 'gif' })} class="w-full"
								>🗳 Download As GIF</Button
							>
						</div>
						<div class="mr-4">
							<Button onClick={() => download({ type: 'pdf' })} class="w-full"
								>🗳 Download As PDF</Button
							>
						</div>
					{/if}
				</div>
			{/if}

			{#if brand.name || brand.description}
				<div class="relative ml-[426px] pb-[300px] _preview p-4 mx-4" in:fade={{ delay: 150 }}>
					{#if brand._id}
						<div class="sticky top-[20px] w-full z-50 h-[0px]">
							<div class="mx-auto">
								{#if isJustCreated}
									<ConfettiExplosion particleCount={200} force={0.3} />
								{/if}
							</div>
						</div>
					{/if}

					<!-- <div class="mt-8 relative">
						<OpenGraphPreview bind:openGraphImage={brand} bind:brand />
					</div> -->

					{#if $fileToEdit}
						<div class="mx-16 mt-[120px]">
							{#if $fileToEdit.type === 'png'}
								<BrandFilePreview bind:file={$fileToEdit} bind:brand />
							{:else}
								{#each $fileToEdit.files as innerFile}
									<div class="mb-8">
										<BrandFilePreview bind:file={innerFile} bind:parentFile={$fileToEdit} />
									</div>
								{/each}
							{/if}
						</div>
					{:else}
						<div class="mt-8 relative grid grid-cols-3">
							{#each brand.files || [] as file}
								<BrandFile
									bind:file
									sizeAuto={true}
									bind:brand
									onClick={(file) => ($fileToEdit = file)}
								/>
							{/each}
						</div>
					{/if}
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
