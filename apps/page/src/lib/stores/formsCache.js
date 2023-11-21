import _ from 'lodash';
import { writable } from 'svelte/store';
import { get } from 'lib/api';

let cache = {};

const formsStore = writable(cache);

export let getForm = async ({ pageId, sectionId, forceRefresh = false }) => {
	if (cache[sectionId] && !forceRefresh) {
		return cache[sectionId];
	}

	let form;

	if (!sectionId) {
		form = {
			id: 'email',
			columns: 1,
			items: [
				{
					title: 'Submitted Email',
					interactiveRenderType: 'email',
					description: '',
					isShown: true
				}
			],
			type: 'form',
			renderType: 'form',
			isShown: true,
			collectionType: '',
			interactiveRenderType: '',
			subtitle: ''
		};
	} else {
		form = await get(`forms/${sectionId}`, {
			pageId
		});
	}

	formsStore.update((s) => {
		s[sectionId] = form;
		cache[sectionId] = form;

		return s;
	});
};

export default formsStore;
