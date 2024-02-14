<script>
	import Counter from '@/components/Counter.svelte';
</script>

<main id="intro">
	Yo!

	<section class="button-section">
		<Counter />
	</section>
</main>

<style lang="postcss">
	:global(#app) {
		@apply flex justify-center items-center;
	}

	main {
		@apply px-6;
	}

	header {
		& > div {
			@apply flex justify-center items-center  mb-6;
		}

		:global(& > div a ~ a) {
			@apply ml-6;
		}

		h1 {
			@apply font-bold text-4xl text-center mb-3;
		}

		:global(& span) {
			@apply block mb-6 text-center text-lg text-gray-500;
		}
	}

	main > section,
	footer {
		@apply py-4;
	}

	.vite,
	.svelte {
		width: 64px;
		height: 64px;
	}

	.tailwind {
		width: 80px;
		height: 80px;
	}

	.button-section {
		@apply flex justify-center items-center flex-col sm:flex-row;

		:global(& button ~ button) {
			@apply my-2 md:ml-8;
		}
	}
</style>
