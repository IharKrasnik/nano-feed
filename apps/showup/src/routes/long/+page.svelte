<script>
	import ContentEditable from 'lib/components/ContentEditable.svelte';

	let update = {
		title: 'Update',
		html: ''
	};
</script>

<div class="container max-w-[700px] mx-auto">
	<ContentEditable
		class="content bg-site color-site text-2xl font-bold"
		bind:value={update.title}
		isWithMenu={true}
	/>

	<div>
		<ContentEditable
			class="content bg-site color-site text-lg"
			placeholder="Start typing..."
			bind:value={update.html}
			isWithMenu={true}
		/>
	</div>
</div>
