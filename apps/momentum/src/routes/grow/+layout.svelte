<script>
	import { fade } from 'svelte/transition';

	let titles = [`Your startup is a media company`, `You are a media company`];
	let i = 0;

	let title = titles[0];

	setInterval(() => {
		title = titles[i++ % 2];
	}, 7000);
</script>

<div class="container max-w-[1200px] mx-auto mt-8">
	<a href="/grow">
		<div class="flex flex-col items-center justify-center mb-8">
			<img
				class="w-[50px] h-[50px] mr-2"
				src="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1683477275194-nano-logo-big.png"
			/>
			<h2>Nano</h2>
			{#key title}
				<h3 class="transition" in:fade>{title}</h3>
			{/key}
		</div>
	</a>

	<slot />
</div>
