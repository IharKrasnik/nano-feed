<script>
	import moment from 'moment';
	import _ from 'lodash';
	import { get, post } from 'lib/api';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import Loader from 'lib/components/Loader.svelte';

	import allPages from 'lib-render/stores/allPages';
	import { showSuccessMessage, showErrorMessage } from 'lib/services/toast';

	import getPageCssStyles from 'lib-render/services/getPageCssStyles';
	import RenderSection from 'lib-render/components/render//Section.svelte';
	import { goto } from '$app/navigation';
	import subPages, { refreshSubPages } from 'lib/stores/subPages';
	import MomentumWidget from 'lib/components/MomentumWidget.svelte';
	import RenderServiceChat from 'lib-render/components/render/ServiceChat.svelte';
	import RenderMomentumCollection from 'lib-render/components/render/MomentumCollection.svelte';
	import PageContainer from 'lib-render/components/PageContainer.svelte';
	import pricingPage from '$lib/stores/pricingPage';
	import PricingPage from '$lib/components/PricingPage.svelte';

	import WebsiteSettings from '$lib/components/WebsiteSettings.svelte';
	import PageSettings from '$lib/components/Settings.svelte';
	import EditPageLinks from '$lib/components/edit/PageLinks.svelte';

	import selectedSettingsPage from '$lib/stores/selectedSettingsPage';
	import selectedSettingsTab from '$lib/stores/selectedSettingsTab';

	export let page;
	export let setPageAndDraft;
</script>

<div class="bg-white">
	<div class="max-w-[1000px] mx-auto pt-8">
		{#if $selectedSettingsTab === 'settings'}
			{#if $selectedSettingsPage}
				{#key $selectedSettingsPage?._id}
					<PageSettings
						bind:page={$selectedSettingsPage}
						onDeleted={() => {
							if (page._id === $selectedSettingsPage._id) {
								if (page.parentPage) {
									setPageAndDraft(
										$allPages.find((p) => p._id === page.parentPage._id),
										{
											isSetEditorTab: false
										}
									);
								} else {
									setPageAndDraft($allPages[0]);
								}
							}

							$selectedSettingsPage = null;
						}}
					/>
				{/key}
			{:else}
				<WebsiteSettings bind:page />
			{/if}
		{:else if $selectedSettingsTab === 'header-footer'}
			{#key (page.parentPage || page)._id}
				<EditPageLinks {page} />
			{/key}
		{:else if $selectedSettingsTab === 'plans'}
			<PageContainer class="p-8" bind:page>
				<PricingPage bind:page />
			</PageContainer>
		{/if}
	</div>
</div>
