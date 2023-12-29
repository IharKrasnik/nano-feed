<script>
	import { v4 as uuidv4 } from 'uuid';

	import RenderSection from 'lib-render/components/render//Section.svelte';
	import SitePreview from 'lib-render/components/SitePreview.svelte';

	import allServices from '$lib/stores/allServices';
	import selectedService from '$lib/stores/selectedService';

	export let page;
</script>

{#if $selectedService}
	<!-- <RenderSection
		{page}
		section={{
			id: uuidv4(),
			title: $selectedService.title,
			description: $selectedService.content || '',
			columns: 3
		}}
	/> -->

	<RenderSection
		{page}
		section={{
			id: uuidv4(),
			renderType: 'form',
			title: $selectedService.title,
			description: $selectedService.content || '',
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
		}}
	/>

	<RenderSection
		{page}
		section={{
			id: uuidv4(),
			title: `What you'll get`,
			columns: 3,
			items: [
				{
					emoji: 'feather:cpu',
					title: `Dev-Ready Figma File`,
					description: 'Use your design files to develop your application'
				},
				{
					emoji: 'feather:layout',
					title: '1 Flow — Up to 10 screens',
					description: 'A complete workflow that you can demo'
				},
				{
					emoji: 'feather:smile',
					title: '1 Change Request',
					description: 'Request changes once you get your designs for review'
				}
			]
		}}
	/>

	<RenderSection
		{page}
		section={{
			id: uuidv4(),
			title: `Clickable prototype examples`,
			columns: 2,
			theme: {
				imageAspectRatio: 'image'
			},
			items: [
				{
					title: 'Shelf',
					description: 'Modern QR-code generator for tracking inventory',
					url: 'https://www.figma.com/proto/8Mb6BCx3yTShfW6ZvDkhGe/Shelf-prototype?page-id=0%3A1&type=design&node-id=202-11871&viewport=846%2C-972%2C0.1&t=ZXtZTOi4ZCn6whbq-1&scaling=scale-down&starting-point-node-id=202%3A11871',
					imageUrl:
						'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1697916380201-image.png'
				},
				{
					title: 'Moodahub',
					description: 'A virtual wardrobe with social mechanics',
					url: 'https://www.figma.com/proto/ZN2PbVdAdFcWBSKOeXLzFz/Moodahub?page-id=0%3A1&type=design&node-id=0-12609&viewport=895%2C1154%2C0.12&t=WlR9YRLJSax4O2jU-1&scaling=scale-down&starting-point-node-id=0%3A12724&mode=design',
					imageUrl:
						'https://assets-global.website-files.com/64831da00244efd7c8280a6c/6501fa4c88cef88ac28330a7_image%202.png'
				},
				{
					title: 'TechMate',
					description: 'Find perfect co-founder with AI',
					url: 'https://www.figma.com/proto/ZN2PbVdAdFcWBSKOeXLzFz/Moodahub?page-id=0%3A1&type=design&node-id=0-12609&viewport=895%2C1154%2C0.12&t=WlR9YRLJSax4O2jU-1&scaling=scale-down&starting-point-node-id=0%3A12724&mode=design',
					imageUrl:
						'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1697916195962-image.png'
				},
				{
					title: 'CollabUniverse',
					description:
						'Connect with creators via booking agencies, major labels, production companies',
					imageUrl:
						'https://assets-global.website-files.com/64831da00244efd7c8280a6c/6501fa4d1d0b77399cac8a9c_image%202-3.png',
					url: 'https://www.figma.com/proto/bh94Fc3bczOEBGCwkAmIHf/Collab-Universe?page-id=0%3A1&type=design&node-id=9-14&viewport=-435%2C724%2C0.39&t=dfxBToX6UmYSa4DA-1&scaling=scale-down&starting-point-node-id=9%3A14&show-proto-sidebar=1'
				},
				{
					imageUrl:
						'https://www.loom.com/embed/4f4896d2c82942acbe4a3f55e7b29c22?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true'
				},
				{
					imageUrl:
						'https://www.loom.com/embed/49e83ae30050411492f992db3677c311?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true'
				}
			]
		}}
	/>
	<!-- <SitePreview
		isNoBadge
		isEdit
		page={{
			_id: 'service',
			slug: 'service',
			heros: [
				{
					title: $selectedService.title,
					subtitle: $selectedService.content || ''
				}
			],
			sections: [],
			theme: page.theme
		}}
	/> -->
{:else}
	{#key $allServices}
		<RenderSection
			{page}
			section={{
				title: 'Productised Services',
				columns: 3,
				items: $allServices.map((s) => ({
					id: s._id,
					...s
				}))
			}}
		/>
	{/key}
{/if}
