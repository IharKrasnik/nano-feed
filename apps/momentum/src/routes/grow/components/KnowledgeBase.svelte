<script>
	import { fly } from 'svelte/transition';
	import FeedItem from '$lib/components/FeedItem.svelte';
	import allProjects from '$lib/stores/allProjects';
	import currentUser from 'lib/stores/currentUser';
	import { fetch as fetchFeed } from '$lib/stores/feed';
	import InfiniteScroll from 'lib/components/InfiniteScroll.svelte';

	export let type = 'knowledge-base';

	let knowledgeBaseProjects = $allProjects
		.filter((p) => p.isKnowledgeBase)
		.sort((p) => (p.slug === 'knowledge-base' ? -1 : 1));

	let nanoProjects = $allProjects.filter((p) => p.isNano).sort((p) => (p.slug === 'nano' ? -1 : 1));

	let myProjects = $currentUser
		? $allProjects.filter((p) => p.creator && p.creator._id === $currentUser._id)
		: [];

	let switchProjects = () => {
		if (type === 'knowledge-base') {
			return knowledgeBaseProjects;
		} else if (type === 'nano') {
			return nanoProjects;
		} else if (type === 'my') {
			return myProjects;
		}
	};

	let selectedProject = {};

	let pageNumber = 1;
	let feed = [];

	let fetchFeedPage = ({ page = 1 } = {}) => {
		return fetchFeed({
			project: selectedProject.slug,
			page
		});
	};

	let loadMore = async ({ project = null } = {}) => {
		if (project) {
			selectedProject = project;
			pageNumber = 1;
			feed = [];
		} else {
			pageNumber++;
		}

		const feedPage = await fetchFeedPage({ page: pageNumber });

		feed = [...feed, ...feedPage];
	};

	let currentProjects;

	$: if (type) {
		currentProjects = switchProjects();
		loadMore({ project: currentProjects[0] });
	}
</script>

<div class="flex flex-wrap">
	{#each currentProjects as project}
		<div
			on:click={() => loadMore({ project })}
			class="p-2 mr-2 mb-2 rounded-lg shrink-0 cursor-pointer"
			class:bg-white={project.slug === selectedProject.slug}
			class:text-black={project.slug === selectedProject.slug}
			style="border: 1px rgba(255, 255, 255, .3) solid;"
		>
			{project.title}
		</div>
	{/each}
</div>

<div class="min-h-[300px]">
	<h3 class="mb-4">{selectedProject.description}</h3>

	{#if feed?.length > 0}
		{#key selectedProject.slug}
			<div in:fly={{ y: 50, duration: 150, delay: 150 }} style="padding: 2px;" class="sm:columns-3">
				<InfiniteScroll
					hasMore={true}
					threshold={100}
					elementScroll={'body'}
					onLoadMore={() => {
						fetchFeedPage();
					}}
				/>

				{#each feed as feedItem}
					<FeedItem bgColor={'rgba(20,20,20,.9)'} hideLikes {feedItem} />
				{/each}
			</div>
		{/key}
	{/if}
</div>

<!-- <div class="flex overflow-x-scroll">
				<FeedItem feedItem={momentumPlaybook} />
				<FeedItem feedItem={nanoGrit} />
				<FeedItem feedItem={clipWingJournal} />
			</div> -->
