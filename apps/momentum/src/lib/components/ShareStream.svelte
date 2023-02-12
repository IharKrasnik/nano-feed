<script>
  import iframeResize from 'iframe-resizer/js/iframeResizer';

  import { onMount } from 'svelte';
  import { STREAM_URL } from '$lib/env';
  import Highlight from '$lib/components/Highlight.svelte';

  export let project;
  export let creator;

  let shareUrl = `${STREAM_URL}/${project ? project.slug : `@${creator.username}`}`;

  let embedCode = `
<script src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.min.js" integrity="sha512-dnvR4Aebv5bAtJxDunq3eE8puKAJrY9GBJYl9GC6lTOEC76s1dbDfJFcL9GyzpaDW4vlI/UjR8sKbc1j6Ynx6w==" crossorigin="anonymous" referrerpolicy="no-referrer"><\/script>

<iframe id="momentum-feed" style="width:100%; border: none;" src="${shareUrl}/embed" onload="iFrameResize({}, '#momentum-feed')" \/>
`;

  let copyEmbedCode = () => {
    navigator.clipboard.writeText(embedCode);
  }

  onMount(() => {
    iframeResize({}, '#iframeResize');
  })
</script>

<div>
  <label>Stream URL</label>
  <input type="text" disabled value={shareUrl} />
</div>

<div class="mt-8">
  <label>Embed Momentum Live Feed</label>

  <Highlight code="{embedCode}" />

  <button class="mt-4" on:click="{copyEmbedCode}">{'</>'} Copy Embed Code</button>

  <!-- <div class="w-[2000px]">
    <iframe 
      id="iframeResize"
      class="w-full mt-4"
      src="{shareUrl}/embed?limit=5">
    </iframe>
  </div> -->
</div>