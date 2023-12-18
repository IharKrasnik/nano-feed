import { browser } from '$app/environment';
import { get as getStoreValue } from 'svelte/store';
import userVars from '$lib/stores/userVars';

let replaceVariable = ({ str, varName, varValue }) => {
	return str ? str.replace(`$${varName}`, varValue) : '';
};

export default ({ page, feedItem, isNoVars = false }) => {
	let systemVariables = [
		{
			name: 'visitsCount',
			value: browser ? localStorage.visitsCount || 1 : 1
		},
		{
			name: 'totalSignupsCount',
			value: page.totalSignupsCount || 0
		}
	];

	let userVariables = [];

	let userVarsValue = getStoreValue(userVars);

	Object.keys(userVarsValue).forEach((varName) => {
		userVariables.push({
			name: `user.${varName}`,
			value: userVarsValue[varName].value || userVarsValue[varName].emoji
		});
	});

	let variablesValues = {};

	let feedItemVariables = feedItem
		? [
				{
					name: 'data.title',
					value: feedItem.title
				},
				{
					name: 'data.content',
					value: feedItem.content
				}
		  ]
		: [];

	[
		...systemVariables,
		...userVariables,
		...(isNoVars ? [] : page.variables || []),
		...feedItemVariables
	].forEach((variable) => {
		if (variable.calculateCode) {
			variablesValues[variable.name] = eval(`(function(){${variable.calculateCode}})()`);
			variablesValues[variable.name + 'Capitalised'] = _.capitalize(variablesValues[variable.name]);
		} else if (variable.calculateFn) {
			variablesValues[variable.name] = variable.calculateFn();
		} else {
			variablesValues[variable.name] = variable.value;
		}

		let activeHero = page.activeHero || (page.heros && page.heros[0]);

		if (activeHero) {
			['title', 'subtitle', 'ctaExplainer'].forEach((fieldName) => {
				let str = activeHero[fieldName];

				activeHero[fieldName] = replaceVariable({
					str,
					varName: variable.name,
					varValue: variablesValues[variable.name]
				});
			});
		}

		if (page.sections?.length) {
			page.sections = page.sections.map((s) => {
				s.title = replaceVariable({
					str: s.title,
					varName: variable.name,
					varValue: variablesValues[variable.name]
				});

				s.description = replaceVariable({
					str: s.description,
					varName: variable.name,
					varValue: variablesValues[variable.name]
				});

				if (s.streamSettings && s.streamSettings.filterTags) {
					s.streamSettings.filterTags = replaceVariable({
						str: s.streamSettings.filterTags,
						varName: variable.name,
						varValue: variablesValues[variable.name]
					});
				}

				return s;
			});
		}
	});
};
