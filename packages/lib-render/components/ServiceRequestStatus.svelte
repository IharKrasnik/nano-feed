<script>
	import _ from 'lodash';
	let clazz = '';

	export let sizeClass = `text-sm p-1 px-2 rounded`;
	export { clazz as class };

	export let submission;
</script>

<div class={clazz}>
	{#if submission._id}
		{#if submission.isClosed}
			<div class="{sizeClass} text-center text-[#111111] bg-orange-300">Closed</div>
		{:else if submission.isActivated}
			{#if submission.isPaid}
				<div class="{sizeClass} text-center text-[#111111]  bg-accent">Completed</div>
			{:else if submission.reviews?.length}
				{#if _.last(submission.reviews)?.isPending}
					<div class="{sizeClass} text-center  text-[#111111] bg-yellow-300">Under Review</div>
				{:else}
					<div class="{sizeClass} text-center text-[#111111] bg-orange-300">Changes Requested</div>
				{/if}
			{:else}
				<div class="{sizeClass} text-center text-[#111111]  bg-yellow-300">Work in Progress</div>
			{/if}
		{:else}
			<div class="{sizeClass} text-center text-[#111111] bg-gray-300">Draft</div>
		{/if}
	{:else}
		<div class="{sizeClass} text-center text-[#111111] bg-orange-300">Draft</div>
	{/if}
</div>
