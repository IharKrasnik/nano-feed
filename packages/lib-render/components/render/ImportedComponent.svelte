<script>
	import { onMount } from 'svelte';
	import parseQuery from 'lib/helpers/parseQuery';

	let rootEl;

	export let id;
	export let name;
	export let props = {};

	export let query;

	export let url;
	export let section;
	export let page;

	$: if (url) {
		query = parseQuery(url);
		id = query.id;
		name = query.componentName;
	}

	let init = ({ attemptNo = 1 } = {}) => {
		let componentNameWithId = `${name}${id || ''}`;

		const Component = window.Components && window.Components[componentNameWithId];

		console.log('loading component..', componentNameWithId);
		if (Component) {
			new Component({
				target: rootEl,
				props: {
					query,
					page,
					section,
					...props
				}
			});
		} else {
			if (attemptNo > 3) {
				console.log('Failed to load external component', componentNameWithId);
			} else {
				setTimeout(() => {
					init({ attemptNo: attemptNo + 1 });
				}, 1000);
			}
		}
	};

	onMount(() => {
		console.log('init', id);
		return init();
	});
</script>

<div bind:this={rootEl} />
