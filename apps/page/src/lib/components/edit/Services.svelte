<script>
	import { v4 as uuidv4 } from 'uuid';
	import { get, post } from 'lib/api';
	import allServices from '$lib/stores/allServices';
	import selectedService from '$lib/stores/selectedService';
	import subPages, { refreshSubPages } from 'lib/stores/subPages';

	import EditService from '$lib/components/edit/Service.svelte';
	import Button from 'lib/components/Button.svelte';

	export let page;
	export let setPageAndDraft;

	let newServiceName = '';

	let addService = async () => {
		let newServicePage = await post('pages', {
			renderType: 'service',
			heros: [],
			name: newServiceName,
			parentPage: page.parentPage ? { _id: page.parentPage._id } : { _id: page._id },
			sections: [
				{
					id: uuidv4(),
					renderType: 'form',
					title: newServiceName,
					description: '',
					callToActionText: 'Get My Prototype',
					items: [
						{
							title: 'Email',
							interactiveRenderType: 'email'
						},
						{
							title: 'Message',
							interactiveRenderType: 'textarea'
						}
					]
				}
			]
		});

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
</script>

<div class="font-bold mb-2">Services</div>

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
	<div class="_section _info">
		<div class="font-bold mb-2">No Services, Yet</div>
		<div>
			Add your productised services to earn revenue while growing your product. Promote to Momentum
			community, publish great offers and get featured.
		</div>
	</div>

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
{/if}
