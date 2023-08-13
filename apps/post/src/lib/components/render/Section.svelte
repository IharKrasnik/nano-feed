<script>
	import RenderUrl from 'lib/components/RenderUrl.svelte';
	import RenderTestimonials from '$lib/components/render/Testimonials.svelte';
	import RenderMomentumFeed from '$lib/components/render/MomentumFeed.svelte';
	import Emoji from 'lib/components/Emoji.svelte';
	import isGif from 'lib/helpers/isGif';

	let clazz = 'py-4 sm:py-16';
	export let section;
	export let blog;
	export let themeStyles = {};

	export { clazz as class };
	export let style = null;

	const headerTextStyle = (item) => {
		return {
			1: item.imageUrl ? 'text-2xl' : 'sm:text-4xl text-3xl',
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

	let focusEmailInput = () => {
		let inputs = document.getElementsByClassName('_email-input');
		let input = inputs[0];

		input.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
		input.focus();
	};
</script>

<div class="p-4" style={style || ''}>
	{#if section.title || section.description || section.imageUrl || section.emoji}
		<div class="w-full text-center py-4 sm:py-16 text-center">
			{#if section.emoji}
				<div class={emojiStyle[1]}>
					<Emoji bind:emoji={section.emoji} />
				</div>
			{/if}

			{#if section.title}
				<h2 class="_title sm:text-4xl text-3xl font-bold mb-4 sm:max-w-[750px] sm:mx-auto">
					{@html section.title}
				</h2>
			{/if}

			{#if section.description}
				<h3 class="{descriptionStyle[1]} whitespace-pre-wrap sm:max-w-[600px] sm:mx-auto">
					{@html section.description}
				</h3>
			{/if}

			{#if section.imageUrl}
				<div class="my-8">
					<RenderUrl
						class="rounded-xl"
						imgClass="mx-auto  {isGif(section.imageUrl) ? 'w-full object-cover' : ''} max-h-[500px]"
						url={section.imageUrl}
					/>
				</div>
			{/if}
		</div>
	{/if}

	{#if section.type === 'momentum_feed'}
		<RenderMomentumFeed bind:blog bind:streamSlug={blog.streamSlug} bind:themeStyles />
	{:else if section.items?.length}
		<div class="w-full {clazz}">
			<div class="sm:columns-{section.columns} gap-4 {section.columns > 1 ? 'items-start' : ''}">
				{#each section.items || [] as item, i}
					<div class="mb-8" style="-webkit-column-break-inside: avoid;">
						<div
							class="grid h-full grid-cols-1 sm:grid-cols-{section.columns === 1 &&
							item.imageUrl &&
							section.items.length > 1
								? 2
								: ''} w-full {section.columns > 1
								? 'bg-section rounded-2xl'
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
									? 'sm:order-last'
									: ''} {section.columns === 1 &&
									(!item.imageUrl || section.items.length === 1) &&
									'mx-auto text-center'}"
								class:order-last={i % 2 === 0}
							>
								{#if item.emoji}
									<div class={emojiStyle[section.columns]}>
										<Emoji bind:emoji={item.emoji} />
									</div>
								{/if}

								{#if item.title}
									<h2 class="{headerTextStyle(item)[section.columns]} _title font-bold mb-4">
										{@html item.title}
									</h2>
								{/if}
								{#if item.description}
									<h3 class="{descriptionStyle[section.columns]} whitespace-pre-wrap">
										{@html item.description}
									</h3>
								{/if}

								{#if item.pricing}
									<div class="flex items-end mt-4 mb-4">
										<div class="text-3xl font-bold mr-2">
											${item.pricing.amount?.toFixed(2) || '0'}
										</div>
										<div class="text-lg">
											/{item.pricing.per}
										</div>
									</div>
									{#if item.pricing.benefits}
										<div class="mb-4">
											{#each item.pricing.benefits as benefit}
												<div class="my-2">
													<span class="inline-block mr-1">✅</span>
													{benefit.name}
												</div>
											{/each}
										</div>
									{/if}
								{/if}

								{#if item.url}
									<a
										href={item.url}
										target="_blank"
										class="button w-full text-center block text-[#8B786D] mt-4"
										>{item.callToActionText || 'Learn More'}
									</a>
								{:else if section.type === 'pricing'}
									{#if blog.isCollectEmails}
										<button class="button w-full" on:click={focusEmailInput}
											>{item.callToActionText || blog.callToAction}</button
										>
									{:else}
										<a
											class="button text-center block w-full"
											target="_blank"
											href={blog.actionUrl}
										>
											{item.callToActionText || blog.callToAction}
										</a>
									{/if}
								{/if}
							</div>
							<div
								class="{section.pricing ? 'order-none' : 'order-first'} {section.columns === 1 &&
								i % 2 === 0
									? 'sm:order-last'
									: ''}"
							>
								<RenderUrl
									class="rounded-xl"
									imgClass="mx-auto {section.columns === 1 ? '' : 'max-h-[600px]'}  {section.items
										.length === 1
										? ''
										: ''} {isGif(item.imageUrl) ? 'w-full object-cover' : ''} max-h-[350px]"
									url={item.imageUrl}
								/>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	button,
	.button {
		display: inline-block;
		border-radius: 20px;
		padding: 8px 16px;
		font-size: 18px;

		color: var(--button-color);
		background-color: var(--accent-color);
	}
</style>
