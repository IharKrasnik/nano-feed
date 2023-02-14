<script>
  export let page = {
    name:  'momentum',
    slug: 'momentum',
    title: 'Build a better product in public and grow your audience',
    subtitle: 'Momentum instructs you how to create and distribute your content. Add subscribers early and build based on real users feedback.',
    callToAction: 'Join Waitlist',
    bgColor: '#D98324'
  };

  import { post } from 'lib/api';

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


</script>

<div class="_header">
  <div class="_logo">
    {page.logo || ''} {page.name}
  </div>
</div>

<div class="_root">
  <div class="_content h-screen {page.demoUrl ? 'flex-row justify-between' : 'flex-column items-center'}">
    <div class="{page.demoUrl ? 'text-left max-w-[500px]' : 'flex flex-col items-center max-w-[800px] mx-auto'}">
      <h1 class="_title" style="color: {page.bgColor}">{page.title}</h1> 
      
      {#if page.subtitle}
        <h2 class="_subtitle">{page.subtitle}</h2>
      {/if}
      
      <div class="_input_container flex items-center">
        <form class="w-full" on:submit|preventDefault="{submitEmail}">

          {#if !isSubmitted}
            <input class="_input w-full" placeholder="Your Email" type="email" required bind:value={email} disabled={isSubmitted}/>
            <button type="submit" class="_input_button" style="background-color: {page.bgColor || '#000'}">{page.callToAction}</button>
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
    <div class="w-[600px] p-8">
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

</div>

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
    display: flex;
    align-items: center;
    text-align: center;
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
    width: 392px;
  }

  ._input {
    background: #F5F5F5;
    width: 100%;
    padding: 10px 18px;
    border-radius: 20px;
    font-size: 16px;
  }
  
  ._input_button {
    position: absolute;
    z-index: 100;
    height: 100%;
    right: 0;
    top: 0;
    border-radius: 30px;
    padding: 13px 30px;
    color: white;
  }

  ._momentum-stream {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 500px;
    height: 600px;
  }

</style>


