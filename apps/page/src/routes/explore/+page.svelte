<script>
	import striptags from 'striptags';
	import { PAGE_URL } from 'lib/env';

	import InfiniteScroll from 'lib/components/InfiniteScroll.svelte';
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import { get } from 'lib/api';

	let pages = [];
	let currentPageNum = 0;

	let loadNextPage = async () => {
		currentPageNum++;

		let { results } = await get('pages', { perPage: 10, page: currentPageNum });
		pages = [...pages, ...results];
	};

	loadNextPage();
</script>

<div>
	<div class="container mx-auto mt-4">
		<div class="text-xl mb-4">Explore Pages</div>

		<InfiniteScroll
			hasMore={true}
			threshold={100}
			elementScroll={'body'}
			onLoadMore={() => {
				loadNextPage();
			}}
		/>

		<div class="columns-4 gap-4">
			{#each pages as page (page._id)}
				<a
					href={(page.domains?.length && `//${page.domains[0].url}`) || `${PAGE_URL}/${page.slug}`}
					target="_blank"
				>
					<div class="_section" style="padding: 0; break-inside: avoid; margin-bottom: 16px;">
						{#if page.demoUrl || page.openGraph?.imageUrl}
							<RenderUrl url={page.demoUrl || page.openGraph.imageUrl} />
						{/if}
						<div class="p-2 sm:p-4">
							<div class="_title text-xl font-bold">{page.name}</div>
							<div class="_title font-bold">{@html striptags(page.title)}</div>
							<div>{@html striptags(page.subtitle)}</div>

							{#if page.creator}
								<div class="flex mt-4 items-center">
									<img class="mr-2 w-[30px] h-[30px] rounded-full" src={page.creator.avatarUrl} />
									{page.creator.fullName.split(' ')[0]}
								</div>
							{/if}
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
</div>
