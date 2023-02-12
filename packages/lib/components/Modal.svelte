<script>
  import { fly } from 'svelte/transition';
	import portal from 'lib/use/portal';
	import clickOutside from 'lib/use/clickOutside';

	export let isShown;
	export let isClosable = true;
	export let isFixed = true;
	export let maxWidth = 1080;
	export let zIndex = 2000;
	export let onClosed = () => {};
	
  const closeModal = () => {
		isShown = false;
		onClosed();
	};

  const handleKeydown = (evt) => {
		if (isShown && evt.key === 'Escape') {
			closeModal();
		}
	};
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isShown}
	<div use:portal={'#modal-portal'}>
		<div
      in:fly={{  y: 50, duration: 150, delay: 150 }}
			class="_modal inset-0 overflow-y-hidden rounded-2xl max-h-[100%]"
			aria-labelledby="modal-title"
			role="dialog"
			aria-modal="true"
			class:hidden={!isShown}
			class:fixed={isFixed}
			class:absolute={!isFixed}
			style="z-index: {zIndex}"
		>
			<div class="flex items-end justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<div class="absolute backdrop inset-0 transition-opacity" aria-hidden="true" />

				<div
					class="modal-content max-h-full overflow-y-scroll absolute inline-block align-bottom rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full"
          
          use:clickOutside on:clickOutside={closeModal}
				
        	style="{maxWidth
						? `max-width: ${maxWidth}px;`
						: ''}"
				>
					{#if isClosable}
						<!-- <div class="_cross" on:click={closeModal}>
							<CrossSvg />
						</div> -->
					{/if}
					<div class="bg-[#111111]">
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
	.modal-content {
		z-index: 1000;
	}
	._cross {
		cursor: pointer;
		opacity: 0.4;
		transition: opacity 0.3;
		position: absolute;
		top: 20px;
		right: 20px;
		width: 15px;
	}
	._cross:hover {
		opacity: 1;
	}
	.modal-content {
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
		width: calc(100% - 32px);
	}
	.backdrop {
		background-color: #14161a;
		opacity: 0.5;
	}
</style>