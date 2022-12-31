<script>
  import axios from 'axios';
  import slug from 'slug';
  import { post } from '$lib/api';
  import { goto } from '$app/navigation';
  import projects from '$lib/stores/projects';

  let project = {
    name: '',
    slug: '',
    tagline: '',
  }

  const onNameChange = () => {
    project.slug = slug(project.name);
  }

  const launchProject = async () => {
    const result = await post('pages', {
      name: project.name,
      slug: project.slug,
      title: project.tagline,
      callToAction: 'Join Waitlist'
    });

    project.url = `https://page.mmntm.build/p/${project.slug}`;

    const { data } = await axios({
      method: 'post',
      url: 'https://igor.npkn.net/create-project',
      data: project,
    });

    $projects = [project, ...$projects];

    goto('/?project=' + project.slug);
  }

</script>

<h2 class="mb-2">Launch a new project</h2>

<h3 class="mb-8">
  Promote the work that you do daily. <br />
  Project is a page for your updates, social media and links.
</h3>

<div>
  <div class="mb-8">
    <label>Name</label>
    <div class="_hint mb-4">The name should be short and catchy. It's your brand name.</div>

    <input type="text" bind:value={project.name} on:input={onNameChange} placeholder="eg. Momentum, Paralect, MyCatchyBrand etc." />
  </div>

  {#if project.name}
  <div class="mb-8">
    <label>Tagline</label>
    <div class="_hint mb-4">One-liner about your brand. Explain what you to with {project.name}. Make a random reader want to follow your journey.</div>

    <input type="text" bind:value={project.tagline} placeholder='eg. "Grow your audience early."'/>
  </div>
  {/if}

  {#if project.tagline}
  <div class="mt-12">
    <button on:click={launchProject}>Launch #{project.slug}</button>
  </div>
  {/if}
</div>