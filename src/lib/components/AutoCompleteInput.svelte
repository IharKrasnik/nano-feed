<script>
	import _ from 'lodash';
  import { fly, fade } from 'svelte/transition';
	import hotkeys from 'hotkeys-js';
	import clickOutside from '$lib/use/clickOutside';
	import { goto } from '$app/navigation';

  import { createEventDispatcher, onMount } from 'svelte';
	
  const dispatch = createEventDispatcher();
	
  export let isMulti = false;
  export let placeholder;
  export let searchField = 'label';
  export let valueField = 'value';
  export let limitItemsCount = 10;
	export let allSuggestions;
  export let onChange;
  export let isAlwaysShown = false;
  export let autofocus = false;
	
  export let initialSelectedItems = [];
  export let initialSelectedItem = null;

  let selectedItems = initialSelectedItems;
  let selectedItem = initialSelectedItem;

  let clazz;
	export { clazz as class };

  let inputEl;
	let searchValue = '';
	let filteredSuggestions = [];
	let isSuggestionsShown = true;

	const showSuggestions = (evt) => {
		filterSuggestions();
		isSuggestionsShown = true;
	};

	const hideSuggestions = () => {
    if (!isAlwaysShown) {
      setTimeout(() => {
        isSuggestionsShown = false;
      }, 50);
    }
	};

	const filterSuggestions = () => {
		if (!searchValue) {
			filteredSuggestions = allSuggestions;
		} else {
			filteredSuggestions = allSuggestions.filter((s) =>
				s[searchField].toLowerCase().includes(searchValue.toLowerCase())
			);
		}

    if (limitItemsCount) {
		  filteredSuggestions = _.take(filteredSuggestions, limitItemsCount);
    }
		currentIndex = 0;
	};

	const setValue = (newValue) => {
    
    if (newValue.href) {
      return goto(newValue.href);
    }

		searchValue = '';
		inputEl.blur();

    if (isMulti) {
      selectedItems = selectedItems.concat(newValue);
      onChange(selectedItems);
    } else {
      selectedItem = newValue;
      onChange(selectedItem);
    }
	};
	
  const removeSelectedItem = (value) => {
    if (isMulti) {
      selectedItems = selectedItems.filter(i => i !== value);
      onChange(selectedItems);
    } else {
      selectedItem = null;
      onChange(selectedItem);
    }

    if (!isMulti && selectedItems.length === 0) {
      setTimeout(() => {
        inputEl.focus();
      }, 0);
    }
  }

  export const focus = () => {
		inputEl.focus();
	};
	
  let currentIndex = 0;
	
  hotkeys.filter = function (event) {
		return true;
	};

	onMount(() => {
		hotkeys('down', { element: inputEl }, () => {
			if (currentIndex < filteredSuggestions.length - 1) {
				currentIndex++;
				filteredSuggestions[currentIndex].hover = true;
				if (currentIndex > 0) {
					filteredSuggestions[currentIndex - 1].hover = false;
				}
				filteredSuggestions = [...filteredSuggestions];
			}
		});

		hotkeys('up', { element: inputEl }, () => {
			if (currentIndex > 0) {
				currentIndex--;
				filteredSuggestions[currentIndex].hover = true;
				if (currentIndex < filteredSuggestions.length) {
					filteredSuggestions[currentIndex + 1].hover = false;
				}
				filteredSuggestions = [...filteredSuggestions];
			}
		});
    
		hotkeys('enter', { element: inputEl }, () => {
			setValue(filteredSuggestions[currentIndex]);
		});
		
    hotkeys('escape', { element: inputEl }, () => {
			searchValue = '';
		});

    if (autofocus) {
      setTimeout(() => {
        focus();
      }, 500);
    }
	});


</script>

<div class="w-full relative" use:clickOutside on:clickOutside={hideSuggestions}>
  {#if isMulti || !selectedItem}
    <input
      type="text"
      {placeholder}
      bind:this={inputEl}
      bind:value={searchValue}
      on:focus={showSuggestions}
      on:blur={hideSuggestions}
      on:input={showSuggestions}
      class="w-full transition opacity-50 {clazz}"
      class:opacity-100={isSuggestionsShown}
    />
    {#if isSuggestionsShown}
      <div class="absolute w-full left-0 mt-1 bg-black z-10" in:fly={{  y: 50, duration: 150, delay: 150 }}>
        {#each filteredSuggestions as suggestion, i}
          <a
            href={suggestion.href}
            class="_option block"
            class:_hover={i === currentIndex}
            on:click={() => setValue(suggestion)}
          >
            <slot name="item" item={suggestion} />
            {#if !$$slots.item}
            {suggestion[searchField]}
            {/if}
          </a>
        {/each}
      </div>
    {/if}
	{/if}

  {#if isMulti && selectedItems.length}
    <div class="mt-2">
      {#each selectedItems as selectedItem}
        <div class="relative mr-2 py-4">
          <slot name="item" item={selectedItem}/>

          {#if !$$slots.item}
          {selectedItem[searchField]}
          {/if}

          <button class="_cross" on:click|preventDefault={() => removeSelectedItem(selectedItem)}>
            ⤬
          </button>
        </div>
      {/each}
    </div>
  {/if}

  {#if !isMulti && selectedItem}
    <div class="mt-2">
      <div class="relative mr-2 py-4">
        <slot name="item" item={selectedItem}/>

        {#if !$$slots.item}
        { allSuggestions.find(s => s[valueField] === selectedItem[valueField])[searchField] }
        {/if}

        <button class="_cross" on:click|preventDefault={() => removeSelectedItem(selectedItem)}>
          ⤬
        </button>
      </div>
    </div>
  {/if}
</div>

<style>
	._option {
    background: black;
		cursor: pointer;
		padding: 16px;
    border-bottom: 1px rgba(255, 255, 255, .3) solid;
	}

  ._option:hover, ._option._hover {
  	background: rgba(255, 255, 255, 0.1);
  }

  ._cross {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    font-size: 25px;
    border: 1px rgba(255, 255, 255, .3) solid;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 7px;
    width: 40px;
    height: 40px;
  }


</style>