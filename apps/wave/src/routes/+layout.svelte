<script>
	// export const prerender = false;

  import "../app.css";
	import "lib/app.css";

	import { page } from '$app/stores';

  import { SvelteToast } from '@zerodevx/svelte-toast'
</script>

<svelte:head>
	<title>{$page.data.ogTitle}</title>
	<meta name="title" content="Wave by Momentum" />
	<meta name="description" content="Stupid-simple web analytics" />
	<meta name="og:description" content="Stupid-simple web analytics" />
</svelte:head>


<div id="modal-portal" />


<div 
	class="app overflow-y-scroll bg-black" 
>
	<SvelteToast />
	
	<main 
		class="container relative p-8 mx-0 xl:mx-auto mt-[45px] sm:mt-[65px] xl:mt-0 max-w-[600px]">
		
		<slot />
	</main>

	<footer>
		<p></p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		transition: all 0.2s linear;
	}
</style>
