<script>
	import { get } from 'lib/api';

	import allProjects from '$lib/stores/allProjects';
	import StreamCard from '$lib/components/StreamCard.svelte';
	import Stream from '$lib/components/Stream.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import RenderUrl from 'lib/components/RenderUrl.svelte';

	import creators from '$lib/stores/creators';

	let streamCreators;

	let loadMore = () => {};

	let hubProject = {
		_id: '642e827852b497001703f41a',
		logoUrl:
			'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1683477275194-nano-logo-big.png',
		creator: {
			_id: 'rec4sLfwGXzHxLy54'
		},
		page: null,
		slug: 'nano',
		title: 'Nano',
		emoji: null,
		color: '#a263d9',
		description: 'Build your million-dollars startup with help of media.',
		url: 'https://nanohq.co',
		bannerUrl:
			'https://assets.website-files.com/64246fe509498c27897c2eaa/6425acab275655043392fea7_OpenGraph%20(1).png',

		pinnedUrl:
			'https://fra1.digitaloceanspaces.com/ship-app-assets/stream/rec4sLfwGXzHxLy54/1683479096968-nano_is_boxing.mp4',

		icon: 'https://assets.website-files.com/64246fe509498c27897c2eaa/6425ac1ac2c9ce73cd8bf44f_favicon.png',
		createdOn: new Date('2023-04-06T08:27:36.706Z'),
		hubProject: {
			_id: '63b60110cbd67400149e8059',
			slug: 'paralect'
		},
		longDescription:
			'Nano is a community of founders building their startups in public. \n\nWe believe that every company is a media company.',
		embedConfig: {
			limit: 15,
			columns: 3,
			theme: 'dark',
			bgColor: 'rgba(255, 255, 255, 0)',
			isViewAll: true
		},
		waveProject: {
			_id: '642acb3a1441ad00158375c6',
			url: 'www.nanohq.co'
		}
	};

	let projects = $allProjects.filter((p) => p.hubProject?.slug === 'nano');

	let getCreators = async () => {
		streamCreators = (await get('creators', { projectSlug: hubProject.slug })).results;
		$creators = streamCreators;
	};

	getCreators();
</script>

<div class="relative">
	<div
		class="relative my-8 flex justify-between p-8 rounded-2xl text-white max-w-[1200px] mx-auto"
		style="background: url('/backgrounds/gradient-1.svg');"
	>
		<div>
			<img src={hubProject.logoUrl} class="w-[50px] h-[50px] mb-4" />
			<div class="text-4xl font-bold mb-4">{hubProject.title}</div>
			<div class="text-2xl mb-4">{hubProject.description}</div>

			<a class="flex mt-6" href="/creators">
				{#if streamCreators}
					{#each streamCreators as creator}
						<Avatar style="margin-right: -15px;" size="30px" user={creator} />
					{/each}
				{/if}
			</a>
		</div>
		<div class="cursor-pointer max-w-[400px]">
			<video muted controls autoplay src={hubProject.pinnedUrl} class="rounded-xl" />
			<!-- <RenderUrl url={hubProject.pinnedUrl} /> -->
			<!-- <img src={hubProject.bannerUrl} class="w-full max-h-[200px] object-cover rounded-lg" /> -->
		</div>
	</div>

	<div class="text-3xl font-bold text-center mb-8">{projects.length} Startups..</div>

	<div class="mt-4 mx-8 flex overflow-y-scroll px-[1px]">
		{#each projects as project}
			<div class="min-w-[300px] mr-6">
				<StreamCard isIncludeGoal isIncludeChart={true} isLink isWithDescription stream={project} />
			</div>
		{/each}
	</div>

	<div class="sticky text-3xl font-bold text-center my-8">Building in public..</div>

	<div class="container max-w-[1200px] mx-auto relative pt-16 shrink-0 w-full">
		<div class="shrink-0 ml-16  overflow-y-scroll">
			<Stream projectSlug={'nano'} />
		</div>
	</div>
</div>
<!-- <table>
	<thead>
		<td>Name</td>
		<td>Pitch</td>
		<td>Views</td>
		<td>Sign Ups</td>
		<td>Content</td>
		<td>MRR</td>
	</thead>
	{#each $allProjects.filter((p) => p.hubProject?.slug === 'nano') as project}
		<tr>
			<td>
				{project.title}
			</td>
			<td>
				{project.description}
			</td>
			<td />
			<td />
		</tr>
	{/each}
</table> -->
