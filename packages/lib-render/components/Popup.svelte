<script>
	import { fly } from 'svelte/transition';
	import portal from 'lib/use/portal';
	import CrossSvg from 'lib/icons/cross.svelte';
	import clickOutside from 'lib/use/clickOutside';
	import getPageCssStyles from 'lib-render/services/getPageCssStyles';

	export let isShown;
	export let isClosable = true;
	export let isFixed = true;
	export let position = 'center';
	export let maxWidth = position === 'center' ? 1080 : 900;
	export let zIndex = 2000;
	export let onClosed = () => {};
	export let isClickOutsideClose = true;

	export let page;

	const closePopup = () => {
		if (!isClickOutsideClose) {
			if (confirm('Close request popup?')) {
				isShown = false;
				onClosed();
			}
		}
	};

	const handleKeydown = (evt) => {
		if (isShown && evt.key === 'Escape') {
			closePopup();
		}
	};

	let cssVarStyles;
	let styles;

	$: if (page) {
		let res = getPageCssStyles(page);
		cssVarStyles = res.cssVarStyles;
		styles = res.styles;
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isShown}
	<div use:portal={'#popup-portal'}>
		<div
			in:fly={{ ...(position === 'center' ? { y: 50 } : { x: 150 }), duration: 150, delay: 150 }}
			class="inset-0 overflow-y-hidden max-h-[100%] py-8 {page.theme?.theme === 'dark'
				? '_dark'
				: '_light'}"
			aria-labelledby="popup-title"
			role="dialog"
			aria-modal="true"
			class:hidden={!isShown}
			class:fixed={isFixed}
			class:absolute={!isFixed}
			style="z-index: {zIndex};"
		>
			<div class="flex items-end justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<div class="absolute _popup-backdrop inset-0 transition-opacity" aria-hidden="true" />

				<div
					class="popup-content {position === 'center'
						? 'positiion-center rounded-2xl'
						: 'position-right'} max-h-full overflow-y-auto absolute inline-block align-bottom text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full"
					use:clickOutside
					on:clickOutside={closePopup}
					style={maxWidth ? `max-width: ${maxWidth}px;` : ''}
				>
					{#if isClosable}
						{#if position === 'center'}
							<div class="_cross" on:click={closePopup}>
								<CrossSvg />
							</div>
						{:else}
							<div
								class="__d absolute w-[25px] top-[20px] left-0 cursor-pointer z-10"
								style="transform: translateX(-100%); {page.theme?.theme === 'light'
									? 'stroke: #111111;'
									: 'stroke: #ffffff;'}"
								on:click={closePopup}
							>
								<CrossSvg />
							</div>
						{/if}
					{/if}
					<div class="_popup-contents" style="{cssVarStyles}; color: var(--text-color);">
						<slot />
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.backdrop {
		/* backdrop-filter: blur(3px); */
		background-color: rgba(0, 0, 0, 0);
	}
	.popup-content {
		z-index: 1000;
	}

	._cross {
		cursor: pointer;
		opacity: 0.7;
		transition: opacity 0.3;
		position: absolute;
		top: 20px;
		right: 20px;
		width: 25px;
	}
	._cross:hover {
		opacity: 1;
	}

	._dark ._popup-backdrop {
		/* display: none; */
		background: rgba(0, 0, 0, 0.8);
	}

	._light ._popup-backdrop {
		background: rgba(255, 255, 255, 0.8);
	}

	.popup-content.positiion-center {
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
		width: calc(100% - 32px);
	}

	.popup-content.position-right {
		top: 50%;
		right: 0;
		transform: translateX(0%) translateY(-50%);
		width: calc(100% - 32px);
		height: 100vw;
	}

	.position-right ._popup-contents {
		height: 100vh;
		@apply overflow-y-scroll;
	}

	._dark ._popup-contents {
		background: #111;
	}

	._light ._popup-contents {
		background: #fff;
	}
</style>
