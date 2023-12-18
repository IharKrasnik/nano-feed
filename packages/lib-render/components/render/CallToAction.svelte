<script>
	export let page;
	export let section;
	export let isEmbed;
	import RenderSection from 'lib-render/components/render/Section.svelte';

	import Emoji from 'lib/components/Emoji.svelte';
	import RenderInteractiveOptions from 'lib-render/components/render/InteractiveOptions.svelte';

	let parentPage = page.parentPage || page;
</script>

{#if section}
	<RenderSection
		class={`${
			section.theme?.isFullScreen ? 'min-h-screen' : 'relative sm:py-32  overflow-hidden'
		}  _bg-cta z-0 p-4 sm:p-8 w-full text-center max-h-[100%] z-0 bottom-0 flex flex-col justify-center min-h-screen sm:min-h-0`}
		page={{ ...page, theme: { ...page.theme, isTitlesLeft: false } }}
		section={{
			...section,
			...page.activeHero,
			_isHero: false,
			_isCtaFooter: true,
			title: section.title || page.activeHero.title,
			description: section.description || '',
			subtitle: '',
			theme: {
				...section.theme,
				isTitleLeft: false
			},
			isShown: true,
			interactiveRenderType:
				page.activeHero?.interactiveRenderType || (page.renderType === 'article' ? 'email' : ''),

			callToActionText:
				page.renderType === 'article' && !page.activeHero.interactiveRenderType
					? 'Subscribe'
					: page.activeHero?.callToActionText || '',
			ctaExplainer:
				page.renderType === 'article' && !page.activeHero.interactiveRenderType
					? 'Get blog updates to your email'
					: page.activeHero?.ctaExplainer || ''
		}}
	/>
	<!-- {#if section.theme?.style === 'sticky'}
		<div
			class="mx-auto h-px max-w-8xl opacity-[15%] w-full"
			style="background:linear-gradient(to right, rgba(0,0,0,0), {page.theme
				?.accentColor}, rgba(0,0,0,0))"
		/>
	{/if}

	<div class="mx-auto max-w-[750px] flex flex-col items-center justify-center">
		<div class="mb-8">
			<div
				class="{section.theme?.style === 'sticky'
					? '_hero-title'
					: '_title text-3xl sm:text-4xl'} mb-4"
			>
				{@html section.title || page.title}
			</div>

			<div>
				{#if section.subtitle}
					<div class="text-lg ">
						{@html section.subtitle}
					</div>
				{/if}
			</div>
		</div>
	</div>

	<div>
		{#if page.activeHero.interactiveRenderType}
			<RenderInteractiveOptions
				class={'flex flex-col items-center max-w-[600px] mx-auto'}
				bind:page
				bind:sectionItem={page.activeHero}
			/>
		{/if}
	</div> -->

	<div
		class="mx-auto h-px max-w-8xl opacity-[15%] w-full"
		style="background:linear-gradient(to right, rgba(0,0,0,0), {parentPage.theme
			?.accentColor}, rgba(0,0,0,0))"
	/>
	<div class="_container-width mx-auto text-lg my-4">
		<div class="flex items-center text-sm px-4">
			<Emoji class="mr-2" emoji={parentPage.logo} />
			<span>
				{parentPage.name}
			</span>
		</div>
	</div>
{/if}
