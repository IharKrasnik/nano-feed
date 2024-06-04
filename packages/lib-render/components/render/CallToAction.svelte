<script>
	import RenderSection from 'lib-render/components/render/Section.svelte';
	import RenderFooter from 'lib-render/components/render/Footer.svelte';

	import Emoji from 'lib/components/Emoji.svelte';
	import RenderInteractiveOptions from 'lib-render/components/render/InteractiveOptions.svelte';

	export let page;
	export let section;
	export let isEmbed;
	export let isCtaHidden;

	let parentPage = page.parentPage || page;
</script>

{#if section}
	{#if !isCtaHidden}
		{#if page.ctaFooter.interactiveRenderType}
			<RenderSection
				isFooter
				class={`${
					section.theme?.isFullScreen ? 'min-h-screen' : 'relative sm:py-32  overflow-hidden'
				}  _bg-cta z-0 p-4 sm:p-8 w-full text-center max-h-[100%] z-0 bottom-0 flex flex-col justify-center min-h-screen sm:min-h-0`}
				page={{ ...page, theme: { ...page.theme, isTitlesLeft: false } }}
				section={{
					...page.ctaFooter,
					_isHero: false,
					_isCtaFooter: true,
					title: section.title || page.activeHero.title,
					description: section.description || '',
					subtitle: '',
					theme: {
						...section.theme,
						isTitleLeft: false
					},
					isShown: true
				}}
			/>
		{:else}
			<RenderSection
				isFooter
				class={`${
					section.theme?.isFullScreen ? 'min-h-screen' : 'relative sm:py-32  overflow-hidden'
				}  _bg-cta z-0 p-4 sm:p-8 w-full text-center max-h-[100%] z-0 bottom-0 flex flex-col justify-center min-h-screen sm:min-h-0`}
				page={{ ...page, theme: { ...page.theme, isTitlesLeft: false } }}
				section={{
					...page.activeHero,
					...page.ctaFooter,
					_isHero: false,
					_isCtaFooter: true,
					title: section.title || page.activeHero.title,
					description: section.description || '',
					subtitle: '',
					theme: {
						...page.ctaFooter?.theme,
						isTitleLeft: false
					},
					isShown: true,
					interactiveRenderType:
						page.activeHero?.interactiveRenderType ||
						(page.renderType === 'article' ? 'email' : ''),

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
		{/if}
	{/if}

	<div
		class="mx-auto h-px max-w-8xl opacity-[15%] w-full"
		style="background:linear-gradient(to right, rgba(0,0,0,0), {page.theme
			?.accentColor}, rgba(0,0,0,0))"
	/>

	<RenderFooter bind:page />
{/if}
