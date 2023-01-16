<script>
  import axios from 'axios';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import FeedItemPreview from '$lib/components/FeedItemPreview.svelte';
  import Loader from '$lib/components/Loader.svelte';
  
  import placeholder from '$lib/use/placeholder';

  import currentUser from '$lib/stores/currentUser';

  import { page } from '$app/stores';
  import { get } from '$lib/api';

  let isLoading = true;
  let feedItem;
  
  let url;
  let attachmentUrl;
  let files = [];
  let addAttachmentClicked = false;

  let startTitle = browser ? window.history.state.title : null;

  function isValidHttpUrl(string) {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }

  let urlIsLoading = false;

  const addUrl = async () => {
    urlIsLoading = true;

    try {
      const { data } = await axios({
        url: 'https://igor.npkn.net/fetch-meta-tags',
        params: { url, }
      });

      feedItem.url = data.url || url;
      feedItem.embedUrl = data.embedUrl;

      feedItem.source = data.source;

      feedItem.title = data.title;
      feedItem.content = data.description;

      if (data.image) {
        feedItem.attachments = [{ type: 'image', url: data.image}];
      }

      if (data.creatorUsernames) {
        feedItem.creators = data.creatorUsernames.map(username => creators.find(c => c.username === username));
      }

      if (data.projectSlugs) {
        feedItem.projects = data.projectSlugs.map(projectSlug => projects.find(c => c.slug === projectSlug));
      }
      debugger;
    } finally {
      urlIsLoading = false;
    }
  }

  if (isValidHttpUrl(startTitle)) {
    url = startTitle;
  }

  onMount(() => {
    if (url) {
      addUrl();
    }
  });

  feedItem = {
    publishedOn: new Date(),
    creators: [$currentUser],
    title: (!url && startTitle) || '',
    content: '',
    url,
    source: null,
    attachments: [],
  };

  let load = async () => {
    let feedItemId = $page.url.searchParams.get('feedItemId');

    if (feedItemId) {
      feedItem = await get(`feed/${feedItemId}`);
    } else {
      feedItem = {
        title: '',
        content: '',
        longContent
      } 
    }

    isLoading = false;
  }

  load();

  let onTitleChange = async () => {
    if (isValidHttpUrl(feedItem.title)) {
      url = feedItem.title;
      await addUrl();
    }
  }
</script>

<div class="mt-8">

  <div>
    {#if !isLoading || feedItem.title}
      <h1
        style="font-size: 32px; font-family: Montserrat; font-weight:bold; border:none; padding-left: 0; outline: none;"
        contenteditable
        use:placeholder={"Title"}
        bind:innerHTML={feedItem.title}
        on:input={onTitleChange}
      >
      </h1>
    {/if}

    {#if isLoading}
      <div class="w-full flex justify-center">
        <Loader />
      </div>
    {:else}
      <div 
        role="textbox"
        contenteditable
        style="font-size: 20px; outline: none;"
        class="py-4 whitespace-pre-wrap"
        use:placeholder={"Content"}
        bind:innerHTML={feedItem.content}
      >
      </div>

      <div class="mt-4">
        Add Cover
      </div>
    {/if}
  </div>
</div>