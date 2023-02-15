<script>
  export let page = {
    name:  'momentum',
    slug: 'momentum',
    title: 'Build a better product in public and grow your audience',
    subtitle: 'Momentum instructs you how to create and distribute your content. Add subscribers early and build based on real users feedback.',
    callToAction: 'Join Waitlist',
    bgColor: '#D98324'
  };

  export let noStickyHeader = false;

  import SvelteMarkdown from 'svelte-markdown';

  import { post } from 'lib/api';
  import { fly, fade, slide } from 'svelte/transition';
  import { onMount } from 'svelte';

  import RenderUrl from '$lib/components/RenderUrl.svelte';

  import TwitterIcon from '$lib/icons/Twitter.svelte';
  import LinkedInIcon from '$lib/icons/LinkedIn.svelte';
  import iframeResize from 'iframe-resizer/js/iframeResizer';

  import { STREAM_URL, PAGE_URL } from 'lib/env';

  let isMounted = false;
  
  onMount(() => {
    isMounted = true;
  });

  let email;
  let isSubmitted = false;

  let submitEmail = async () => {
    await post(`pages/${page.slug}/submissions`, { email });
    isSubmitted = true;

    if (page.actionUrl) {
      setTimeout(() => {
        window.location.href = page.actionUrl;
      }, 2000);
    }
  }

  let inputEl;

  const onButtonClick = () => {
    inputEl.focus();
  }

  let resize = () => {
    iframeResize({ log: true }, '#iframeResize');
  }

  let scrollY;
</script>

<svelte:window bind:scrollY />

