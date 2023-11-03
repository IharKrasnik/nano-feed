<script>
	export let section;

	import FileInput from 'lib/components/FileInput.svelte';

	let addNewTestimonial = () => {
		section.testimonials = section.testimonials || [];

		section.testimonials.push({
			name: '',
			comment: '',
			avatarUrl: ''
		});
	};

	let removeTestimonial = (testimonial) => {
		section.testimonials = section.testimonials.filter((t) => t !== testimonial);
	};
</script>

{#if section}
	<div class="_section">
		<div class="flex justify-between items-center">
			<div class="_title" style="margin: 0;">Testimonials</div>

			{#if !section.testimonials?.length}
				<div class="text-right w-full">
					<a class="cursor-pointer text-[#8B786D]" on:click={addNewTestimonial}>Add Testimonial</a>
				</div>
			{/if}
		</div>

		{#each section.testimonials || [] as testimonial}
			<div class="font-normal text-sm opacity-70 mt-4 mb-2">What's the testimonial?</div>

			<textarea
				class="w-full mb-4"
				bind:value={testimonial.comment}
				placeholder="These action plans finally made me post daily and share the Kickstart news with a wide audience. Great to start!"
				rows="3"
			/>

			<div class="flex justify-between items-center">
				<div class="font-normal text-sm opacity-70 mb-2">Who said that?</div>
				<div
					class="text-sm cursor-pointer text-[#8B786D]"
					on:click={() => removeTestimonial(testimonial)}
				>
					🗑
				</div>
			</div>

			<input
				class="mb-4 w-full"
				bind:value={testimonial.name}
				placeholder="Victoriya Barovskaya, CEO, Kickstart"
			/>

			<div class="font-normal text-sm opacity-70 mb-2">Their Avatar</div>
			<div class="flex items-center">
				<FileInput class="w-full" theme="light" bind:url={testimonial.avatarUrl} />
			</div>

			<hr class="my-4 border-[#8B786D] opacity-30" />
		{/each}

		{#if section.testimonials?.length > 0}
			<a
				class="w-full p-4 flex justify-center cursor-pointer text-[#8B786D]"
				on:click={addNewTestimonial}>Add Testimonial</a
			>
		{/if}
	</div>
{/if}
