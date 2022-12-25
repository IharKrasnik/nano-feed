<script>
  export let feedItem = {
		user: {
			username: 'Igor Krasnik',
			avatarUrl: 'https://twitter.com/that_igor_/photo'
		},
		title: 'The 3 approaches to solve any problem',
		content: `We face new issues daily.
You can't postpone decisions forever so you forced to take action.
Some actions are based just on your emotions and the gut feeling. It's rather hit or miss.
But there's a better way to decide. 
`,
		url: 'https://nanohq.co/solve-problems'
	}
</script>

<div class="_item mb-8">
  <div class="mb-4">
    {#if feedItem.title}
      <div class="font-bold" href="{feedItem.url}">{feedItem.title}</div>
    {/if}
    <div class="line-clamp-3 pre">
      {feedItem.content}
    </div>
  </div>
  <div class="flex items-center">
    <img src="{feedItem.user.avatarUrl}" class="rounded-full max-w-[40px]" /> 
    <div class="ml-2 text-sm">
      {feedItem.user.username}
    </div>
  </div>
</div>

<style>
  ._item {
    cursor: pointer;
    transition: all 0.08s linear;
    border: 2px rgba(255,255,255, .1) solid;
    border-radius: 15px;
    padding: 16px;
  }

  ._item:hover {
    transform: scale(1.05);
    background: rgba(255,255,255, 0.03);
    border: 1px rgba(255,255,255, .3) solid;
  }
</style>