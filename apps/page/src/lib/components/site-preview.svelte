<script>
  export let page = {
    name:  'momentum',
    slug: 'momentum',
    title: 'Build a better product in public and grow your audience',
    subtitle: 'Momentum instructs you how to create and distribute your content. Add subscribers early and build based on real users feedback.',
    callToAction: 'Join Waitlist',
    bgColor: '#D98324'
  };

  import SvelteMarkdown from 'svelte-markdown';

  import { post } from 'lib/api';

  import TwitterIcon from '$lib/icons/Twitter.svelte';
  import LinkedInIcon from '$lib/icons/LinkedIn.svelte';
  import iframeResize from 'iframe-resizer/js/iframeResizer';

  import { STREAM_URL, PAGE_URL } from 'lib/env';

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

</script>

<div class="p-8 md:p-0">
  <div class="_header flex justify-between items-center">
    <div class="_logo">
      {page.logo || ''} {page.name}
    </div>

    <button class="mt-2 cursor-pointer" on:click={onButtonClick}>{page.callToAction}</button>
  </div>

  <div class="_root" >
    <div 
      class="_content {page.demoUrl ? 'py-32' : 'h-screen'}"
      class:h-screen={!page.streamSlug}
      >
      <div class="flex h-full {page.demoUrl ? 'flex-col sm:flex-row justify-between' : 'flex-column items-center'}">
        <div class="{page.demoUrl ? 'text-left max-w-[500px]' : 'flex flex-col items-center max-w-[800px] mx-auto'}">
          <h1 class="_title" style="color: {page.bgColor}">{page.title}</h1> 
          
          {#if page.subtitle}
            <h2 class="_subtitle">{page.subtitle}</h2>
          {/if}
          
          <div class="_input_container flex items-center md:w-[392px]">
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
        <div class="w-full md:w-[600px] mt-8 md:mt-0 md:ml-8">
          {#if page.demoUrl.includes('loom.com')}
            <iframe
              style="width: 100%; aspect-ratio: 536/300;"
              src={page.demoUrl.replace('share/', 'embed/')}
            />  
          {:else}
            <img src="{page.demoUrl}" />
          {/if}
        </div>
        {/if}
      </div>

      {#if page.testimonials?.length}
      <div class="w-full flex justify-center mt-32 mb-8">
        {#each page.testimonials as testimonial}
          <div class="p-4 rounded-2xl bg-[#fafafa] w-full md:max-w-[350px] mr-4">
            <div class="flex">
              {#if testimonial.avatarUrl}
                <div class="mr-4">
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
    </div>
  </div>
</div>


  {#if page.streamSlug}
    <div>
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

    <iframe id="iframeResize" on:load={resize} class="w-full" src="{STREAM_URL}/{page.streamSlug}/embed?theme=light"></iframe>

    <div class="w-full p-4 md:p-32 text-center bg-[#fafafa]">
      <div class="text-xl mb-8">
        {page.title}
      </div>

      <div class="_input_container flex items-center mx-auto md:w-[392px]">
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


