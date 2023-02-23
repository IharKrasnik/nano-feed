<script>
	export let section;
	import RenderUrl from 'lib/components/RenderUrl.svelte';

	const headerTextStyle = (item) => {
		return {
			1: item.imageUrl ? 'text-2xl' : 'md:text-4xl text-3xl',
			2: 'text-2xl',
			3: 'text-lg',
			4: ''
		};
	};

	const descriptionStyle = {
		1: 'text-lg',
		2: 'text-lg',
		3: '',
		4: ''
	};

	const emojiStyle = {
		1: 'text-4xl mb-4',
		2: 'text-3xl mb-4',
		3: 'text-2xl mb-2',
		4: 'text-xl mb-2'
	};
</script>

{#if section.items?.length}
	<div class="w-full py-4 md:py-16">
		<div
			class="grid grid-cols-1 md:grid-cols-{section.columns} gap-4 {section.columns > 1
				? 'items-start'
				: ''}"
		>
			{#each section.items || [] as item, i}
				<div class="mb-8">
					<div
						class="grid h-full grid-cols-1 md:grid-cols-{section.columns === 1 &&
						item.imageUrl &&
						section.items.length > 1
							? 2
							: ''} w-full {section.columns > 1
							? 'bg-[#fafafa] rounded-2xl'
							: ''} items-center content-start"
						style={section.columns === 1 && section.items.length === 1 && !item.imageUrl
							? 'margin-bottom: -64px;'
							: ''}
					>
						<div
							class="{section.columns > 2
								? 'p-4'
								: 'p-8'} max-w-[600px] text-left self-center order-none {section.columns == 1 &&
							i % 2 === 1
								? 'md:order-last'
								: ''} {section.columns === 1 &&
								(!item.imageUrl || section.items.length === 1) &&
								'mx-auto text-center'}"
							class:order-last={i % 2 === 0}
						>
							{#if item.emoji}
								<div class={emojiStyle[section.columns]}>{item.emoji}</div>
							{/if}

							<h2 class="{headerTextStyle(item)[section.columns]} font-bold mb-4">{item.title}</h2>
							<h3 class="{descriptionStyle[section.columns]} whitespace-pre-wrap">
								{item.description}
							</h3>

							{#if item.url}
								<a href={item.url} target="_blank" class="block mt-4 text-[#8B786D] text-sm"
									>Learn More</a
								>
							{/if}
						</div>
						<div class="order-none {section.columns === 1 && i % 2 === 0 ? 'md:order-last' : ''}">
							<RenderUrl
								class="rounded-xl"
								imgClass="{section.columns === 1 ? '' : 'max-h-[200px]'} {section.items.length === 1
									? 'mx-auto'
									: 'w-full'} max-h-[350px] object-cover"
								url={item.imageUrl}
							/>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
{/if}
