<script>
  export let page = {
    name:  'momentum',
    slug: 'momentum',
    title: 'Build a better product in public and grow your audience',
    subtitle: 'Momentum instructs you how to create and distribute your content. Add subscribers early and build based on real users feedback.',
    callToAction: 'Join Waitlist',
    bgColor: '#D98324'
  };

  import { post } from '$lib/services/api';

  let email;
  let isSubmitted = false;

  let submitEmail = async () => {
    await post(`pages/${page.slug}/submissions`, { email });
    isSubmitted = true;
  }
</script>

<div class="_header">
  <div class="_logo">
    {page.name}
  </div>
</div>

<div class="_root">
  <div class="_content">
    <h1 class="_title" style="color: {page.bgColor}">{page.title}</h1> 
    
    {#if page.subtitle}
      <h2 class="_subtitle">{page.subtitle}</h2>
    {/if}
    
    <div class="_input_container">
      <form on:submit|preventDefault="{submitEmail}">
        <input class="_input" placeholder="Your Email" type="email" required bind:value={email} disabled={isSubmitted}/>

        {#if !isSubmitted}
          <button type="submit" class="_input_button" style="background-color: {page.bgColor || '#000'}">{page.callToAction}</button>
        {:else}
          <div class="_input_button" style="color: #000">
            💥 Thank you!
          </div>
        {/if}
      </form>
    </div>
  </div>

</div>

<style>
  ._root {
    width: 100%;
    max-width: 870px;
    color: #0C120C;
    margin: 0 auto;
    background: white;
  }

  ._header {
    max-width: 1200px;
    margin: 0 auto;
  }

  ._logo {
    font-family: Archivo;
    font-weight: bold;
    font-size: 20px;
    margin-top: 12px;
  }

  ._content {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: -40px;
  }

  ._title {
    font-family: Archivo;
    font-size: 56px;
    line-height: 1.2;
    margin-bottom: 32px;
  }

  ._subtitle {
    font-size: 20px;
    line-height: 36px;
    margin-bottom: 40px;
  }

  ._input_container {
    position: relative;
    width: 392px;
    margin: 0 auto;
  }

  ._input {
    background: #F5F5F5;
    width: 100%;
    padding: 15px 18px;
    border-radius: 30px;
    font-size: 18px;
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


