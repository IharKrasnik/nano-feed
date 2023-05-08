<script>
	import { get } from 'lib/api';

	import allProjects from '$lib/stores/allProjects';
	import StreamCard from '$lib/components/StreamCard.svelte';
	import Stream from '$lib/components/Stream.svelte';
	import Modal from 'lib/components/Modal.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import Calendar from './Calendar.svelte';
	import creators from '$lib/stores/creators';

	let streamCreators;

	let loadMore = () => {};

	let isGrowModalOpen;
	let isInvestModalOpen;

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
		description: 'Start and grow your startup to $1M+ with media.',
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

<svelte:head>
	<title>Nano — Invest</title>
</svelte:head>

{#if isGrowModalOpen}
	<Modal
		isShown={isGrowModalOpen}
		onClosed={() => {
			isGrowModalOpen = false;
		}}
	>
		<div>the rules are simple</div>
	</Modal>
{/if}

<div class="relative" style="margin-bottom: 300px;">
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

		<div class="max-w-[350px] flex-1 h-full flex flex-col justify-center items-center p-8">
			<h2 class="text-4xl">$3,000</h2>
			<h3 class="text-2xl">May Fund</h3>
			<button class="mt-8 rounded-xl text-xl w-full">Invest in open startups</button>
			<!-- <video muted controls autoplay src={hubProject.pinnedUrl} class="rounded-xl" /> -->
			<!-- <RenderUrl url={hubProject.pinnedUrl} /> -->
			<!-- <img src={hubProject.bannerUrl} class="w-full max-h-[200px] object-cover rounded-lg" /> -->
		</div>
	</div>
	<div class="_header text-3xl font-bold text-center mt-16">
		We've invited {projects.length} early-stage startups <br />
		to grow their traction together, daily..
	</div>

	<div class="mt-8 mb-16">
		<Calendar class="w-full" />
	</div>

	<div class="mt-4 mx-8 flex overflow-y-scroll px-[1px]">
		{#each projects as project}
			<div class="min-w-[300px] mr-6">
				<StreamCard isIncludeGoal isIncludeChart={true} isLink isWithDescription stream={project} />
			</div>
		{/each}
	</div>

	<div class="_header text-3xl font-bold text-center my-8 mt-16">
		And everyone of us here is building in public. <br />
		We share our goals, learnings and metrics in Social Media..
	</div>

	<div class="container max-w-[1200px] mx-auto relative pt-16 shrink-0 w-full">
		<div class="shrink-0 ml-16  overflow-y-scroll">
			<Stream projectSlug={'nano'} maxPagesCount={2} />
		</div>
	</div>

	<div class="_header text-3xl text-center mb-16" style="margin-top: -100px;">
		We believe that every company is a media company. <br />
		You are no longer a CEO, you are Chief Executive Producer. <br />
	</div>

	<div class="w-full flex justify-center my-8 mx-auto" style="max-width: 1200px;">
		<RenderUrl url="https://www.youtube.com/watch?v=2zE7uWxA95s" />
	</div>

	<div class="_header text-3xl text-center mb-16 mt-32">
		<div class="flex justify-center my-4">
			<div class="mx-2">🥳</div>
			<div class="mx-2">🥳</div>
			<div class="mx-2">🥳</div>
		</div>
		And it seems people love this "media" thing<br />
	</div>

	<div
		class="grid grid-cols-2 gap-4 text-center w-full mb-16 mx-auto p-8 rounded-2xl "
		style="max-width: 1200px;"
	>
		<div class="flex flex-col items-center px-8 bg-zinc-900 rounded-xl py-8">
			<img
				class="max-w-[200px] h-[150px] mr-4 rounded-xl"
				src="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1683560688826-image.png"
			/>
			<div>
				<div class="font-bold text-xl mb-2 mt-8">
					<a href="https://www.linkedin.com/in/norris-panton-82a064b/" target="_blank"
						>Norris Panton</a
					>, <a href="https://www.carouselboxing.com" target="_blank">CarouselBoxing</a>
				</div>

				<div class="text-xl">
					Some people do yoga to relax, whereas I really need to work out on high intensity. <br
					/><br />
					Nano is more boxing, than it is yoga.
				</div>
			</div>
		</div>

		<div class="flex flex-col items-center px-8 text-xl bg-zinc-900 rounded-xl py-8">
			<img
				class="max-w-[200px] h-[150px] object-cover mr-4 rounded-xl"
				src="https://cameronwestland.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FCameron.f4e94b79.jpg&w=384&q=75"
			/>
			<div>
				<div class="font-bold text-xl mb-2 mt-8">
					<a href="https://www.linkedin.com/in/norris-panton-82a064b/" target="_blank"
						>Cameron Westland</a
					>, <a href="https://fforward.ai" target="_blank">FForward</a>
				</div>

				<div>
					My last startup raised $80M to date, it never was featured on HackerNews. <br /><br />
					I wrote 10 blog posts and my new startup was front-paged yesterday.
				</div>
			</div>
		</div>
	</div>

	<div class="_header text-3xl text-center mb-16 mt-32">
		Don't jump into tech and building your product early

		<br />

		Launch startups the modern way and make yourself easy to follow
	</div>

	<div class="container text-center w-full text-2xl mb-16 mx-auto" style="max-width: 1200px; ">
		<div class="columns-4">
			<div class="p-8 bg-zinc-900 rounded-xl">
				<div class="mb-2">🦸‍♂️</div>
				Discover genuine founders with grit
			</div>
			<div class="p-8 bg-zinc-900 rounded-xl">
				<div class="mb-2">📈</div>
				Keep track of other's progress
			</div>
			<div class="p-8 bg-zinc-900 rounded-xl">
				<div class="mb-2">🤝</div>
				Learn, network, partner
			</div>
			<div class="p-8 bg-zinc-900 rounded-xl">
				<div class="mb-2">💰</div>
				Invest early with confidence
			</div>
		</div>
	</div>

	<div class="py-8 pb-32">
		<div
			class="_header text-3xl text-center  mx-auto py-16"
			style="max-width: 600px; background-image: url(''"
		>
			Ready to work hard and have fun?

			<br />

			Choose your path below 👇
		</div>

		<div class="max-w-[600px] mx-auto">
			<video
				muted
				autoplay
				src={'https://fra1.digitaloceanspaces.com/ship-app-assets/stream/rec4sLfwGXzHxLy54/1683564658097-down point.mp4'}
				class="rounded-xl"
			/>
		</div>

		<div class="container  mx-auto rounded-xl py-16" style="max-width: 1200px;">
			<div class="grid grid-cols-2">
				<div class="mr-16 w-full text-center max-w-[1200px] mx-auto rounded-3xl">
					<a
						class="block button mr-8 rounded-xl"
						style="font-size: 32px; background: #7900d9;"
						on:click={() => {
							isGrowModalOpen = true;
						}}
					>
						Grow my startup</a
					>
				</div>

				<div class="w-full text-center mx-auto rounded-3xl">
					<a
						class="block button ml-8 rounded-xl"
						style="font-size: 32px; background: #007b50;"
						on:click={() => {
							isInvestModalOpen = true;
						}}>Invest in startup</a
					>
				</div>
			</div>
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
<style>
	._header {
		font-family: Archivo;
		line-height: 1.4;
	}
</style>