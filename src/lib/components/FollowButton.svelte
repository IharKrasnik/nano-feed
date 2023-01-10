<script>
  export let creator;
  export let project;
  export let isShort = false;
  export let isOnlyFollow = false;
 
  let clazz = 'w-full';
  export { clazz as class };
 
  import { post, del } from '$lib/api';
  import currentUser from '$lib/stores/currentUser';
  import allProjects from '$lib/stores/allProjects';

  let sortProjectsByFollowing = () => {
    $allProjects = [...$allProjects.sort((a, b) => Number (b.isFollowing || false) - Number(a.isFollowing || false))];
    return $allProjects;
  }

  const followStream = async () => {
		let follow = {};

		if (creator) {
			follow.creatorId = creator._id;
		}
		
		if (project?.slug) {
			follow.projectId = project._id
      $allProjects.find(p => p._id === project._id).isFollowing = true;

      $allProjects = sortProjectsByFollowing();
		}

		// $follows = [{ ...(creator || project), followType: creator ? 'creator' : 'project' }, ...$follows];
		
		// if (!$projects.find(p => p._id === project._id)) {
		// 	$projects = [project, ...$projects];
		// }
		
		await post('follows', follow);
	}

	const unfollowStream = async () => {
		let query = {};

		if (project?.slug) {
			query.projectId = project._id;
      $allProjects.find(p => p._id === project._id).isFollowing = false;

      $allProjects = sortProjectsByFollowing();
		}

		if (creator) {
			query.creatorId = creator._id;
		} 
		
		// $follows = $follows.filter(f => f._id !== (query.projectId || query.creatorId));
		
		// if (!isExploreProjectsModeOn) {
		// 	$projects = $projects.filter(p => p._id !== (query.projectId || query.creatorId));
		// }
		
		await del('follows', query);
	}
</script>

{#if $currentUser}
  <div class="my-4">
    {#if creator && creator._id !== $currentUser._id}
      {#if $allProjects.find(f => f._id === creator._id).isFollowing}
        {#if !isOnlyFollow}
          <div class="w-full font-bold text-sm cursor-pointer hover:underline text-center" on:click={unfollowStream}>
            {#if isShort}
            ✓ Following
            {:else}
            ✓ You're following { creator.fullName }
            {/if}
          </div>
        {/if}
      {:else}
        <button class="{clazz}" on:click={followStream}>
          {#if isShort}
          Follow
          {:else}
          Follow @{creator.fullName}
          {/if}
        </button>
      {/if}
    {/if}

    {#if project && project.slug && project.creator?._id !== $currentUser._id}
      {#if $allProjects.find(f => f._id === project._id).isFollowing}
        {#if !isOnlyFollow}
          <div class="w-full font-bold text-sm cursor-pointer hover:underline text-center" on:click={unfollowStream}>
            {#if isShort}
            ✓ Following
            {:else}
            ✓ You're following { project.title }
            {/if}
          </div>
        {/if}
      {:else}
        <button class="{clazz}" on:click={followStream}>
          {#if isShort}
          Follow
          {:else}
          Follow #{project.title}
          {/if}
        </button>
      {/if}
    {/if}
  </div>
{/if}