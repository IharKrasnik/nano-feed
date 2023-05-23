<script>
	import _ from 'lodash';
	import striptags from 'striptags';
	import { PAGE_URL } from 'lib/env';
	import Emoji from 'lib/components/Emoji.svelte';
	import currentUser from 'lib/stores/currentUser';

	import InfiniteScroll from 'lib/components/InfiniteScroll.svelte';
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import { get } from 'lib/api';

	let pages = [];
	let currentPageNum = 0;
	let allPages = [];

	let loadNextPage = async () => {
		currentPageNum++;

		let { results } = await get('pages', { perPage: 20, page: currentPageNum });
		pages = [...pages, ...results];
		results.id = currentPageNum;
		allPages.push(results);
		allPages = [...allPages];
	};

	loadNextPage();

	let getStyles = (page) => {
		let theme = page.theme || {};

		theme = _.defaults(theme, {
			titleFont: 'Archivo',
			textFont: 'Inter',
			backgroundColor: '#ffffff',
			theme: 'light'
		});

		return `background-color: ${theme.backgroundColor}; color: ${
			theme.theme === 'dark' ? '#ffffff' : '#111111'
		}; font-family: ${theme.textFont};`;
	};
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

		{#each allPages as pagesPage (pagesPage.id)}
			<div class="columns-4 gap-4 mb-8">
				{#each pagesPage as page (page._id)}
					<a
						href={(page.domains?.length && `//${page.domains[0].url}`) ||
							`${PAGE_URL}/${page.slug}`}
						target="_blank"
					>
						<div
							class="_section opacity-90 hover:opacity-100 hover:scale-105 transition"
							style="padding: 0; break-inside: avoid; margin-bottom: 16px; {getStyles(page)}"
						>
							<div class="p-2 sm:p-4">
								<!-- <div class="_title text-xl font-bold text-center">{page.name}</div> -->
								<div class="text-center mb-2">
									<Emoji class="flex justify-center" emoji={page.logo} />
								</div>
								<div
									class="_title text-xl font-bold text-center"
									style="font-family: {page.theme?.titleFont || 'Archivo'}"
								>
									{@html striptags(page.title)}
								</div>
								<div class="text-center">{@html striptags(page.subtitle)}</div>
								{#if page.demoUrl || page.openGraph?.imageUrl}
									<RenderUrl
										imgClass="my-4 mx-auto max-h-[200px]"
										url={page.demoUrl || page.openGraph.imageUrl}
									/>
								{/if}
								<hr
									class="my-8 {page.theme?.theme === 'dark'
										? 'border-[#fafafa]'
										: 'border-[#aaaaaa]'} opacity-30"
								/>

								<div class="flex items-center justify-between mt-4">
									<div>
										{#if page.creator}
											<div class="flex justify-center items-center">
												<img
													class="mr-2 w-[30px] h-[30px] rounded-full"
													src={page.creator.avatarUrl}
												/>
												{page.creator.fullName.split(' ')[0]}
											</div>
										{/if}
									</div>
									<div>{page.name}</div>
								</div>
							</div>
						</div>
					</a>

					{#if $currentUser?.isAdmin}
						<div>
							{#if page.isFeatured}
								<a>Unfeature</a>
							{:else}
								<a>Feature</a>
							{/if}
						</div>
					{/if}
				{/each}
			</div>
		{/each}
	</div>
</div>
