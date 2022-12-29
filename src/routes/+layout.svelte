<script>
  import "../app.css";
	import { page } from '$app/stores';
	import currentUser, { isLoading as isUserLoading } from '$lib/stores/currentUser';
	import creators from '$lib/stores/creators';
	
	import { API_URL } from '$lib/env';
	
	// import authGuard from '$lib/guards/auth';

	// export function load({ url, params, session }) {
	// 	console.log('load 12323 12321')
	// 	// return authGuard({ url, params, session });
	// }

    $: creator = ($currentUser ? $creators.find(c => c.username === $currentUser.username) : null);

// }
</script>

<svelte:head>
	<title>Paralect Stream</title>
	<meta name="description" content="Paralect Stream" />
</svelte:head>

<div class="app" class:_gradient={ $page.url.href.toLowerCase().includes('bachrimchuk') }>
	<main>
	
	<main class="container relative mx-auto p-8 max-w-[600px]">
		<section class="flex justify-between">
			<div class="flex items-center">
				<a class="flex mb-8" href="/">
					<h1 class="text-xl font-bold">Paralect Stream
					</h1>
				</a>
				<a class="ml-2" href="/creators">
					<h1 class="text-xl font-bold mb-8">
						<span class="hover:text-[#00ff85] text-[#fff]">
							{#if $page.url.href.includes('/creators')}
							Creators
							{/if}
						</span>
					</h1>
				</a>
			</div>
			<div>
				{#if (!$isUserLoading && !$currentUser)}
				<a class="_follow_button" href="{API_URL}/auth/google/url?redirect_to={$page.url.href}">
					Follow Stream
				</a>
				{:else if creator}
					<a class="_link px-4 py-2 rounded-xl cursor-pointer flex items-center" href="/creators/{creator.username}">
						<img src="{creator.avatarUrl}" class="w-[30px] h-[30px] mr-2 rounded-full"/>
						{creator.name}
					</a>
				{/if}
			</div>
		</section>

		<slot />
	</main>

	<footer>
		<p></p>
	</footer>
</div>

<style>
	._follow_button {
		border: 1px rgba(255, 255, 255, .3) solid;
		border-radius: 4px;
		padding: 4px 16px;
	}

	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		transition: all 0.2s linear;
		background: black;
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
