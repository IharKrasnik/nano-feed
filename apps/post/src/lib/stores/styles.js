import { writable } from 'svelte/store';

const stylesStore = writable({
	obj: {},
	css: ''
});

export let updateStylesFromTheme = (theme) => {
	let stylesObj = {
		'title-font': theme?.titleFont || 'Archivo',
		'text-font': theme?.textFont || 'Inter',
		'background-color': theme?.backgroundColor || '#ffffff',
		'text-color': theme?.textColor || '#111',
		'accent-color': theme?.accentColor || '#000',
		'section-item-background-color': theme?.sectionItemBackgroundColor || 'rgb(128, 127, 128, 0.05)',
		'header-background-color': theme?.headerBackgroundColor || '#ffffff',
		'header-text-color': theme?.headerTextColor || '#ffffff',
		'input-background': theme?.inputBackground || '#f5f5f5',
		'input-color': theme?.inputColor || '#222222',
		'button-color': theme?.buttonColor || '#fff',
		theme
	};

	let css = Object.entries(stylesObj)
		.map(([key, value]) => `--${key}:${value}`)
		.join(';');

	stylesStore.set({
		obj: stylesObj,
		css
	});
};

export default stylesStore;