{#if !noStickyHeader && scrollY > 300}
  <div 
    class="fixed top-0 z-30 bg-white w-full"
    in:fly={{ y: -150, duration: 150, delay: 150 }}
    out:fade={{ duration: 150, delay: 150 }}
  >
  <div class="flex w-full justify-between items-center max-w-[1080px] left-0 mx-auto py-2">
    <div class="flex items-center shrink-0">
      <div class="text-lg font-bold">{page.logo || ''} {page.name}</div>

      <div class="ml-4 opacity-70 invisible md:visible">
      &nbsp; {page.title}
      </div>
    </div>
    
    <div class="shrink-0">
      <button class="cursor-pointer" on:click={onButtonClick}>{page.callToAction}</button>
    </div>
  </div>

  <hr class="border-[#8B786D] opacity-30 w-full">
  
</div>
{/if}

{#if isMounted}
  <div class="sticky bg-white z-20 w-full p-8 md:p-0" in:fade={{ duration: 150 }}>
    <div class="_header flex justify-between items-center">
      <div class="_logo">
        {page.logo || ''} {page.name}
      </div>

      <button class="mt-2 cursor-pointer" on:click={onButtonClick}>{page.callToAction}</button>
    </div>

    <div class="_root" >
      <div 
        class="_content {page.demoUrl ? 'py-32' : 'h-screen'}"
        class:h-screen={!page.streamSlug && !page.benefits?.length}
        >
        <div class="flex h-full {page.demoUrl ? 'flex-col sm:flex-row justify-between' : 'text-center items-center'}">
          <div class="{page.demoUrl ? 'text-left max-w-[500px]' : 'flex flex-col items-center max-w-[800px] mx-auto'}">
            <h1 class="_title" style="color: {page.bgColor}">{page.title}</h1> 
            
            {#if page.subtitle}
              <h2 class="_subtitle">{page.subtitle}</h2>
            {/if}
            
            <div class="_input_container flex items-center md:w-[392px] w-full">
              <form class="w-full" on:submit|preventDefault="{submitEmail}">

                {#if !isSubmitted}
                  <input class="_input w-full" placeholder="Your Email" type="email" required bind:this={inputEl} bind:value={email} disabled={isSubmitted}/>
                  <button type="submit" class="_input_button">{page.callToAction}</button>
                {:else}
                  <div style="color: #000">
                    💥 Thank you!
                  </div>

                  {#if page.actionUrl}
                    <div class="mt-8 opacity-70">
                      Redirecting...
                    </div>
                  {/if}
                {/if}
              </form>
            </div>
          </div>

          {#if page.demoUrl}
            <div class="w-full md:max-w-[600px] mt-8 md:mt-0 md:ml-8">
              <RenderUrl  url={page.demoUrl} />
            </div>
          {/if}
        </div>

        {#if isMounted && page.testimonials?.length}
          <div class="w-full flex flex-col md:flex-row justify-center mt-16 md:mt-32 mb-8">
            {#each page.testimonials as testimonial, i}
              <div class="p-4 rounded-2xl bg-[#fafafa] w-full md:max-w-[350px] mr-4 mb-4 md:mb-0" in:fly={{ x: -50, y:-50, duration: 150, delay: 150 * (i + 1) }}>
                <div class="flex flex-col md:flex-row">
                  {#if testimonial.avatarUrl}
                    <div class="mr-4 mb-4 md:mb-0">
                      <img src={testimonial.avatarUrl} class="max-w-[50px] aspect-square rounded-full" />
                    </div>
                  {/if}
                  <div>
                    <SvelteMarkdown source={testimonial.name}></SvelteMarkdown>
                    <div class="mt-1 opacity-80">
                      <SvelteMarkdown source={testimonial.comment}></SvelteMarkdown>
                    </div>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        {/if}

        {#if page.benefits?.length}
          <div class="w-full mt-16 md:mt-32 mb-8">
            {#each page.benefits as benefit,i}
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-16" style="{ i%2===1 ? '': '' }">
                <div class="text-left self-center order-none { i%2===1 ? 'md:order-last' : '' }" class:order-last={i%2===0}>
                  <h2 class="text-2xl font-bold mb-4">{benefit.title}</h2>
                  <h3 class="whitespace-pre-wrap text-lg">{benefit.description}</h3>
                </div>
                <div class="order-none { i%2===0 ? 'md:order-last' : '' }">
                  <RenderUrl url={benefit.imageUrl}></RenderUrl>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}

{#if page.streamSlug}
  <div class="sticky z-20 bg-white">
    <h1 class="w-full text-center font-bold text-2xl opacity-70" style="font-family: Inter;">We Build In Public</h1>
    <h1 class="w-full text-center text-lg opacity-70" style="font-family: Inter;">Follow our journey in social network and blogs.</h1>
    {#if page.links}
      <div class="flex justify-center w-full">
        {#if page.links.twitter}
        <div class="w-[35px] h-[35px] m-2">
          <a href="{page.links.twitter}" class="scale-110" target="_blank">
            <TwitterIcon></TwitterIcon>
          </a>
        </div>
        {/if}
        {#if page.links.linkedin}
        <div class="w-[35px] h-[35px] m-2">
          <a href="{page.links.linkedin}" target="_blank">
            <LinkedInIcon></LinkedInIcon>
          </a>
        </div>
        {/if}
      </div>
    {/if}
  </div>

  <iframe id="iframeResize" on:load={resize} class="w-full sticky z-20 bg-white" src="{STREAM_URL}/{page.streamSlug}/embed?theme=light&isHorizontal=true&isViewAll=true"></iframe>
{/if}

{#if page.streamSlug || page.benefits?.length}
  <div class="h-screen sticky"></div>

  <div class="w-full text-center bg-[#fafafa] h-screen sticky z-0 bottom-0 flex flex-col justify-center p-4">
    <div class="text-lg my-4">{page.logo||''} {page.name}</div>
    <div class="text-3xl font-bold mb-8">
      {page.title}
    </div>

    <div class="_input_container flex items-center mx-auto w-full md:w-[392px]">
      <form class="w-full" on:submit|preventDefault="{submitEmail}">

        {#if !isSubmitted}
          <input class="_input w-full" placeholder="Your Email" type="email" required bind:value={email} disabled={isSubmitted}/>
          <button type="submit" class="_input_button">{page.callToAction}</button>
        {:else}
          <div style="color: #000">
            💥 Thank you!
          </div>

          {#if page.actionUrl}
            <div class="mt-8 opacity-70">
              Redirecting...
            </div>
          {/if}
        {/if}
      </form>
    </div>
  </div>
{/if}


<style>
  ._root {
    width: 100%;
    max-width: 1080px;
    color: #0C120C;
    margin: 0 auto;
    background: white;
  }

  ._header {
    max-width: 1080px;
    margin: 0 auto;
  }

  ._logo {
    font-family: Archivo;
    font-weight: bold;
    font-size: 18px;
    margin-top: 12px;
  }

  ._content {
    margin-top: -40px;
  }

  ._title {
    font-family: Archivo;
    font-size: 36px;
    line-height: 1.2;
    margin-bottom: 32px;
  }

  ._subtitle {
    font-size: 18px;
    line-height: 26px;
    margin-bottom: 40px;
  }

  ._input_container {
    position: relative;
  }

  ._input {
    background: #F5F5F5;
    width: 100%;
    padding: 10px 18px;
    border-radius: 20px;
    font-size: 16px;
  }
  
  button {
    border-radius: 30px;
    padding: 5px 20px;
    color: white;
    background-color: #000;
  }

  ._input_button {
    padding: 13px 30px;
    position: absolute;
    display: flex;
    align-items: center;
    z-index: 100;
    height: 100%;
    right: 0;
    top: 0;
  }

  ._momentum-stream {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 500px;
    height: 600px;
  }

</style>


