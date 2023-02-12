<script>
  import { slide } from 'svelte/transition';
  import currentUser from '$lib/stores/currentUser';
  import SitePreview from '$lib/components/site-preview.svelte';
  import SignupForm from '$lib/components/signup-form.svelte';
  import ABToggle from '$lib/components/a-b-toggle.svelte';

  let isLoading = false;
  let isSignupFormShown = false;

  let page = {
    _id: undefined,
    name: '',
    title: '',
    subtitle: '',
    callToAction: '',
    bgColor: '',
    slug:'',
  }

  import { post, put } from 'lib/api';

  const publishPage = async () => {
    if (!$currentUser) {
      isSignupFormShown = true;
      return;
    }

    isLoading = true;

    try {
      page = await (page._id ? put : post)(`pages${ page._id ? `/${page._id}` : '' }`, {
        name: page.name,
        slug: page.slug,
        title: page.title,
        subtitle: page.subtitle,
        callToAction: page.callToAction,
        bgColor: page.bgColor,
      });
    } catch(err) {

    } finally {
      isLoading = false;
    }
  }
</script>


<div class="container mx-auto px-4 pt-4">
  <a on:click={() => isSignupFormShown = false }>
    <h2 class="font-bold mb-4 flex items-center" style="font-family: Archivo; font-size: 20px;"> 
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.13635 4.00622C0 5.92768 0 8.52138 0 13.7088V20.2912C0 25.4786 0 28.0723 1.13635 29.9938C1.836 31.1768 2.82316 32.164 4.00622 32.8637C5.92768 34 8.52138 34 13.7088 34H20.2912C25.4786 34 28.0723 34 29.9938 32.8637C31.1768 32.164 32.164 31.1768 32.8637 29.9938C34 28.0723 34 25.4786 34 20.2912V13.7088C34 8.52138 34 5.92768 32.8637 4.00622C32.164 2.82316 31.1768 1.836 29.9938 1.13635C28.0723 0 25.4786 0 20.2912 0H13.7088C8.52138 0 5.92768 0 4.00622 1.13635C2.82316 1.836 1.836 2.82316 1.13635 4.00622Z" fill="#0C120C"/>
        <path d="M9.44446 8.97221C9.44446 8.18981 10.0787 7.55554 10.8611 7.55554H23.1389C23.9213 7.55554 24.5556 8.18981 24.5556 8.97221V18.8889C24.5556 19.6713 23.9213 20.3055 23.1389 20.3055H13.7885C13.1157 20.3055 12.3778 20.5212 12.2039 21.1711C12.1703 21.2967 12.1496 21.4348 12.1496 21.5843C12.1496 21.7395 12.1719 21.8824 12.2078 22.0118C12.3894 22.6668 13.1202 22.9523 13.5716 23.4606C13.9418 23.8775 14.1667 24.4263 14.1667 25.0278C14.1667 26.3318 13.1096 27.3889 11.8056 27.3889C10.5016 27.3889 9.44446 26.3318 9.44446 25.0278C9.44446 24.2864 9.78614 23.6248 10.3206 23.192C10.6488 22.9261 11.0706 22.7578 11.2715 22.3863C11.3792 22.1869 11.466 21.9217 11.466 21.5843C11.466 21.3604 11.4277 21.1682 11.3705 21.006C11.1795 20.4646 10.5039 20.3757 10.0372 20.0414C9.67831 19.7844 9.44446 19.364 9.44446 18.8889V8.97221Z" fill="white"/>
      </svg>
        
      <div class="ml-2">
        page
      </div>
    </h2>
  </a>
</div>

<hr />

{#if isSignupFormShown}
 <SignupForm></SignupForm>
{/if}

<div class="container mx-auto flex relative">
  <div class="min-w-[426px] p-4">
    <!-- <select class="my-4 w-full">
      <option>Momentum</option>
    </select> -->

    <div class="_section">
      <div class="_title">Brand Name</div> 
      <input class="w-full" bind:value={page.name} placeholder="Momentum"/>
    </div>

    <!-- <div class="my-4">
      <ABToggle></ABToggle>
    </div> -->
    <div class="_section">
      <div class="_title">Tagline</div> 
      <input class="w-full" bind:value={page.title} placeholder="Build a better product in public and grow your audience."/>
    </div>
    <div class="_section">
      <div class="_title">Subtitle</div> 

      <textarea 
        bind:value={page.subtitle}
        rows="4"
        class="w-full" 
        placeholder="Momentum instructs you how to create and distribute your content. Add subscribers early and build based on real users feedback.
      " />
    </div>
    <div class="_section">
      <div class="_title">Call to action</div> 

      <input class="w-full" bind:value={page.callToAction} placeholder="Join Waitlist"/>
    </div>
    <!-- <div class="_section">
      <div class="_title">Appearance</div> 

    </div> -->

    <div class="mt-4">
      <button class="_primary {isLoading ? 'loading': '' }" on:click="{publishPage}">Publish</button>
    </div>
  </div>

  {#if page.name || page.title || page.subtitle || page.callToAction}
    <div class="_preview p-4 mx-4" in:slide>
      <SitePreview
        bind:page={page}
        />

      {#if page.slug}
        <div class="_published-label">
          ✅ Published at <a href="https://{window.location.hostname}/p/{page.slug}" style="color: #5375F0;" target="_blank" rel="noreferrer">{window.location.hostname}/p/{page.slug}</a>
        </div>
      {/if}
    </div>
  {:else}
    <div class="w-full self-stretch flex-col flex items-center justify-center" in:slide>
      <svg width="190" height="114" viewBox="0 0 190 114" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="190" height="114" rx="7" fill="#F5F5F5"/>
        <path d="M67 44C67 50.0751 62.0751 55 56 55C49.9249 55 45 50.0751 45 44" stroke="#828282" stroke-width="3" stroke-linecap="round"/>
        <path d="M144 44C144 50.0751 139.075 55 133 55C126.925 55 122 50.0751 122 44" stroke="#828282" stroke-width="3" stroke-linecap="round"/>
        <line x1="89.5" y1="84.5" x2="100.5" y2="84.5" stroke="#828282" stroke-width="3" stroke-linecap="round"/>
      </svg>

      <div class="text-[#828282] mt-4">Your design will appear here</div>
    </div>
  {/if}
</div>

<style>
  ._section {
    border: 1px #E0DEDE solid;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 8px;
  }

  ._title {
    font-weight: bold;
    margin-bottom: 12px;
  }

  ._preview {
    width: 100%;
    height: 100%;
    border-left: 1px #E0DEDE solid;
  }

  ._published-label {
    position: absolute;
    right: 10px;
    top: 0;
    text-transform: uppercase;
    border-radius: 30px;
    background-color: #F5F5F5;
    padding: 3px 10px;
    margin-top: 10px;
    color: #828282;
  }
</style>
