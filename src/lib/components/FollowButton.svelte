<script>
  export let creator;
  export let project;

  import { post, del } from '$lib/api';
  import currentUser from '$lib/stores/currentUser';
  import follows from '$lib/stores/follows';

  const followStream = async () => {
		let follow = {};

		if (creator) {
			follow.creatorId = creator._id;
		}
		
		if (project?.slug) {
			follow.projectId = project._id
		}
		
		$follows = [{ ...(creator || project), followType: creator ? 'creator' : 'project' }, ...$follows];
		
		// if (!$projects.find(p => p._id === project._id)) {
		// 	$projects = [project, ...$projects];
		// }
		
		await post('follows', follow);
	}

	const unfollowStream = async () => {
		let query = {};

		if (project?.slug) {
			query.projectId = project._id
		}

		if (creator) {
			query.creatorId = creator._id;
		} 
		
		$follows = $follows.filter(f => f._id !== (query.projectId || query.creatorId));
		
		// if (!isExploreProjectsModeOn) {
		// 	$projects = $projects.filter(p => p._id !== (query.projectId || query.creatorId));
		// }
		
		await del('follows', query);
	}
</script>

{#if $currentUser}
  <div class="my-4">
    {#if creator && creator._id !== $currentUser._id}
      {#if $follows.find(f => f._id === creator._id)}
        <div class="w-full font-bold text-sm cursor-pointer hover:underline text-center" on:click={unfollowStream}>
          ✓ You're following { creator.fullName }
        </div>
      {:else}
        <button class="w-full" on:click={followStream}>
          Follow @{creator.fullName}
        </button>
      {/if}
    {/if}

    {#if project && project.slug && project.creator?._id !== $currentUser._id}
      {#if $follows.find(f => f._id === project._id)}
        <div class="w-full font-bold text-sm cursor-pointer hover:underline text-center" on:click={unfollowStream}>
          ✓ You're following { project.title }
        </div>
      {:else}
        <button class="w-full" on:click={followStream}>
          Follow #{project.title}
        </button>
      {/if}
    {/if}
  </div>
{/if}