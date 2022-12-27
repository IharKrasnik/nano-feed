<script>
  import "../app.css";
</script>

<svelte:head>
	<title>Paralect Feed</title>
	<meta name="description" content="Paralect feed" />
</svelte:head>

<div class="app">
	<main>
	
	<main class="container relative mx-auto p-8 max-w-[600px]">
		<section>
			<a href="/">
				<h1 class="text-xl font-bold mb-8">Paralect Feed</h1>
			</a>
		</section>

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
	}
</style>
