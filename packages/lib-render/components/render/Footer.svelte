<script>
	import Emoji from 'lib/components/Emoji.svelte';
	export let page;
	import striptags from 'striptags';

	let parentPage = page.parentPage || page;

	let groupLinks = () => {
		let grouped = {};

		(page.links || [])
			.filter((link) => link.groupName)
			.filter((link) => link.isShowInFooter)
			.forEach((link) => {
				if (!grouped[link.groupName]) {
					grouped[link.groupName] = { links: [] };
				}

				link.url = link.url || `/${link.pageSlug || link.slug}`;
				grouped[link.groupName].links.push(link);
			});

		let groupArr = [];

		if (grouped[undefined]?.links.length) {
			grouped.More = grouped.More || { links: [] };
			grouped.More.links = [...grouped.More.links, ...grouped[null]?.links];
			delete grouped[undefined];
		}

		Object.keys(grouped).forEach((key) => {
			if (key) {
				groupArr.push({ groupName: key, links: grouped[key].links });
			}
		});

		return groupArr;
	};

	let grouppedLinks = groupLinks();
</script>

<div class="_container-width mx-auto text-sm my-16">
	<div class="flex w-full justify-between items-start">
		<div class="px-4 text-sm  shrink-0 ">
			<div class="flex items-center sm:min-w-[500px]">
				<Emoji class="mr-2" width="20" emoji={parentPage.logo} />
				<span class=" font-medium">
					{parentPage.name}
				</span>
			</div>
			<div class="mt-4 opacity-70">
				{@html striptags(parentPage.heros[0].title || '')}
			</div>
		</div>

		<div class="w-full grid grid-cols-4">
			<div />
			{#each grouppedLinks as link}
				<div>
					<div class="font-semibold mb-4 ">{link.groupName}</div>

					{#each link.links as subLink}
						<a class="block py-2 opacity-70 hover:opacity-100" href={subLink.url}>{subLink.name}</a>
					{/each}
				</div>
			{/each}
		</div>
		<div />
	</div>
</div>
