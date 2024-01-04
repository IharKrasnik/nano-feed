<script>
	import { v4 as uuidv4 } from 'uuid';
	import { get, post } from 'lib/api';
	import allServices from '$lib/stores/allServices';
	import selectedService from '$lib/stores/selectedService';
	import subPages, { refreshSubPages } from 'lib/stores/subPages';
	import striptags from 'striptags';

	import EditService from '$lib/components/edit/Service.svelte';
	import Button from 'lib/components/Button.svelte';
	import getEmbeddedStreamSlug from '$lib/helpers/getEmbeddedStreamSlug';

	export let page;
	export let setPageAndDraft;

	let newServiceName = '';

	let parentPage = page.parentPage || page;

	let addService = async () => {
		let newServicePage = await post('pages', {
			renderType: 'service',
			isInDir: true,
			dirName: 'Services',
			heros: [],
			name: newServiceName,
			parentPage: { _id: parentPage._id },
			heros: [
				{
					id: uuidv4(),

					title: newServiceName,
					subtitle: '',
					interactiveRenderType: 'form',

					formSection: {
						id: uuidv4(),
						renderType: 'form',
						callToActionText: 'Get My Prototype',
						actionType: 'service_chat',

						items: [
							{
								id: uuidv4(),
								title: 'Email',
								interactiveRenderType: 'email'
							},
							{
								id: uuidv4(),
								title: 'Message',
								interactiveRenderType: 'textarea'
							}
						]
					}
				}
			],
			sections: []
		});

		newServicePage.parentPage.links = [
			...(newServicePage.parentPage.links || []),
			{
				id: newServicePage._id,
				pageId: newServicePage._id,
				url: `/${newServicePage.slug}`,
				name: newServicePage.name,
				groupName: newServicePage.dirName,
				isShowInFooter: true,
				isShowInHeader: true
			}
		];

		$subPages = [...$subPages, newServicePage];

		setPageAndDraft(newServicePage);

		// let newServiceFeedItem = {
		// 	id: uuidv4(),
		// 	title: 'UI/UX prototype in 48 hours',
		// 	content: 'Get Figma prototype to pitch your product to your users and investors',
		// 	attachments: [
		// 		{
		// 			url: '' // cover — generate with brand
		// 		}
		// 	],
		// 	meta: {
		// 		price: 9999
		// 	},
		// 	projects: [{ slug: 'services' }]
		// };

		// book a call link
		// links to social networks
		// links to free tools
		// testimonials
		// get started 1-2-3
		// form to apply
		// referral program
		// case studies

		$allServices = [...$allServices, newServiceFeedItem];
		$selectedService = newServiceFeedItem;
	};

	let addPortfolioItem = ({ service }) => {
		let newPortfolioItem = {
			id: uuidv4(),
			title: 'Moodahub',
			content: 'A virtual wardrobe with social network mechanics',
			tagsStr: 'Mobile App',
			url: '',
			attachments: [
				{
					url: '' // portfolio image — generate with brand (eg. if it content services)
				}
			],
			meta: {},
			linkedFeedItems: [{ _id: service._id }],
			projects: [{ slug: 'portfolio' }]
		};
	};

	if (!$selectedService && $allServices?.length) {
		$selectedService = $allServices[0];
	}

	let enableServices = async () => {
		if (!parentPage.streams?.services) {
			await getEmbeddedStreamSlug({ page, streamType: 'services' });
		}

		let servicesPage = await post('pages', {
			theme: {},
			name: 'Services',
			heros: [
				{
					id: uuidv4(),
					title: 'Services',
					subtitle: '',
					interactiveRenderType: '',
					callToActionText: '',
					ctaExplainer: '',
					theme: { isTitleLeft: true }
				}
			],
			sections: [
				{
					id: uuidv4(),
					streamSlug: parentPage.streams.services.slug,
					title: 'All Services',
					subtitle: '',
					theme: {},
					columns: 1,
					items: []
				}
			],
			renderType: 'blog',
			parentPage: parentPage
		});

		$subPages = [...$subPages, servicesPage];
	};
</script>

<div>
	<div class="font-bold opacity-80 mb-2">Services</div>

	{#if !$subPages.find((s) => s.slug === 'services')}
		<div class="_section _info">
			<div class="font-bold mb-2">No Services Yet</div>

			<div>
				Add your productised services to earn revenue while growing your product. Promote to
				Momentum community, publish great offers and get featured.
			</div>

			<Button class="_primary _small mt-4" onClick={enableServices}>Enable Services</Button>
			<div class="mt-2 text-sm opacity-80">Will create /services subpage</div>
		</div>
	{:else}
		<div
			class="_section cursor-pointer"
			on:click={() => setPageAndDraft($subPages.find((s) => s.slug === 'services'))}
		>
			<div class="font-bold">
				{@html striptags(
					$subPages.find((s) => s.slug === 'services').heros[0].title ||
						$subPages.find((s) => s.slug === 'services').heros[0].subtitle ||
						''
				)}
			</div>
		</div>
	{/if}
</div>

{#if $allServices?.length}
	<select
		class="w-full mb-4"
		bind:value={$selectedService._id}
		on:change={(evt) => {
			$selectedService = $allServices.find((s) => s.id === evt.target.value);
		}}
	>
		{#each $allServices as service}
			<option value={service.id}>{service.title}</option>
		{/each}
	</select>

	{#if $selectedService}
		<EditService
			onRemoved={(service) => {
				$allServices = $allServices.filter((s) => s.id !== $selectedService.id);
			}}
			serviceFeedItem={$selectedService}
		/>
	{/if}
{:else}
	{#if $subPages.filter((sp) => sp.renderType === 'service').length}{:else}

	{/if}

	<div class="_section">
		<div class="mb-2">What service can your provide for startup founders?</div>
		<input type="text" class="w-full mt-2" bind:value={newServiceName} placeholder="Service Name" />
		<div class="opacity-70 text-sm mt-2 _section _info">
			Examples: "UI/UX prototype", "Content Strategy", "Custom-Code Development"
		</div>
		<div class="mt-4">
			<Button class="_primary _small" onClick={addService}>Add Service</Button>
		</div>
	</div>

	{#each $subPages.filter((sp) => sp.renderType === 'service') as servicePage}
		<div
			class="_section cursor-pointer"
			on:click={() => {
				setPageAndDraft(servicePage);
			}}
		>
			<div class="font-bold">{servicePage.name}</div>
		</div>
	{/each}
{/if}
