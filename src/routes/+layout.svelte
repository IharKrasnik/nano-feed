<script>
  import "../app.css";
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';

	import currentUser, { isLoading as isUserLoading } from '$lib/stores/currentUser';
	import projects from '$lib/stores/projects';
	
	import { API_URL } from '$lib/env';
</script>

<svelte:head>
	<title>Paralect Stream</title>
	<meta name="description" content="Paralect Stream" />
</svelte:head>

<div class="app" class:bg-black={ !$page.url.href.includes('embed-live') } class:_gradient={ $page.url.href.toLowerCase().includes('bachrimchuk') }>
	<main>
	
	<main class="{$page.url.href.includes('/embed') ? '': 'container relative mx-auto p-8 max-w-[600px]'}">
			<div class="absolute" style="margin-left: -300px; text-transform: uppercase; opacity: .95">
				<a href="/">
					<h1 class="text-xl font-bold mr-4" style="z-index: 100;">
						Stream://
					</h1>
				</a>
			</div>
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
		/* background: black; */
	}

	._gradient {
			background: linear-gradient(270deg, #6d1776, #f2a0e8);
			background-size: 400% 400%;

			-webkit-animation: AnimationName 30s ease infinite;
			-moz-animation: AnimationName 30s ease infinite;
			animation: AnimationName 30s ease infinite;
	}


	._link {
		cursor: pointer;
		transition: all linear 0.05s;
	}

	._link:hover {
		background: rgba(255, 255, 255, .1);
	}

	@-webkit-keyframes AnimationName {
			0%{background-position:0% 50%}
			50%{background-position:100% 50%}
			100%{background-position:0% 50%}
	}
	@-moz-keyframes AnimationName {
			0%{background-position:0% 50%}
			50%{background-position:100% 50%}
			100%{background-position:0% 50%}
	}
	@keyframes AnimationName {
			0%{background-position:0% 50%}
			50%{background-position:100% 50%}
			100%{background-position:0% 50%}
	}
</style>
