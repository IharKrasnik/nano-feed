import isDarkColor from 'is-dark-color';
import { writable } from 'svelte/store';
import { BRAND_URL } from 'lib/env';

let colors = [
	{
		type: 'plain',
		value: '#D091FF'
	},
	{
		type: 'plain',
		value: '#FBC82E'
	},
	{
		type: 'plain',
		value: '#25CED1'
	},
	{
		type: 'plain',
		value: '#EA526F'
	},
	{
		type: 'plain',
		value: '#7FB069'
	},
	{
		type: 'plain',
		value: '#111111'
	},
	{
		type: 'plain',
		value: '#ffffff'
	},
	{
		type: 'file',
		value: `${BRAND_URL}/backgrounds/gradient-1.svg`
	},
	{
		type: 'file',
		value: `${BRAND_URL}/backgrounds/gradient-2.svg`
	},
	{
		type: 'file',
		value: `${BRAND_URL}/backgrounds/gradient-3.svg`
	},
	{
		type: 'file',
		value: `${BRAND_URL}/backgrounds/gradient-4.svg`
	},
	{
		type: 'file',
		value: `${BRAND_URL}/backgrounds/gradient-5.svg`
	},
	{
		type: 'file',
		value: `${BRAND_URL}/backgrounds/gradient-6.svg`
	},
	{
		type: 'file',
		value: `${BRAND_URL}/backgrounds/gradient-7.svg`
	}
];

colors.forEach((c) => {
	c.isDarkColor = c.value.startsWith('http') ? true : isDarkColor(c.value);
});

const store = writable(colors);

export default store;
