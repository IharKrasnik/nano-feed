<script>
	import slug from 'slug';
	import { fade } from 'svelte/transition';
	import { post } from 'lib/api';
	import { PAGE_URL } from '$lib/env';
	import { goto } from '$app/navigation';

	import creators from '$lib/stores/creators';
	import projects from '$lib/stores/projects';
	import currentUser from '$lib/stores/currentUser';

	let project = {
		slug: '',
		title: '',
		description: ''
	};

	const onNameChange = () => {
		project.slug = slug(project.title);
	};

	const launchProject = async () => {
		const result = await post('pages', {
			slug: project.slug,
			name: project.title,
			title: project.description,
			callToAction: 'Join Waitlist'
		});

		project.url = `${PAGE_URL}/p/${project.slug}`;

		const createdProject = await post('projects', project);

		let feedItem = {
			publishedOn: new Date(),

			title: `I've just launched ${project.title} 🎉`,
			content: 'See my website with build in public updates here:',
			url: project.url,
			isRelease: true,
			creators: [$currentUser],
			projects: [{ _id: createdProject._id }],
			attachments: [
				{
					type: 'image',
					url: `${PAGE_URL}/og.png?pageSlug=${project.slug}`
				}
			]
		};

		await post('feed', feedItem);

		$projects = [createdProject, ...$projects];

		goto('/' + project.slug);
	};
</script>

<h2 class="mb-2">Launch a new stream</h2>

<h3 class="mb-8">
	Promote the work that you do daily. <br />
	Stream is a public page for your updates, releases and links.
</h3>

<div>
	<div class="mb-8" in:fade>
		<label>Name</label>
		<div class="_hint mb-4">The name should be short and catchy. It's your brand name.</div>

		<input
			type="text"
			bind:value={project.title}
			on:input={onNameChange}
			placeholder="eg. Momentum, Paralect, MyCatchyBrand etc."
		/>
	</div>

	{#if project.title}
		<div class="mb-8" in:fade={{ duration: 100 }}>
			<label>Tagline</label>
			<div class="_hint mb-4">
				One-liner about your brand. Explain what you to with {project.name}. Make a random reader
				want to follow your journey.
			</div>

			<input
				type="text"
				bind:value={project.description}
				placeholder="eg. "Grow your audience early.""
			/>
		</div>
	{/if}

	{#if project.title}
		<div class="mt-12">
			<button on:click={launchProject}>Launch #{project.slug}</button>
		</div>
	{/if}
</div>
